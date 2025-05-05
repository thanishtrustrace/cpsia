import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { appendix1Requests } from '../../data';

function Appendix1RequestDetail() {
  const { id } = useParams();
  const requestDetail = appendix1Requests.find(req => req.id === id);

  if (!requestDetail) {
    return (
      <div style={{ padding: 32 }}>
        <h2>Request not found</h2>
        <Link to="/a01/appendix1" style={{ color: '#2563eb' }}>← Back to List</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <div style={{
        background: '#f3f4f6',
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ margin: 0, marginBottom: 12, color: '#2563eb', fontWeight: 700 }}>Request Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div><strong>Request ID:</strong> {requestDetail.id}</div>
          <div><strong>Date of Request:</strong> {requestDetail.requestDate}</div>
          <div><strong>Supplier:</strong> {requestDetail.supplier}</div>
          <div><strong>Due Date:</strong> {requestDetail.dueDate}</div>
          <div><strong>Date Submitted:</strong> {requestDetail.dateSubmitted || '-'}</div>
          <div>
            <strong>Status:</strong>{' '}
            <span style={{
              color: requestDetail.status === "Pending" ? "#b91c1c" :
                     requestDetail.status === "Submitted on time" ? "#15803d" : "#ca8a04",
              fontWeight: 600
            }}>
              {requestDetail.status}
            </span>
          </div>
        </div>
      </div>
      <div style={{ background: '#d9f99d', padding: '4px 12px', fontWeight: 600, marginBottom: 16, display: 'inline-block' }}>
        Appendix 1
      </div>
      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>
        CERTIFICATE OF COMPLIANCE<br />
        with the adidas A 01 Policy for the Control and Monitoring of hazardous Substances (the "Policy")
      </h2>
      <p style={{ marginBottom: 16 }}>
        We hereby acknowledge receipt of the adidas Policy (the "Policy") for the Control and Monitoring of Hazardous Substances (A-01 environmental requirements) - as far as our products are concerned - and certify that the products shipped to adidas (adidas AG and its subsidiaries from time to time) or to manufacturers for adidas products with effect from September 1<sup>st</sup>, 2023 (the "Effective Date") will be "free of hazardous substances" according to the given requirements as listed in the Policy, which may be amended by adidas from time to time.
      </p>
      <p style={{ marginBottom: 16 }}>
        We agree to be held fully liable for all loss and damage suffered by adidas as a result of any non-compliance with the Policy or that any hazardous substances are found in any of the materials, components or products supplied by
      </p>
      <div style={{ marginBottom: 16, fontWeight: 500 }}>
        (appropriate name or adidas subcontracted factory name):<br />
        <span style={{ fontWeight: 400 }}>{requestDetail.supplier}</span>
      </div>
      <p style={{ marginBottom: 16 }}>
        to adidas or to manufacturers for adidas products with effect from the Effective Date. We confirm that we have been specifically informed by adidas about the content of the Policy and hereby agree to comply with all requirements contained therein.
      </p>
      <p style={{ marginBottom: 16 }}>
        <b>Period of Validity:</b> For 10 months starting from the Effective Date
      </p>
      <div style={{ marginBottom: 16, fontWeight: 500 }}>Acknowledged and agreed:</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ flex: '1 1 200px', marginBottom: 16 }}>
          <label>Signature:</label><br />
          <span style={{ fontWeight: 400 }}>{requestDetail.signature || "____________________"}</span>
        </div>
        <div style={{ flex: '1 1 200px', marginBottom: 16 }}>
          <label>Name (please print):</label><br />
          <span style={{ fontWeight: 400 }}>{requestDetail.name || "____________________"}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ flex: '1 1 200px', marginBottom: 16 }}>
          <label>Title:</label><br />
          <span style={{ fontWeight: 400 }}>{requestDetail.title || "____________________"}</span>
        </div>
        <div style={{ flex: '1 1 200px', marginBottom: 16 }}>
          <label>Company:</label><br />
          <span style={{ fontWeight: 400 }}>{requestDetail.company || "____________________"}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ flex: '1 1 200px', marginBottom: 16 }}>
          <label>Country:</label><br />
          <span style={{ fontWeight: 400 }}>{requestDetail.country || "____________________"}</span>
        </div>
      </div>
      <Link to="/a01/appendix1" style={{ color: '#2563eb', marginTop: 24, display: 'inline-block' }}>← Back to List</Link>
    </div>
  );
}

export default Appendix1RequestDetail; 