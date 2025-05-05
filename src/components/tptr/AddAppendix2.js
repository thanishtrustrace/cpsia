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

function AddAppendix2() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    area: '',
    policyNumber: '',
    version: '',
    pageNumber: '',
    approvalDate: '',
    effectiveDate: '',
    effectiveUntil: '',
    dateOfIssue: '',
    factoryDetails: '',
    articleNumber: '',
    articleName: '',
    poNumbers: '',
    customerNumber: '',
    customerName: '',
    productionMonth: '',
    compliance1: false,
    compliance2: false,
    compliance3: false,
    repName: '',
    repTitle: '',
    repSignature: '',
    repDate: ''
  });

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
      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>
        adidas A-01 Policy Compliance Certificate Form
      </h2>
      <form onSubmit={handleSubmit}>
        <h3>Document Information</h3>
        <div>
          <label>Area:<br />
            <input name="area" value={form.area} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
          </label>
        </div>
        <div>
          <label>Policy Number:<br />
            <input name="policyNumber" value={form.policyNumber} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
          </label>
        </div>
        <div>
          <label>Version:<br />
            <input name="version" value={form.version} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
          </label>
        </div>
        <div>
          <label>Page Number:<br />
            <input name="pageNumber" value={form.pageNumber} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
          </label>
        </div>
        <div>
          <label>Approval Date:<br />
            <input name="approvalDate" value={form.approvalDate} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} placeholder="DD/MM/YYYY" />
          </label>
        </div>
        <div>
          <label>Effective Date:<br />
            <input name="effectiveDate" value={form.effectiveDate} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} placeholder="DD/MM/YYYY" />
          </label>
        </div>
        <div>
          <label>Effective Until:<br />
            <input name="effectiveUntil" value={form.effectiveUntil} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} placeholder="DD/MM/YYYY" />
          </label>
        </div>
        <hr style={{ margin: '16px 0' }} />
        <div style={{ fontStyle: 'italic', color: '#6b7280', marginBottom: 16 }}>
          This document contains confidential information intended only for adidas and its authorised suppliers, subcontractors, and materials suppliers. The recipient must not disclose any information except to employees needing it to comply with this policy.
        </div>
        <hr style={{ margin: '16px 0' }} />
        <h3>CERTIFICATE OF COMPLIANCE</h3>
        <div>
          <label>Date of Issue:<br />
            <input name="dateOfIssue" value={form.dateOfIssue} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} placeholder="DD/MM/YYYY" />
          </label>
        </div>
        <div>
          <label>Factory Name / Country:<br />
            <input name="factoryDetails" value={form.factoryDetails} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
          </label>
        </div>
        <div>
          <label>Article Number:<br />
            <input name="articleNumber" value={form.articleNumber} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
          </label>
        </div>
        <div>
          <label>Article Name:<br />
            <input name="articleName" value={form.articleName} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
          </label>
        </div>
        <div>
          <label>List of P.O. Numbers:<br />
            <input name="poNumbers" value={form.poNumbers} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} placeholder="Separate with commas" />
          </label>
        </div>
        <div>
          <label>Customer Number:<br />
            <input name="customerNumber" value={form.customerNumber} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
          </label>
        </div>
        <div>
          <label>Customer Name:<br />
            <input name="customerName" value={form.customerName} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
          </label>
        </div>
        <div>
          <label>Production Month:<br />
            <input name="productionMonth" value={form.productionMonth} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} placeholder="MM/YYYY" />
          </label>
        </div>
        <hr style={{ margin: '16px 0' }} />
        <div>
          <label>
            <input type="checkbox" name="compliance1" checked={form.compliance1} onChange={handleChange} required />{' '}
            We hereby certify that the above-mentioned P.O.s comply with the adidas A-01 Policy. All materials have been tested and found within A-01 threshold limits and fulfill respective legal requirements.
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="compliance2" checked={form.compliance2} onChange={handleChange} required />{' '}
            We agree to be held fully liable for loss and damage resulting from non-compliance or the presence of hazardous substances.
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="compliance3" checked={form.compliance3} onChange={handleChange} required />{' '}
            We acknowledge being informed about the Policy contents and agree to comply with all requirements.
          </label>
        </div>
        <hr style={{ margin: '16px 0' }} />
        <h3>Factory Representative</h3>
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
            <input name="repDate" value={form.repDate} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} placeholder="DD/MM/YYYY" />
          </label>
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