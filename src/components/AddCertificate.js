import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { 
  productMasterData,
  importerData,
  testRecordsContacts,
  cpscRegulations,
  locationOptions,
  productTypeRegulationsMap
} from '../data';
import './AddCertificate.css';

// Helper function to normalize regulation ID for comparison
const normalizeRegulationId = (id) => id.toString().toLowerCase().replace(/[^0-9.]/g, '');

// Helper function to check if a regulation ID matches
const matchesRegulation = (regulationId, searchId) => {
  return normalizeRegulationId(regulationId).includes(normalizeRegulationId(searchId));
};

// Helper function to determine if a product type matches a category
const matchesProductType = (productType, category) => {
  return productType.toLowerCase().includes(category.toLowerCase());
};

// Helper function to get applicable regulations for a product type
const getApplicableRegulations = (productType) => {
  if (!productType) return [];

  const rules = {
    'adult apparel': ['1610', '1611'],
    'children accessories': ['1303', '1501', '1500.48', '1500.49', '1610', '1611'],
    'children apparel': ['1303', '1501', '1500.48', '1500.49'],
    'children footwear': ['1303', '1501', '1500.48', '1500.49'],
    'children sleepwear': ['1303', '1501', '1500.48', '1500.49', '1615', '1616'],
    'children sport': ['1303', '1501', '1500.48', '1500.49'],
    'gift with purchase (non-toy)': ['1303', '1501', '1500.48', '1500.49', '1610', '1611', '1615', '1616', '1500.44'],
    'gift with purchase (toy)': ['1303', '1501', '1500.48', '1500.49']
  };

  const applicableRegulations = new Set();
  Object.entries(rules).forEach(([category, regulations]) => {
    if (productType.toLowerCase().includes(category.toLowerCase())) {
      regulations.forEach(reg => applicableRegulations.add(reg));
    }
  });

  return Array.from(applicableRegulations);
};

function AddCertificate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productId: null,
    brand: '',
    productType: '',
    productDescription: '',
    t1Factory: null,
    poNo: [],
    cpscRegulationsList: [],
    manufactureDate: '',
    manufactureLocation: null,
    importerName: null,
    importerAddress: '',
    importerPhone: '',
    testContactName: null,
    testContactAddress: '',
    testContactEmail: '',
    testContactPhone: '',
    comments: '',
    exemptions: {}
  });

  const [availableT1Factories, setAvailableT1Factories] = useState([]);
  const [availablePONumbers, setAvailablePONumbers] = useState([]);

  // Convert data for react-select
  const productOptions = productMasterData.map(p => ({
    value: p.productId,
    label: `${p.productId} - ${p.brand} - ${p.productType}`,
    data: p
  }));

  const importerOptions = importerData.map(imp => ({
    value: imp.id,
    label: imp.name,
    data: imp
  }));

  const testContactOptions = testRecordsContacts.map(contact => ({
    value: contact.id,
    label: contact.name,
    data: contact
  }));

  // Effect to handle auto-selection when product changes
  useEffect(() => {
    if (formData.productType) {
      const applicableRegulations = getApplicableRegulations(formData.productType);
      setFormData(prev => ({
        ...prev,
        cpscRegulationsList: applicableRegulations
      }));
    }
  }, [formData.productId]); // Run when productId changes

  const handleProductChange = (selectedOption) => {
    if (!selectedOption) {
      setFormData(prev => ({
        ...prev,
        productId: null,
        brand: '',
        productType: '',
        productDescription: '',
        t1Factory: null,
        poNo: [],
        cpscRegulationsList: [],
        exemptions: {}
      }));
      setAvailableT1Factories([]);
      setAvailablePONumbers([]);
      return;
    }

    const product = selectedOption.data;
    
    // Transform the T1 Factory data correctly
    const t1FactoryOptions = product.allowedT1Factories?.map(factory => ({
      value: factory.id,
      label: factory.name,
      data: factory
    })) || [];

    // Transform the PO Numbers correctly
    const poNumberOptions = product.allowedPONumbers?.map(po => ({
      value: po,
      label: po
    })) || [];

    setAvailableT1Factories(t1FactoryOptions);
    setAvailablePONumbers(poNumberOptions);

    setFormData(prev => ({
      ...prev,
      productId: selectedOption,
      brand: product.brand || '',
      productType: product.productType || '',
      productDescription: product.productDescription || '',
      t1Factory: null,
      poNo: []
    }));
  };

  const handleImporterChange = (selectedOption) => {
    if (!selectedOption) {
      setFormData(prev => ({
        ...prev,
        importerName: null,
        importerAddress: '',
        importerPhone: ''
      }));
      return;
    }

    const importer = selectedOption.data;
    setFormData(prev => ({
      ...prev,
      importerName: selectedOption,
      importerAddress: importer.address,
      importerPhone: importer.phone
    }));
  };

  const handleTestContactChange = (selectedOption) => {
    if (!selectedOption) {
      setFormData(prev => ({
        ...prev,
        testContactName: null,
        testContactAddress: '',
        testContactEmail: '',
        testContactPhone: ''
      }));
      return;
    }

    const contact = selectedOption.data;
    setFormData(prev => ({
      ...prev,
      testContactName: selectedOption,
      testContactAddress: contact.address,
      testContactEmail: contact.email,
      testContactPhone: contact.phone
    }));
  };

  const handleRegulationChange = (regulationId) => {
    setFormData(prev => {
      const normalizedRegId = regulationId.toString().toLowerCase().replace(/[^0-9.]/g, '');
      const isCurrentlySelected = prev.cpscRegulationsList.some(reg => 
        reg.toString().toLowerCase().replace(/[^0-9.]/g, '') === normalizedRegId
      );

      let newRegulations;
      if (isCurrentlySelected) {
        // Remove the regulation if it's currently selected
        newRegulations = prev.cpscRegulationsList.filter(reg => 
          reg.toString().toLowerCase().replace(/[^0-9.]/g, '') !== normalizedRegId
        );
      } else {
        // Add the regulation if it's not currently selected
        newRegulations = [...prev.cpscRegulationsList, regulationId];
      }

      return {
        ...prev,
        cpscRegulationsList: newRegulations,
        // Clear exemption for this regulation if it's being unchecked
        exemptions: isCurrentlySelected 
          ? Object.fromEntries(
              Object.entries(prev.exemptions)
                .filter(([key]) => key !== regulationId)
            )
          : prev.exemptions
      };
    });
  };

  const handleExemptionChange = (regulationId, value) => {
    setFormData(prev => ({
      ...prev,
      exemptions: {
        ...prev.exemptions,
        [regulationId]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/');
  };

  const RegulationSection = () => {
    return (
      <section className="regulations-section">
        <h2>Applicable Regulations</h2>
        <div className="regulations-container">
          {cpscRegulations.map((regulation) => {
            const normalizedRegId = regulation.id.toString().toLowerCase().replace(/[^0-9.]/g, '');
            const isApplicable = formData.productType && 
              getApplicableRegulations(formData.productType)
                .some(reg => reg.toString().toLowerCase().replace(/[^0-9.]/g, '') === normalizedRegId);
            
            const isChecked = formData.cpscRegulationsList
              .some(reg => reg.toString().toLowerCase().replace(/[^0-9.]/g, '') === normalizedRegId);

            return (
              <div 
                key={regulation.id} 
                className={`regulation-item ${isApplicable ? 'applicable' : ''}`}
              >
                <label className="regulation-label">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleRegulationChange(regulation.id)}
                      className="regulation-checkbox"
                    />
                    <span className="custom-checkbox"></span>
                  </div>
                  <div className="regulation-content">
                    <span className="regulation-title">
                      {regulation.title}
                      {isApplicable && (
                        <span className="auto-selected-badge">Auto-selected</span>
                      )}
                    </span>
                    {regulation.description && (
                      <span className="regulation-description">
                        {regulation.description}
                      </span>
                    )}
                    {regulation.hasExemption && isChecked && (
                      <div className="exemption-options">
                        <label className="radio-label">
                          <input
                            type="radio"
                            name={`exempt-${regulation.id}`}
                            value="exempt"
                            checked={formData.exemptions[regulation.id] === 'exempt'}
                            onChange={() => handleExemptionChange(regulation.id, 'exempt')}
                          />
                          <span className="radio-text">Exempt</span>
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name={`exempt-${regulation.id}`}
                            value="not-exempt"
                            checked={formData.exemptions[regulation.id] === 'not-exempt'}
                            onChange={() => handleExemptionChange(regulation.id, 'not-exempt')}
                          />
                          <span className="radio-text">
                            Not Exempt (Complete Section 7 Below)
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  // Add these styles to your CSS
  const styles = `
    .regulation-item.applicable {
      background-color: #f0f9ff;
      border-left: 3px solid #4f46e5;
    }

    .auto-selected-badge {
      display: inline-block;
      margin-left: 8px;
      padding: 2px 8px;
      background-color: #4f46e5;
      color: white;
      font-size: 12px;
      border-radius: 12px;
      font-weight: normal;
    }

    .regulation-checkbox:disabled + .custom-checkbox {
      background-color: #f3f4f6;
      border-color: #9ca3af;
      cursor: not-allowed;
    }

    .regulation-checkbox:disabled:checked + .custom-checkbox {
      background-color: #4f46e5;
      opacity: 0.7;
    }
  `;

  return (
    <div className="add-certificate-container">
      <style>{styles}</style>
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to List
      </button>
      
      <form onSubmit={handleSubmit}>
        <section>
          <h2>Product Identification</h2>
          <div className="form-row">
            <div className="form-group">
              <Select
                value={formData.productId}
                onChange={handleProductChange}
                options={productOptions}
                placeholder="Search Product ID..."
                isClearable
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={formData.brand}
                readOnly
                placeholder="Brand"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                value={formData.productType}
                readOnly
                placeholder="Product Type"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={formData.productDescription}
                readOnly
                placeholder="Product Description"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <Select
                value={formData.t1Factory}
                onChange={(option) => setFormData(prev => ({
                  ...prev,
                  t1Factory: option
                }))}
                options={availableT1Factories}
                placeholder="Select T1 Factory"
                className="react-select-container"
                classNamePrefix="react-select"
                isDisabled={!formData.productId}
                isClearable
                isSearchable
                noOptionsMessage={() => formData.productId ? "No factories available" : "Select a product first"}
              />
            </div>
            <div className="form-group">
              <Select
                value={formData.poNo}
                onChange={(selectedOptions) => setFormData(prev => ({
                  ...prev,
                  poNo: selectedOptions
                }))}
                options={availablePONumbers}
                placeholder="Select PO Numbers"
                className="react-select-container"
                classNamePrefix="react-select"
                isDisabled={!formData.productId}
                isMulti={true}
                isClearable={true}
                isSearchable={true}
                noOptionsMessage={() => formData.productId ? "No PO numbers available" : "Select a product first"}
              />
            </div>
          </div>
        </section>

        <RegulationSection />

        <section>
          <h2>Manufacture Date & Location</h2>
          <div className="form-row">
            <div className="form-group">
              <input
                type="date"
                value={formData.manufactureDate}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  manufactureDate: e.target.value
                }))}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <Select
                value={formData.manufactureLocation}
                onChange={(option) => setFormData(prev => ({
                  ...prev,
                  manufactureLocation: option
                }))}
                options={locationOptions}
                placeholder="Search Location..."
                isClearable
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </div>
        </section>

        <div className="two-column">
          <section>
            <h2>Importer/Manufacturer</h2>
            <div className="form-group">
              <Select
                value={formData.importerName}
                onChange={handleImporterChange}
                options={importerOptions}
                placeholder="Search Importer..."
                isClearable
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={formData.importerAddress}
                readOnly
                placeholder="Address"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                value={formData.importerPhone}
                readOnly
                placeholder="Phone"
                className="form-input"
              />
            </div>
          </section>

          <section>
            <h2>Test Records Contact</h2>
            <div className="form-group">
              <Select
                value={formData.testContactName}
                onChange={handleTestContactChange}
                options={testContactOptions}
                placeholder="Search Test Contact..."
                isClearable
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={formData.testContactAddress}
                readOnly
                placeholder="Address"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                value={formData.testContactEmail}
                readOnly
                placeholder="Email"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                value={formData.testContactPhone}
                readOnly
                placeholder="Phone"
                className="form-input"
              />
            </div>
          </section>
        </div>

        <section>
          <h2>Testing Details</h2>
          <div className="form-group">
            <select
              name="selectTPTR"
              value={formData.selectTPTR}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                selectTPTR: e.target.value
              }))}
              className="form-input"
            >
              <option value="">Select TPTR</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </section>

        <section>
          <h2>Comments (if any)</h2>
          <div className="form-group">
            <textarea
              name="comments"
              value={formData.comments}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                comments: e.target.value
              }))}
              className="form-input textarea"
              rows="4"
            />
          </div>
        </section>

        <div className="submit-button-container">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCertificate; 