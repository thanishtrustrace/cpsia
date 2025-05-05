import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFileAlt, FaCalendarAlt, FaUser, FaBuilding } from 'react-icons/fa';
import './TPTRDetail.css';

function TPTRDetail() {
  const { tptrId } = useParams();
  const navigate = useNavigate();

  // Dummy data for TPTRs - in a real app, this would come from an API or database
  const tptrData = {
    'TPTR-2024-001': {
      id: 'TPTR-2024-001',
      testType: 'A-01 RSL',
      issueDate: '2024-02-15',
      status: 'Passed',
      result: 'Compliant',
      uploadedBy: {
        name: 'Elite Textile Industries',
        type: 'T1'
      },
      uploadedDate: '2024-02-16',
      submittedBy: {
        name: 'Quality Control Team',
        type: 'Internal'
      },
      submittedDate: '2024-02-17',
      relatedItem: {
        id: 'ART-2024-001',
        name: "Men's Running Jacket",
        type: 'Article'
      },
      testParameters: [
        {
          parameter: 'Lead Content',
          value: '< 0.1 mg/kg',
          result: 'Pass'
        },
        {
          parameter: 'pH Value',
          value: '7.2',
          result: 'Pass'
        }
      ],
      supplier: {
        name: 'Elite Textile Industries',
        tier: 'T1',
        location: 'Vietnam',
        contact: 'supplier@elitetextile.com'
      }
    },
    'TPTR-2024-002': {
      id: 'TPTR-2024-002',
      testType: 'Physical Test',
      issueDate: '2024-02-18',
      status: 'Passed',
      result: 'Meets Standards',
      uploadedBy: {
        name: 'Test Lab Corp',
        type: 'Lab'
      },
      uploadedDate: '2024-02-19',
      submittedBy: {
        name: 'Lab Manager',
        type: 'External'
      },
      submittedDate: '2024-02-20',
      relatedItem: {
        id: 'ART-2024-002',
        name: "Women's Training Shorts",
        type: 'Article'
      },
      testParameters: [
        {
          parameter: 'Colorfastness to Washing',
          value: 'Grade 4-5',
          result: 'Pass'
        },
        {
          parameter: 'Dimensional Stability',
          value: '±2%',
          result: 'Pass'
        }
      ],
      supplier: {
        name: 'Global Apparel Solutions',
        tier: 'T1',
        location: 'Malaysia',
        contact: 'quality@globalapparel.com'
      }
    }
  };

  // Find the TPTR data
  const tptr = tptrData[tptrId];

  // Handle case when TPTR is not found
  if (!tptr) {
    return (
      <div className="tptr-detail-container">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <div className="error-message">
          TPTR report not found for ID: {tptrId}
        </div>
      </div>
    );
  }

  return (
    <div className="tptr-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Back
      </button>

      {/* Header Section */}
      <div className="detail-header">
        <div className="header-main">
          <h1>
            <FaFileAlt className="header-icon" />
            {tptr.id}
          </h1>
          <span className={`status-badge ${tptr.status.toLowerCase()}`}>
            {tptr.status}
          </span>
        </div>
        <div className="header-sub">
          Related to: {tptr.relatedItem.type} - {tptr.relatedItem.name}
        </div>
      </div>

      {/* Basic Information */}
      <div className="detail-section">
        <h2>Test Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Test Type</label>
            <span>{tptr.testType}</span>
          </div>
          <div className="info-item">
            <label>Issue Date</label>
            <span>{tptr.issueDate}</span>
          </div>
          <div className="info-item">
            <label>Result</label>
            <span className={`result ${tptr.result.toLowerCase().replace(/\s+/g, '-')}`}>
              {tptr.result}
            </span>
          </div>
        </div>
      </div>

      {/* Supplier Information */}
      <div className="detail-section">
        <h2>Supplier Information</h2>
        <div className="supplier-card">
          <div className="supplier-header">
            <FaBuilding className="supplier-icon" />
            <h3>{tptr.supplier.name}</h3>
            <span className="supplier-tier">{tptr.supplier.tier}</span>
          </div>
          <div className="supplier-details">
            <div className="supplier-info">
              <label>Location</label>
              <span>{tptr.supplier.location}</span>
            </div>
            <div className="supplier-info">
              <label>Contact</label>
              <span>{tptr.supplier.contact}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Test Parameters */}
      <div className="detail-section">
        <h2>Test Parameters</h2>
        <div className="parameters-table">
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {tptr.testParameters.map((param, index) => (
                <tr key={index}>
                  <td>{param.parameter}</td>
                  <td>{param.value}</td>
                  <td>
                    <span className={`parameter-result ${param.result.toLowerCase()}`}>
                      {param.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Information */}
      <div className="detail-section">
        <h2>Document History</h2>
        <div className="history-timeline">
          <div className="timeline-item">
            <div className="timeline-header">
              <FaUser className="timeline-icon" />
              <span className="timeline-title">Uploaded by</span>
            </div>
            <div className="timeline-content">
              <div className="timeline-main">
                {tptr.uploadedBy.name}
                <span className="user-type">{tptr.uploadedBy.type}</span>
              </div>
              <div className="timeline-date">
                <FaCalendarAlt className="date-icon" />
                {tptr.uploadedDate}
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-header">
              <FaUser className="timeline-icon" />
              <span className="timeline-title">Submitted by</span>
            </div>
            <div className="timeline-content">
              <div className="timeline-main">
                {tptr.submittedBy.name}
                <span className="user-type">{tptr.submittedBy.type}</span>
              </div>
              <div className="timeline-date">
                <FaCalendarAlt className="date-icon" />
                {tptr.submittedDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TPTRDetail; 