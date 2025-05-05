import React, { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';
import { appendix1Requests } from '../../data';

function Appendix1RespondForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const requestDetail = appendix1Requests.find(req => req.id === id);

  const [form, setForm] = useState({
    supplier: requestDetail?.supplier || '',
    signature: requestDetail?.signature || '',
    name: requestDetail?.name || '',
    title: requestDetail?.title || '',
    company: requestDetail?.company || '',
    country: requestDetail?.country || '',
    date: requestDetail?.dateSubmitted || '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/a01/appendix1');
    }, 2000); // Show message for 2 seconds, then redirect
  };

  if (!requestDetail) {
    return (
      <div style={{ padding: 32 }}>
        <h2>Request not found</h2>
        <Link to="/a01/appendix1" style={{ color: '#2563eb' }}>← Back to List</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 8, position: 'relative' }}>
      {/* Success Modal */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: '40px 32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            textAlign: 'center',
            minWidth: 320
          }}>
            <div style={{
              fontSize: 48,
              color: '#22c55e',
              marginBottom: 16
            }}>✓</div>
            <h2 style={{ margin: 0, color: '#16a34a' }}>Submission Successful!</h2>
            <p style={{ color: '#374151', marginTop: 12 }}>
              Thank you for submitting your Certificate of Compliance.<br />
              Redirecting to the request list...
            </p>
          </div>
        </div>
      )}

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
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>
            Supplier name or address (contracted factory name):<br />
            <input
              type="text"
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
              required
            />
          </label>
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
            <label>
              Signature:<br />
              <input
                type="text"
                name="signature"
                value={form.signature}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
                required
              />
            </label>
          </div>
          <div style={{ flex: '1 1 200px', marginBottom: 16 }}>
            <label>
              Name (please print):<br />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
                required
              />
            </label>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ flex: '1 1 200px', marginBottom: 16 }}>
            <label>
              Title:<br />
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
                required
              />
            </label>
          </div>
          <div style={{ flex: '1 1 200px', marginBottom: 16 }}>
            <label>
              Company:<br />
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
                required
              />
            </label>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ flex: '1 1 200px', marginBottom: 16 }}>
            <label>
              Country:<br />
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
                required
              />
            </label>
          </div>
          <div style={{ flex: '1 1 200px', marginBottom: 16 }}>
            <label>
              Date:<br />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
                required
              />
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
      <Link to="/a01/appendix1" style={{ color: '#2563eb', marginTop: 24, display: 'inline-block' }}>← Back to List</Link>
    </div>
  );
}

export default Appendix1RespondForm; 