import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy options for multi-selects
const poOptions = [
  { value: 'PO-1001', label: 'PO-1001' },
  { value: 'PO-1002', label: 'PO-1002' },
  { value: 'PO-1003', label: 'PO-1003' }
];
const articleOptions = [
  { value: 'ART-001', label: 'ART-001' },
  { value: 'ART-002', label: 'ART-002' },
  { value: 'ART-003', label: 'ART-003' }
];
const factoryOptions = [
  { value: 'Elite Manufacturing Co., Vietnam', label: 'Elite Manufacturing Co., Vietnam' },
  { value: 'Global Apparel Solutions, China', label: 'Global Apparel Solutions, China' },
  { value: 'Premier Garments, Bangladesh', label: 'Premier Garments, Bangladesh' },
  { value: 'Textile World Trading, India', label: 'Textile World Trading, India' },
  { value: 'Supreme Materials, Indonesia', label: 'Supreme Materials, Indonesia' }
];
const articleNameOptions = [
  { value: 'ART-001', label: 'Superstar Shoes' },
  { value: 'ART-002', label: 'Ultraboost Sneakers' },
  { value: 'ART-003', label: 'Stan Smith Originals' },
  { value: 'ART-004', label: 'NMD_R1' },
  { value: 'ART-005', label: 'Gazelle Vintage' }
];

function AddAppendix2() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    area: 'GOPS/GL&C',
    policyNumber: 'A0145',
    version: '22',
    approvalDate: 'August 5, 24',
    effectiveDate: 'Sep 1, 24',
    effectiveUntil: 'Sep 30, 25',
    dateOfIssue: '',
    factoryDetails: '',
    articleNumbers: [],
    articleName: '',
    poNumbers: [],
    customerInfo: '',
    productionMonth: '',
    compliance: false,
    repName: '',
    repTitle: '',
    repSignature: '',
    repDate: '',
    selectedArticles: [],
    selectedPOs: {},
    articleSearch: ''
  });
  const [showArticleDropdown, setShowArticleDropdown] = useState(false);
  const [articleSearch, setArticleSearch] = useState('');
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [selectedPOsByArticle, setSelectedPOsByArticle] = useState({});

  // Generate 350 POs for ART-001 in March 2025
  const poList350 = Array.from({ length: 350 }, (_, i) => ({
    po: `PO-${1001 + i}`,
    delivery: `2025-03-${String((i % 31) + 1).padStart(2, '0')}`,
    month: 'March 2025'
  }));

  const articlePOs = {
    'ART-001': [
      ...poList350,
      { po: 'PO-1351', delivery: '2025-04-10', month: 'April 2025' }
    ],
    'ART-002': [
      { po: 'PO-2001', delivery: '2025-03-05', month: 'March 2025' },
      { po: 'PO-2002', delivery: '2025-04-12', month: 'April 2025' }
    ],
    'ART-003': [
      { po: 'PO-3001', delivery: '2025-05-01', month: 'May 2025' }
    ],
    'ART-004': [
      { po: 'PO-4001', delivery: '2025-03-22', month: 'March 2025' },
      { po: 'PO-4002', delivery: '2025-04-18', month: 'April 2025' }
    ],
    'ART-005': [
      { po: 'PO-5001', delivery: '2025-06-10', month: 'June 2025' }
    ]
  };

  // Group POs by month for a given article
  const getGroupedPOs = (article) => {
    const pos = articlePOs[article] || [];
    return pos.reduce((acc, curr) => {
      acc[curr.month] = acc[curr.month] || [];
      acc[curr.month].push(curr);
      return acc;
    }, {});
  };

  // Handle article selection
  const handleAddArticle = (articleValue, articleLabel) => {
    if (!selectedArticles.includes(articleValue)) {
      setSelectedArticles(prev => [...prev, articleValue]);
      setArticleSearch('');
      setShowArticleDropdown(false);
    }
  };

  // Remove article
  const handleRemoveArticle = (articleValue) => {
    setSelectedArticles(prev => prev.filter(a => a !== articleValue));
    setSelectedPOsByArticle(prev => {
      const copy = { ...prev };
      delete copy[articleValue];
      return copy;
    });
  };

  // Handle PO checkbox for a given article
  const handlePOCheckbox = (article, po) => {
    setSelectedPOsByArticle(prev => {
      const prevPOs = prev[article] || [];
      return {
        ...prev,
        [article]: prevPOs.includes(po)
          ? prevPOs.filter(p => p !== po)
          : [...prevPOs, po]
      };
    });
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelect = (name, values) => {
    setForm(f => ({
      ...f,
      [name]: values
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Appendix 2 submitted!\n' + JSON.stringify(form, null, 2));
    navigate('/a01/appendix2');
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <button
        type="button"
        onClick={() => navigate('/a01/appendix2')}
        style={{
          background: 'none',
          border: 'none',
          color: '#2563eb',
          cursor: 'pointer',
          marginBottom: 12,
          fontSize: 16,
          textDecoration: 'underline',
          padding: 0
        }}
      >
        ← Back to Appendix 2 List
      </button>
      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>
        adidas A-01 Policy Compliance Certificate Form - Appendix 2
      </h2>
      <form onSubmit={handleSubmit}>
        <h3>Document Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: 16 }}>
          <div>
            <label>Area:<br />
              <input name="area" value={form.area} readOnly style={{ width: '100%', marginBottom: 8, background: '#f3f4f6' }} />
            </label>
          </div>
          <div>
            <label>Policy Number:<br />
              <input name="policyNumber" value={form.policyNumber} readOnly style={{ width: '100%', marginBottom: 8, background: '#f3f4f6', fontWeight: 'bold' }} />
            </label>
          </div>
          <div>
            <label>Version:<br />
              <input name="version" value={form.version} readOnly style={{ width: '100%', marginBottom: 8, background: '#f3f4f6', fontWeight: 'bold' }} />
            </label>
          </div>
          <div>
            <label>Approval Date:<br />
              <input name="approvalDate" value={form.approvalDate} readOnly style={{ width: '100%', marginBottom: 8, background: '#f3f4f6' }} />
            </label>
          </div>
          <div>
            <label>Effective Date:<br />
              <input name="effectiveDate" value={form.effectiveDate} readOnly style={{ width: '100%', marginBottom: 8, background: '#f3f4f6' }} />
            </label>
          </div>
          <div>
            <label>Effective Until:<br />
              <input name="effectiveUntil" value={form.effectiveUntil} readOnly style={{ width: '100%', marginBottom: 8, background: '#f3f4f6', fontWeight: 'bold' }} />
            </label>
          </div>
        </div>
        <hr style={{ margin: '16px 0' }} />
        <div style={{ fontStyle: 'italic', color: '#6b7280', marginBottom: 16 }}>
          This document contains confidential information intended only for adidas and its authorised suppliers, subcontractors, and materials suppliers. The recipient must not disclose any information except to employees needing it to comply with this policy.
        </div>
        <hr style={{ margin: '16px 0' }} />
        <h3>CERTIFICATE OF COMPLIANCE</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: 16 }}>
          <div>
            <label>Date of Issue:<br />
              <input type="date" name="dateOfIssue" value={form.dateOfIssue} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
            </label>
          </div>
          <div>
            <label>Factory Name / Country:<br />
              <select name="factoryDetails" value={form.factoryDetails} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }}>
                <option value="">Select a factory</option>
                {factoryOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: 16 }}>
          <div>
            <label>Customer Name & Number:<br />
              <select name="customerInfo" value={form.customerInfo} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }}>
                <option value="">Select a customer</option>
                <option value="John Doe / 12345">John Doe / 12345</option>
                <option value="Jane Smith / 67890">Jane Smith / 67890</option>
                <option value="Bob Johnson / 54321">Bob Johnson / 54321</option>
              </select>
            </label>
          </div>
          <div>
            <label>Production Month:<br />
              <input type="month" name="productionMonth" value={form.productionMonth} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
            </label>
          </div>
        </div>
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <label>Article Name:<br />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
              {selectedArticles.map(articleValue => {
                const label = articleNameOptions.find(opt => opt.value === articleValue)?.label || articleValue;
                return (
                  <span key={articleValue} style={{ background: '#e0e7ff', padding: '4px 8px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {label}
                    <button type="button" onClick={() => handleRemoveArticle(articleValue)} style={{ background: 'none', border: 'none', color: '#1e40af', cursor: 'pointer', fontWeight: 700, fontSize: 14, marginLeft: 2 }}>&times;</button>
                  </span>
                );
              })}
            </div>
            <input
              type="text"
              autoComplete="off"
              placeholder="Search and select article..."
              value={articleSearch}
              onChange={e => {
                setArticleSearch(e.target.value);
                setShowArticleDropdown(true);
              }}
              onFocus={() => setShowArticleDropdown(true)}
              style={{ width: '100%', marginBottom: 8 }}
            />
            {showArticleDropdown && (
              <div style={{
                position: 'absolute',
                zIndex: 10,
                background: '#fff',
                border: '1px solid #ccc',
                width: '100%',
                maxHeight: 180,
                overflowY: 'auto',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                {articleNameOptions
                  .filter(opt =>
                    opt.label.toLowerCase().includes(articleSearch.toLowerCase()) &&
                    !selectedArticles.includes(opt.value)
                  )
                  .map(opt => (
                    <div
                      key={opt.value}
                      style={{ padding: 8, cursor: 'pointer', background: '#fff' }}
                      onMouseDown={() => handleAddArticle(opt.value, opt.label)}
                    >
                      {opt.label}
                    </div>
                  ))}
                {articleNameOptions.filter(opt =>
                  opt.label.toLowerCase().includes(articleSearch.toLowerCase()) &&
                  !selectedArticles.includes(opt.value)
                ).length === 0 && (
                  <div style={{ padding: 8, color: '#888' }}>No results</div>
                )}
              </div>
            )}
          </label>
        </div>
        {/* Show POs for each selected article, grouped by month */}
        {selectedArticles.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            {selectedArticles.map(article => {
              const groupedPOs = getGroupedPOs(article);
              return (
                <div key={article} style={{ marginBottom: 24 }}>
                  <h4>Purchase Orders for {articleNameOptions.find(opt => opt.value === article)?.label}</h4>
                  {Object.entries(groupedPOs).map(([month, pos]) => (
                    <div key={month} style={{ marginBottom: 12, padding: 8, background: '#f9fafb', borderRadius: 6 }}>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>{month}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        {pos.map(po => (
                          <label key={po.po} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <input
                              type="checkbox"
                              checked={Array.isArray(selectedPOsByArticle[article]) && selectedPOsByArticle[article].includes(po.po)}
                              onChange={() => handlePOCheckbox(article, po.po)}
                            />
                            {po.po} <span style={{ color: '#6b7280', fontSize: 13 }}>({po.delivery})</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Summary Section */}
        {selectedArticles.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h4>Summary</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: 8 }}>Article</th>
                  <th style={{ border: '1px solid #ddd', padding: 8 }}>Selected POs</th>
                </tr>
              </thead>
              <tbody>
                {selectedArticles.map(article => (
                  <tr key={article}>
                    <td style={{ border: '1px solid #ddd', padding: 8 }}>{articleNameOptions.find(opt => opt.value === article)?.label}</td>
                    <td style={{ border: '1px solid #ddd', padding: 8 }}>{(selectedPOsByArticle[article] || []).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <hr style={{ margin: '16px 0' }} />
        <div>
          <label>
            <input type="checkbox" name="compliance" checked={form.compliance} onChange={handleChange} required />{' '}
            We hereby certify that the above-mentioned P.O.s comply with the adidas A-01 Policy. All materials have been tested and found within A-01 threshold limits and fulfill respective legal requirements. We agree to be held fully liable for loss and damage resulting from non-compliance or the presence of hazardous substances. We acknowledge being informed about the Policy contents and agree to comply with all requirements.
          </label>
        </div>
        <hr style={{ margin: '16px 0' }} />
        <h3>Factory Representative</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: 16 }}>
          <div>
            <label>Name:<br />
              <input name="repName" value={form.repName} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
            </label>
          </div>
          <div>
            <label>Title:<br />
              <input name="repTitle" value={form.repTitle} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
            </label>
          </div>
          <div>
            <label>Signature:<br />
              <input name="repSignature" value={form.repSignature} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} placeholder="Sign here" />
            </label>
          </div>
          <div>
            <label>Date:<br />
              <input type="date" name="repDate" value={form.repDate} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
            </label>
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          <button
            type="submit"
            style={{
              padding: '10px 32px',
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAppendix2; 