import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './AddTPTR.css';  // Changed back to regular CSS

// TPTR Group options
const TPTR_GROUP_OPTIONS = [
  { value: 'article_model', label: 'Article/Model' },
  { value: 'material_component', label: 'Material/Component' },
  { value: 'color', label: 'Color' }
];

// Supplier options with proper formatting
const SUPPLIER_OPTIONS = [
  // T1 Suppliers
  { value: 't1_1', label: 'Adidas Manufacturing Ltd.', type: 'T1' },
  { value: 't1_2', label: 'Premium Sports Production', type: 'T1' },
  { value: 't1_3', label: 'Global Apparel Solutions', type: 'T1' },
  { value: 't1_4', label: 'Elite Sportswear Inc.', type: 'T1' },
  
  // T2 Suppliers
  { value: 't2_1', label: 'TextileTech Materials', type: 'T2' },
  { value: 't2_2', label: 'Advanced Fabric Solutions', type: 'T2' },
  { value: 't2_3', label: 'Performance Materials Co.', type: 'T2' },
  { value: 't2_4', label: 'Innovative Textiles Ltd.', type: 'T2' }
];

// Updated COLOR_OPTIONS with mixed options and dummy data
const COLOR_OPTIONS = [
  // Direct color names
  { 
    value: 'COL001',
    label: 'COL001 - Victory Red',
    type: 'color',
    hex: '#CC0000'
  },
  { 
    value: 'COL002',
    label: 'COL002 - Deep Navy',
    type: 'color',
    hex: '#000080'
  },
  { 
    value: 'COL003',
    label: 'COL003 - Forest Green',
    type: 'color',
    hex: '#228B22'
  },
  
  // Articles with colors
  {
    value: 'ART001_red',
    label: 'ART001 - Men\'s Training Jacket (Victory Red)',
    type: 'article',
    colorHex: '#CC0000'
  },
  {
    value: 'ART002_navy',
    label: 'ART002 - Performance Running Tee (Deep Navy)',
    type: 'article',
    colorHex: '#000080'
  },
  {
    value: 'ART003_green',
    label: 'ART003 - Compression Shorts (Forest Green)',
    type: 'article',
    colorHex: '#228B22'
  },
  
  // Materials with colors
  {
    value: 'MAT001_red',
    label: 'MAT001 - Dri-FIT Fabric (Victory Red)',
    type: 'material',
    colorHex: '#CC0000'
  },
  {
    value: 'MAT002_navy',
    label: 'MAT002 - Performance Mesh (Deep Navy)',
    type: 'material',
    colorHex: '#000080'
  },
  {
    value: 'MAT003_green',
    label: 'MAT003 - Technical Knit (Forest Green)',
    type: 'material',
    colorHex: '#228B22'
  }
];

// Mock items database
const ITEMS_DATABASE = {
  T1: [
    { id: 'ART001', name: 'Men\'s Running Jacket', category: 'Apparel' },
    { id: 'ART002', name: 'Women\'s Training Shorts', category: 'Apparel' },
    { id: 'ART003', name: 'Performance T-Shirt', category: 'Apparel' },
    { id: 'ART004', name: 'Running Shoes Model X', category: 'Footwear' },
    { id: 'ART005', name: 'Training Pants Pro', category: 'Apparel' }
  ],
  T2: [
    { id: 'MAT001', name: 'Recycled Polyester Fabric', category: 'Fabric' },
    { id: 'MAT002', name: 'Performance Mesh', category: 'Material' },
    { id: 'MAT003', name: 'Elastic Band Type A', category: 'Component' },
    { id: 'MAT004', name: 'Moisture Wicking Material', category: 'Material' },
    { id: 'MAT005', name: 'Shoe Sole Component X', category: 'Component' }
  ]
};

// Comprehensive compliance and TPTR type mapping
const COMPLIANCE_TPTR_MAPPING = {
  'A01': {
    label: 'A01',
    tptrTypes: [
      { value: 'tptr_a01', label: 'TPTR (A-01/Afirm/Oekotex cert. 100) for every single material in the BOM and every color' },
      { value: 'appendix_1', label: 'Appendix 1' },
      { value: 'appendix_2', label: 'Appendix 2' },
      { value: 'appendix_3_4', label: 'Appendix 3/4' }
    ]
  },
  'CPSIA': {
    label: 'CPSIA',
    tptrTypes: [
      { value: 'cpc', label: 'CPC' },
      { value: 'children_footwear', label: 'TPTR: CPSIA Children\'s footwear' },
      { value: 'children_accessories', label: 'TPTR: CPSIA Children\'s accessories' },
      { value: 'children_sports', label: 'TPTR: CPSIA Children\'s sports equipment' },
      { value: 'children_apparel', label: 'TPTR: CPSIA Children\'s Children\'s apparel' },
      { value: 'children_sleepwear', label: 'TPTR: CPSIA Children\'s Children\'s sleepwear' },
      { value: 'gwp_non_toys', label: 'TPTR: CPSIA GwP – non toys' },
      { value: 'gwp_toys', label: 'TPTR: CPSIA GwP – toys' }
    ]
  },
  'CPSIA_adult': {
    label: 'CPSIA adult',
    tptrTypes: [
      { value: 'gcc', label: 'GCC' },
      { value: 'button_cell', label: 'TPTR: CPSIA adult products containing button cell or coin batteries' },
      { value: 'flammability', label: 'TPTR: CPSIA adult Flammability' }
    ]
  },
  'Toy': {
    label: 'Toy',
    tptrTypes: [
      { value: 'en_71', label: 'TPTR: EN 71' }
    ]
  },
  'Food_contact_material': {
    label: 'Food contact material',
    tptrTypes: [
      { value: 'eu_reg', label: 'TPTR: EU: Regulation (EU) No 10/2011, Regulation (EC) No 1935/2004' },
      { value: 'doc_eu', label: 'DoC EU' },
      { value: 'fda_cfr', label: 'TPTR: US: FDA 21 CFR' },
      { value: 'fda_us', label: 'FDA US' },
      { value: 'china_gb', label: 'TPTR: China: GB 31604.52 (only plastics, no silicone)' },
      { value: 'cert_china', label: 'certificate China' }
    ]
  },
  'PPE': {
    label: 'PPE',
    tptrTypes: [
      { value: 'kneepad', label: 'DoC: EU 2016/425, EN 15613 kneepad' },
      { value: 'anklet', label: 'DoC: EU 2016/425 anklet: article #651879' },
      { value: 'swim_goggle_tptr', label: 'TPTR: PHP-AG0786 - swim goggle' },
      { value: 'swim_goggle_doc', label: 'DoC: EU 2016/425 - swim goggle' },
      { value: 'gk_gloves', label: 'DoC: EU 2016/425 - GK gloves (w/o Fingersave), GLOVE (BALL GLOVE)' },
      { value: 'gk_gloves_fingersave', label: 'DoC: EU 2016/425, EN 16027 - GK gloves (Fingersave)' },
      { value: 'gk_gloves_tuv', label: 'TPTR: TÜV cert. - GK gloves (Fingersave)' },
      { value: 'shin_guard', label: 'DoC: EU 2016/425, EN 13061 - Shin guard' },
      { value: 'shin_guard_tuv', label: 'TPTR: TÜV cert. - Shin guard' }
    ]
  },
  'NOCSAE': {
    label: 'NOCSAE',
    tptrTypes: [
      { value: 'sei_report', label: 'TPTR: SEI test report' }
    ]
  },
  'KC_mark': {
    label: 'KC mark',
    tptrTypes: [
      { value: 'kc_mark_conf', label: 'KC Mark Supplier Conformity Confirmation new.docx' }
    ]
  },
  'electronic_components_batteries': {
    label: 'electronic components/ batteries',
    tptrTypes: [
      { value: 'elec_safety_1', label: 'TPTR Electrical Safety: IEC 62368-1:2023, IEC60598-1:2021' },
      { value: 'elec_safety_2', label: 'TPTR Electrical Safety: J62368-1 (2023)' },
      { value: 'elec_safety_3', label: 'TPTR Electrical Safety: EN IEC 62368-1-2024+A11:2024' },
      { value: 'elec_safety_4', label: 'TPTR Electrical Safety: CSA C22.2 No. 62368-1:19' },
      { value: 'elec_safety_5', label: 'TPTR Electrical Safety: UL 62368-1:revised October' },
      { value: 'button_cell_1', label: 'TPTR: Button cell battery: UL 4200A' },
      { value: 'button_cell_2', label: 'TPTR: Button cell battery: IEC 62133' },
      { value: 'button_cell_3', label: 'TPTR: Button cell battery: EN 60086' },
      { value: 'button_cell_4', label: 'TPTR: Button cell battery: GB/T 8897' },
      { value: 'emc', label: 'TPTR EMC: CISPR 14-1:2020, CISPR 14-2:2020' },
      { value: 'rohs', label: 'TPTR: RoHS' },
      { value: 'chemical_safety', label: 'TPTR: chemcial safety electronic: GB/T 39560 (all series standards) or IEC 62321:2013 and 2015' },
      { value: 'labeling', label: 'TPTR: labeling: GB/T 26572' },
      { value: 'weee', label: 'TPTR: WEEE' },
      { value: 'en_62471', label: 'TPTR: EN 62471' },
      { value: 'en_55014', label: 'TPTR: EN IEC 55014-1:2021 + EN IEC 55014-2:2021' },
      { value: 'eu_reg', label: 'TPTR: Regulation (EU) 2023/1542 Annex I' },
      { value: 'msds', label: 'TPTR: MSDS' },
      { value: 'inhouse_test', label: 'TPTR: inhouse test: non-recharchable batteries: minimum average duration' },
      { value: 'cep_un1308', label: 'TPTR: CEP-UN1308' },
      { value: 'eu_doc', label: 'EU: DoC' },
      { value: 'uk_coc', label: 'UK: COC: BS IEC 55014-1:2021, BS IEC 55014-2:2021' },
      { value: 'us_gcc', label: 'US: GCC: button cell battery' },
      { value: 'eaeu_cert', label: 'EAEU: ECAS product certificate' },
      { value: 'aus_nz_doc', label: 'Australia/New Zeland: DOC' },
      { value: 'vae_cert', label: 'VAE: ECAS product certificate' },
      { value: 'kc_cert', label: 'KC-mark certificate' }
    ]
  },
  'Roller_skate': {
    label: 'Roller skate',
    tptrTypes: [
      { value: 'en_13899', label: 'TPTR: EN 13899' },
      { value: 'gb_20096', label: 'TPTR: GB/T 20096' }
    ]
  },
  'Vegan': {
    label: 'Vegan',
    tptrTypes: [
      { value: 'doc', label: 'DoC' }
    ]
  },
  'PFC_free': {
    label: 'PFC-free',
    tptrTypes: [
      { value: 'chem_supplier_dec', label: 'PFC-free Declaration (from chemical supplier) - Appendix C' },
      { value: 'hazard_assessment', label: 'Hazard or Alternatives Assessment (Third party audit - Greenscreen, GHS, etc. assessment)' },
      { value: 'fluorine_test', label: 'TPTR: Fluorine Test of formulation' },
      { value: 't2_compliance', label: 'Certificate of Compliance (from T2 supplier) - Appendix D' },
      { value: 't1_compliance', label: 'Certificate of Compliance (from T1 supplier) - Appendix E' }
    ]
  },
  'Type_of_Print': {
    label: 'Type of Print',
    tptrTypes: [
      { value: 'template', label: 'Template with description of the type of the print with composition and chemistry' }
    ]
  },
  'Toys_2': {
    label: 'Toys 2',
    tptrTypes: [
      { value: 'ccc_china', label: 'CCC (China only)' },
      { value: 'tptr_china', label: 'TPTR (China only)' }
    ]
  }
};

// Additional attributes options
const additionalAttributeOptions = [
  { value: 'season', label: 'Season' },
  { value: 'category', label: 'Category' },
  { value: 'division', label: 'Division' },
  { value: 'gender', label: 'Gender' }
];

function AddTPTR() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tptrGroup: null,
    supplier: null,
    colors: [],
    items: [],
    selectAllItems: false,
    compliances: [],
    tptrTypes: {},
    additionalAttribute1: '',
    additionalAttribute2: '',
    additionalAttribute3: '',
    colorSearchTerm: '',
    testReport: null,
    testReportName: '',
    tptrIssueDate: '',
    testParameters: [{ parameter: '', result: '' }],
    compliance: null,
    tptrType: null,
    a01KeyCode: ''
  });

  const [extractedData, setExtractedData] = useState({
    tptrIssueDate: '',
    parameters: []
  });

  const [showRoutingModal, setShowRoutingModal] = useState(false);
  const [routingSupplier, setRoutingSupplier] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRoutingSuccessModal, setShowRoutingSuccessModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [successSupplierName, setSuccessSupplierName] = useState('');

  // Function to get all items for a supplier
  const getAllItemsForSupplier = (supplier) => {
    if (!supplier) return [];
    
    const items = ITEMS_DATABASE[supplier.type] || [];
    return items.map(item => ({
      value: item.id,
      label: `${item.id} - ${item.name}`,
      item: item
    }));
  };

  // Handle TPTR Group change
  const handleTPTRGroupChange = (selected) => {
    setFormData(prev => ({
      ...prev,
      tptrGroup: selected,
      // Reset supplier when TPTR group changes
      supplier: null,
      // Reset colors if changing from color group
      colors: selected?.value !== 'color' ? [] : prev.colors,
      items: []
    }));
  };

  // Handle supplier change
  const handleSupplierChange = (selected) => {
    setFormData(prev => ({
      ...prev,
      supplier: selected,
      items: [], // Reset items when supplier changes
      selectAllItems: false
    }));
  };

  // Handle select all items
  const handleSelectAllItems = (e) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      selectAllItems: checked,
      items: checked ? getAllItemsForSupplier(prev.supplier) : []
    }));
  };

  // Filter color options based on search term
  const getFilteredColorOptions = (searchTerm) => {
    if (!searchTerm) return COLOR_OPTIONS;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return COLOR_OPTIONS.filter(option => 
      // Search by color ID or name
      option.value.toLowerCase().includes(lowerSearchTerm) ||
      option.label.toLowerCase().includes(lowerSearchTerm) ||
      // Search by associated articles
      option.type === 'article' && option.colorHex.toLowerCase().includes(lowerSearchTerm)
    ).map(option => ({
      ...option,
      // Add context to the label if matched by article or material
      description: option.type === 'article' && option.colorHex.toLowerCase().includes(lowerSearchTerm) ? option.label : ''
    }));
  };

  // Custom color option component to show associated items
  const ColorOption = ({ data, ...props }) => (
    <div className={`color-option ${data.type}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          className="color-swatch"
          style={{
            backgroundColor: data.hex || data.colorHex,
            width: '20px',
            height: '20px',
            borderRadius: '4px',
            border: (data.hex || data.colorHex) === '#FFFFFF' ? '1px solid #ddd' : 'none'
          }}
        />
        <div>
          <div>{data.label}</div>
          {data.description && (
            <div className="color-context">{data.description}</div>
          )}
        </div>
      </div>
    </div>
  );

  // Handle file upload for colors
  const handleColorFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Here you would implement the Excel file parsing logic
      console.log('Processing color file:', file);
      // Example structure of the expected Excel file:
      const expectedFormat = {
        headers: ['Color ID', 'Color Name', 'Articles', 'Materials'],
        example: ['COL001', 'Victory Red', 'ART123, ART456', 'MAT789, MAT101']
      };
      // Show upload feedback
      alert('File uploaded successfully. Processing...');
    }
  };

  // Handle compliance selection
  const handleComplianceChange = (compliance, isSelected) => {
    setFormData(prev => ({
      ...prev,
      compliances: isSelected 
        ? [...prev.compliances, compliance]
        : prev.compliances.filter(c => c !== compliance),
      tptrTypes: isSelected 
        ? { ...prev.tptrTypes, [compliance]: [] }
        : Object.fromEntries(Object.entries(prev.tptrTypes).filter(([key]) => key !== compliance))
    }));
  };

  // Handle TPTR type selection for a compliance
  const handleTPTRTypeChange = (compliance, selected) => {
    setFormData(prev => ({
      ...prev,
      tptrTypes: {
        ...prev.tptrTypes,
        [compliance]: selected
      }
    }));
  };

  // Handle file upload for items or colors
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        testReport: file,
        testReportName: file.name
      }));

      // Simulating document data extraction
      // In a real application, this would be replaced with actual document parsing
      setTimeout(() => {
        const extractedValues = {
          tptrIssueDate: new Date().toISOString().split('T')[0],
          parameters: [
            { parameter: 'pH Value', result: '7.2' },
            { parameter: 'Color Fastness', result: 'Grade 4' },
            { parameter: 'Dimensional Stability', result: '±2%' }
          ]
        };

        setExtractedData(extractedValues);
        
        setFormData(prev => ({
          ...prev,
          tptrIssueDate: extractedValues.tptrIssueDate,
          testParameters: extractedValues.parameters
        }));
      }, 1000);
    }
  };

  const addTestParameter = () => {
    setFormData(prev => ({
      ...prev,
      testParameters: [...prev.testParameters, { parameter: '', result: '' }]
    }));
  };

  const removeTestParameter = (index) => {
    setFormData(prev => ({
      ...prev,
      testParameters: prev.testParameters.filter((_, i) => i !== index)
    }));
  };

  const handleTestParameterChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      testParameters: prev.testParameters.map((param, i) => 
        i === index ? { ...param, [field]: value } : param
      )
    }));
  };

  const getFilteredSuppliers = () => {
    if (!formData.tptrGroup) return SUPPLIER_OPTIONS;

    switch (formData.tptrGroup.value) {
      case 'article_model':
        return SUPPLIER_OPTIONS.filter(supplier => supplier.type === 'T1');
      case 'material_component':
        return SUPPLIER_OPTIONS.filter(supplier => supplier.type === 'T2');
      case 'color':
        return SUPPLIER_OPTIONS;
      default:
        return SUPPLIER_OPTIONS;
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saving TPTR data:', formData);
    alert('TPTR data saved successfully!');
  };

  const validateForm = () => {
    const errors = [];

    // TPTR Group validation
    if (!formData.tptrGroup) {
      errors.push("TPTR Group is required");
    }

    // Supplier validation
    if (!formData.supplier) {
      errors.push("Supplier is required");
    }

    // Colors or Items validation based on TPTR Group
    if (formData.tptrGroup?.value === 'color') {
      if (!formData.colors || formData.colors.length === 0) {
        errors.push("At least one Color must be selected for Color TPTR");
      }
    }

    // Items validation with dynamic error message
    if (!formData.items || formData.items.length === 0) {
      const itemType = formData.tptrGroup?.value === 'article_model' ? 'Article/Model' :
                      formData.tptrGroup?.value === 'material_component' ? 'Material/Component' :
                      'Item';
      errors.push(`At least one ${itemType} must be selected`);
    }

    // Compliances validation
    if (!formData.compliances || formData.compliances.length === 0) {
      errors.push("At least one Compliance must be selected");
    }

    // TPTR Types validation for each Compliance
    if (formData.compliances && formData.compliances.length > 0) {
      formData.compliances.forEach(compliance => {
        if (!formData.tptrTypes[compliance] || formData.tptrTypes[compliance].length === 0) {
          errors.push(`TPTR Type is required for ${compliance}`);
        }
      });
    }

    // Validate A-01 Key Code when required
    if (shouldShowA01KeyCode() && !formData.a01KeyCode.trim()) {
      errors.push('A-01 Key Code is required for the selected Compliance and TPTR Type');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowErrorModal(true);
      return;
    }

    try {
      // Add automatic attributes
      const now = new Date().toISOString();
      const currentOrganization = "Brand"; // This would come from your auth system

      const submissionData = {
        ...formData,
        uploadedBy: currentOrganization,
        uploadedDate: now,
        submittedBy: currentOrganization,
        submittedDate: now
      };

      // Your form submission logic here
      // await submitFormData(submissionData);
      
      setShowSuccessModal(true);
      
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/tptr');
      }, 5000);
    } catch (error) {
      setValidationErrors(['An error occurred while submitting the form. Please try again.']);
      setShowErrorModal(true);
    }
  };

  const handleRoute = (selectedSupplier) => {
    if (!selectedSupplier) return;
    
    console.log('Routing TPTR to supplier:', selectedSupplier);
    setRoutingSupplier(selectedSupplier);
  };

  const handleRouteClick = () => {
    if (!routingSupplier) return;
    setShowConfirmation(true);
  };

  const handleRouteConfirm = async () => {
    try {
      const supplierName = routingSupplier?.label;
      setSuccessSupplierName(supplierName);

      // Your routing logic here
      // await routeTPTR(routingSupplier);
      
      // Close the routing confirmation modal
      setShowRoutingModal(false);
      setShowConfirmation(false);
      setRoutingSupplier(null);
      
      // Show routing success modal
      setShowRoutingSuccessModal(true);
      
      // Automatically close success modal and redirect after 5 seconds
      setTimeout(() => {
        setShowRoutingSuccessModal(false);
        setSuccessSupplierName('');
        navigate('/tptr');
      }, 5000);
    } catch (error) {
      setValidationErrors(['An error occurred while routing the TPTR. Please try again.']);
      setShowErrorModal(true);
    }
  };

  // Add this helper function to check if A-01 Key Code should be shown
  const shouldShowA01KeyCode = () => {
    return (
      (formData.compliance?.value === 'A-01' && formData.tptrType?.value === 'A-01 RSL') ||
      (formData.compliance?.value === 'Random Test' && formData.tptrType?.value === 'Random Test A-01')
    );
  };

  // Add these options
  const complianceOptions = [
    { value: 'A-01', label: 'A-01' },
    { value: 'Random Test', label: 'Random Test' },
    // ... other compliance options
  ];

  const tptrTypeOptions = [
    { value: 'A-01 RSL', label: 'A-01 RSL' },
    { value: 'Random Test A-01', label: 'Random Test A-01' },
    // ... other TPTR type options
  ];

  return (
    <div className="add-tptr-container">
      <button 
        type="button"
        onClick={() => navigate('/tptr')} 
        className="back-button"
      >
        ← Back to List
      </button>

      <h1>Add New TPTR</h1>

      <form 
        onSubmit={handleSubmit}
        noValidate // Disable browser's default validation
        className="tptr-form"
      >
        {/* TPTR Group */}
        <div className="form-group">
          <label className="required">TPTR Group</label>
          <Select
            value={formData.tptrGroup}
            onChange={(selected) => setFormData(prev => ({
              ...prev,
              tptrGroup: selected,
              colors: [],
              items: []
            }))}
            options={[
              { value: 'article_model', label: 'Article/Model' },
              { value: 'material_component', label: 'Material/Component' },
              { value: 'color', label: 'Color' }
            ]}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select TPTR Group"
            isClearable
          />
        </div>

        {/* Supplier */}
        <div className="form-group">
          <label className="required">Supplier</label>
          <Select
            value={formData.supplier}
            onChange={(selected) => setFormData(prev => ({
              ...prev,
              supplier: selected
            }))}
            options={SUPPLIER_OPTIONS}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Search Supplier..."
            isClearable
            isSearchable
            formatOptionLabel={(option, { context }) => (
              <div className="supplier-option">
                <span>{option.label}</span>
                {context === 'value' && (
                  <span className="supplier-type">({option.type} supplier)</span>
                )}
              </div>
            )}
          />
        </div>

        {/* Updated Colors field with only the Select component */}
        {formData.tptrGroup?.value === 'color' && (
          <div className="form-group">
            <label className="required">Colors</label>
            <Select
              value={formData.colors}
              onChange={(selected) => setFormData(prev => ({
                ...prev,
                colors: selected || []
              }))}
              options={COLOR_OPTIONS}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Search and select colors..."
              isMulti
              isClearable
              isSearchable
              formatOptionLabel={(option) => (
                <div className={`color-option ${option.type}`}>
                  <div
                    className="color-swatch"
                    style={{
                      backgroundColor: option.hex || option.colorHex
                    }}
                  />
                  <span>{option.label}</span>
                </div>
              )}
            />
            <div className="file-upload">
              <label>Or upload colors from Excel</label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => handleFileUpload(e, 'colors')}
              />
              <div className="file-upload-help">
                <small>
                  Upload an Excel file with columns: Color IDs
                </small>
              </div>
            </div>
          </div>
        )}

        {/* Articles/Models/Materials/Components */}
        {formData.supplier && formData.tptrGroup?.value !== 'color' && (
          <div className="form-group">
            <label>
              {formData.tptrGroup?.value === 'article_model' ? 'Articles/Models' : 
               formData.tptrGroup?.value === 'material_component' ? 'Materials/Components' : 
               'Items'} *
            </label>
            <div className="select-all-option">
              <label>
                <input
                  type="checkbox"
                  checked={formData.selectAllItems}
                  onChange={handleSelectAllItems}
                />
                Select all {formData.tptrGroup?.value === 'article_model' ? 'Articles/Models' : 
                           formData.tptrGroup?.value === 'material_component' ? 'Materials/Components' : 
                           'Items'}
              </label>
            </div>
            <Select
              value={formData.items}
              onChange={(selected) => setFormData(prev => ({
                ...prev,
                items: selected
              }))}
              options={getAllItemsForSupplier(formData.supplier)}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder={`Select ${formData.tptrGroup?.value === 'article_model' ? 'Articles/Models' : 
                                   formData.tptrGroup?.value === 'material_component' ? 'Materials/Components' : 
                                   'Items'}...`}
              isMulti
              isClearable
              isSearchable
            />
            <div className="file-upload">
              <label>Or upload from Excel</label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => handleFileUpload(e, 'items')}
              />
            </div>
          </div>
        )}

        {/* Test Report Upload Section */}
        <section className="form-section">
          <h2>Test Report Details</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label>Compliance</label>
              <Select
                value={formData.compliance}
                onChange={(selected) => setFormData(prev => ({
                  ...prev,
                  compliance: selected,
                  // Reset A-01 Key Code if compliance changes
                  a01KeyCode: shouldShowA01KeyCode() ? prev.a01KeyCode : ''
                }))}
                options={complianceOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select Compliance"
                isClearable
              />
            </div>

            <div className="form-group">
              <label>TPTR Type</label>
              <Select
                value={formData.tptrType}
                onChange={(selected) => setFormData(prev => ({
                  ...prev,
                  tptrType: selected,
                  // Reset A-01 Key Code if TPTR type changes
                  a01KeyCode: shouldShowA01KeyCode() ? prev.a01KeyCode : ''
                }))}
                options={tptrTypeOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select TPTR Type"
                isClearable
              />
            </div>
          </div>

          {/* Conditional A-01 Key Code field */}
          {shouldShowA01KeyCode() && (
            <div className="form-row">
              <div className="form-group">
                <label className="required">A-01 Key Code</label>
                <input
                  type="text"
                  value={formData.a01KeyCode}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    a01KeyCode: e.target.value
                  }))}
                  className="form-input"
                  placeholder="Enter A-01 Key Code"
                />
                <div className="field-hint">
                  This code is required for A-01 RSL and Random Test A-01 reports
                </div>
              </div>
            </div>
          )}

          <div className="file-upload-section">
            <div className="file-upload-container">
              <input
                type="file"
                id="testReport"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="file-input"
              />
              <label htmlFor="testReport" className="file-upload-label">
                <div className="upload-icon">📄</div>
                <div className="upload-text">
                  {formData.testReportName || 'Upload Test Report'}
                  <span className="upload-subtext">
                    Drag & drop or click to upload (PDF, DOC, DOCX)
                  </span>
                </div>
              </label>
            </div>
          </div>

          {formData.testReport && (
            <div className="test-report-details">
              <div className="form-group">
                <label>TPTR Issue Date</label>
                <input
                  type="date"
                  value={formData.tptrIssueDate}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    tptrIssueDate: e.target.value
                  }))}
                  className="form-input"
                />
                {extractedData.tptrIssueDate && (
                  <div className="extracted-value">
                    Extracted value: {new Date(extractedData.tptrIssueDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="test-parameters-section">
                <div className="test-parameters-header">
                  <label>Test Parameters & Results</label>
                  <button
                    type="button"
                    onClick={addTestParameter}
                    className="add-parameter-button"
                  >
                    + Add Parameter
                  </button>
                </div>

                {formData.testParameters.map((param, index) => (
                  <div key={index} className="test-parameter-row">
                    <div className="parameter-inputs">
                      <div className="input-group">
                        <label>Test Parameter</label>
                        <input
                          type="text"
                          value={param.parameter}
                          onChange={(e) => handleTestParameterChange(index, 'parameter', e.target.value)}
                          placeholder="Enter test parameter"
                          className="form-input"
                        />
                        {extractedData.parameters[index]?.parameter && (
                          <div className="extracted-value">
                            Extracted value: {extractedData.parameters[index].parameter}
                          </div>
                        )}
                      </div>
                      
                      <div className="input-group">
                        <label>Test Result/Value</label>
                        <input
                          type="text"
                          value={param.result}
                          onChange={(e) => handleTestParameterChange(index, 'result', e.target.value)}
                          placeholder="Enter test result"
                          className="form-input"
                        />
                        {extractedData.parameters[index]?.result && (
                          <div className="extracted-value">
                            Extracted value: {extractedData.parameters[index].result}
                          </div>
                        )}
                      </div>
                    </div>
                    {formData.testParameters.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTestParameter(index)}
                        className="remove-parameter-button"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Compliances and TPTR Types */}
        <div className="form-group">
          <label>Compliances and TPTR Types *</label>
          <div className="compliances-container">
            {Object.entries(COMPLIANCE_TPTR_MAPPING).map(([key, compliance]) => (
              <div key={key} className="compliance-group">
                <div className="compliance-header">
                  <input
                    type="checkbox"
                    checked={formData.compliances.includes(key)}
                    onChange={(e) => handleComplianceChange(key, e.target.checked)}
                  />
                  <span>{compliance.label}</span>
                </div>
                {formData.compliances.includes(key) && (
                  <div className="tptr-type-group">
                    <Select
                      value={formData.tptrTypes[key]}
                      onChange={(selected) => handleTPTRTypeChange(key, selected)}
                      options={compliance.tptrTypes}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      placeholder={`Select ${compliance.label} TPTR Types...`}
                      isMulti
                      isClearable
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Attributes */}
        <div className="form-group">
          <label>Additional Attributes</label>
          <input
            type="text"
            placeholder="Additional Attribute 1"
            value={formData.additionalAttribute1}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              additionalAttribute1: e.target.value
            }))}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Additional Attribute 2"
            value={formData.additionalAttribute2}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              additionalAttribute2: e.target.value
            }))}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Additional Attribute 3"
            value={formData.additionalAttribute3}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              additionalAttribute3: e.target.value
            }))}
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="save-button"
            onClick={handleSave}
          >
            Save
          </button>
          <button 
            type="button" 
            className="route-button"
            onClick={() => setShowRoutingModal(true)}
          >
            Route TPTR
          </button>
          <button 
            type="submit" 
            className="submit-button"
          >
            Submit
          </button>
        </div>
      </form>

      {showRoutingModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Route TPTR to Supplier</h2>
            <p className="modal-description">
              {formData.tptrGroup?.value === 'article_model' 
                ? 'Select a T1 supplier to route this TPTR'
                : formData.tptrGroup?.value === 'material_component'
                ? 'Select a T2 supplier to route this TPTR'
                : 'Select a supplier to route this TPTR'}
            </p>
            <Select
              value={routingSupplier}
              options={getFilteredSuppliers()}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Select supplier..."
              onChange={handleRoute}
              isSearchable
              formatOptionLabel={(option) => (
                <div className="supplier-option">
                  <span>{option.label}</span>
                  <span className="supplier-type">({option.type} supplier)</span>
                </div>
              )}
            />
            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => {
                  setShowRoutingModal(false);
                  setRoutingSupplier(null);
                  setShowConfirmation(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="route-confirm-button"
                onClick={handleRouteConfirm}
                disabled={!routingSupplier}
              >
                Route
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal-content error-modal">
            <h2>⚠️ Incomplete TPTR Submission</h2>
            <p className="modal-description">
              Please complete all mandatory fields before submitting:
            </p>
            <div className="error-list">
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
            <div className="modal-actions">
              <button 
                className="close-button"
                onClick={() => setShowErrorModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content success-modal">
            <div className="success-icon">✓</div>
            <h2>TPTR Submitted Successfully!</h2>
            <p className="modal-description">
              Your TPTR has been successfully created. Redirecting to TPTR list...
            </p>
          </div>
        </div>
      )}

      {/* Routing Success Modal */}
      {showRoutingSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content success-modal">
            <div className="success-icon">✓</div>
            <h2>TPTR Routed Successfully!</h2>
            <p className="modal-description">
              TPTR has been successfully routed to {successSupplierName}
              <br />
              <br />
              Redirecting to TPTR list...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Update the CSS to ensure no error messages appear below the form
const styles = `
.tptr-form {
  margin-bottom: 0;
  padding-bottom: 0;
}

.form-group {
  margin-bottom: 24px;
  position: relative;
}

/* Remove any default browser validation styling */
.form-group input:invalid,
.form-group select:invalid {
  box-shadow: none;
}

/* Hide any default validation messages */
.form-group input:invalid + span,
.form-group select:invalid + span {
  display: none;
}

/* Ensure the form container doesn't show any overflow */
.add-tptr-container {
  overflow: hidden;
}

/* Keep the error dialog styling */
.error-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.error-content {
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  margin: 0;
}

.error-header {
  margin-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 16px;
}

.error-header h3 {
  color: #dc2626;
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-subtitle {
  color: #4b5563;
  margin: 0;
  font-size: 14px;
}

.error-body {
  margin: 16px 0;
  max-height: 300px;
  overflow-y: auto;
}

.error-body ul {
  margin: 0;
  padding-left: 20px;
  color: #4b5563;
}

.error-body li {
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
}

.error-body li::before {
  content: "•";
  color: #dc2626;
  font-weight: bold;
  position: absolute;
  left: -15px;
}

.error-footer {
  margin-top: 20px;
  border-top: 1px solid #f3f4f6;
  padding-top: 16px;
}

.error-close-button {
  width: 100%;
  padding: 12px 24px;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-close-button:hover {
  background-color: #b91c1c;
}

.form-group.has-error .react-select__control {
  border-color: #dc2626;
}

.form-group.has-error label {
  color: #dc2626;
}

/* Add animation for error dialog */
@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.error-content {
  animation: slideIn 0.3s ease-out;
}
`;

export default AddTPTR; 