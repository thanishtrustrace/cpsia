import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaCalendarAlt, FaUser, FaBuilding, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import './MaterialComponentDetail.css';

function MaterialComponentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data for the material/component
  const itemDetails = {
    id: id,
    name: id.startsWith('MAT') ? 'Polyester Mesh Fabric' : 'YKK Zipper',
    category: id.startsWith('MAT') ? 'Material' : 'Component',
    description: id.startsWith('MAT') 
      ? "High-performance polyester mesh with moisture-wicking properties"
      : "Premium quality zipper for sportswear",
    specifications: {
      type: id.startsWith('MAT') ? 'Woven Fabric' : 'Metal Component',
      composition: id.startsWith('MAT') ? '100% Polyester' : 'Metal Alloy',
      supplier: 'Elite Manufacturing Co.',
      usage: id.startsWith('MAT') ? 'Main Body Material' : 'Closure System'
    }
  };

  // Dummy TPTRs associated with this material/component
  const tptrs = [
    {
      id: "TPTR-2024-001",
      testType: "A-01 RSL",
      issueDate: "2024-02-15",
      status: "Passed",
      uploadedBy: "Elite Manufacturing Co.",
      uploadedDate: "2024-02-16",
      submittedBy: "Quality Control Team",
      submittedDate: "2024-02-17",
      result: "Compliant"
    },
    {
      id: "TPTR-2024-002",
      testType: "Physical Test",
      issueDate: "2024-02-18",
      status: "Passed",
      uploadedBy: "Test Lab Corp",
      uploadedDate: "2024-02-19",
      submittedBy: "Lab Manager",
      submittedDate: "2024-02-20",
      result: "Meets Standards"
    }
  ];

  return (
    <div className="material-detail-container">
      <button onClick={() => navigate('/tptr/materials')} className="back-button">
        <FaArrowLeft /> Back to Materials & Components
      </button>

      <div className="detail-header">
        <h1>{itemDetails.name}</h1>
        <span className={`category-badge ${itemDetails.category.toLowerCase()}`}>
          {itemDetails.category}
        </span>
      </div>

      <div className="detail-section">
        <h2>Item Details</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>ID</label>
            <span>{itemDetails.id}</span>
          </div>
          <div className="info-item">
            <label>Description</label>
            <span>{itemDetails.description}</span>
          </div>
          {Object.entries(itemDetails.specifications).map(([key, value]) => (
            <div className="info-item" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <div className="section-header">
          <h2>Test Reports (TPTRs)</h2>
          <Link to={`/tptr/add?materialId=${id}`} className="add-tptr-button">
            Add New TPTR
          </Link>
        </div>
        <div className="tptr-list">
          {tptrs.map((tptr) => (
            <div key={tptr.id} className="tptr-card">
              <Link to={`/tptr/${tptr.id}`} className="tptr-card-link">
                <div className="tptr-header">
                  <div className="tptr-id">
                    <FaFileAlt className="tptr-icon" />
                    {tptr.id}
                    <FaExternalLinkAlt className="external-link-icon" />
                  </div>
                  <span className={`status-badge ${tptr.status.toLowerCase()}`}>
                    {tptr.status}
                  </span>
                </div>
                <div className="tptr-details">
                  <div className="tptr-info-grid">
                    <div className="tptr-info">
                      <label>Test Type</label>
                      <span>{tptr.testType}</span>
                    </div>
                    <div className="tptr-info">
                      <label>Issue Date</label>
                      <span>{tptr.issueDate}</span>
                    </div>
                    <div className="tptr-info">
                      <label>Result</label>
                      <span>{tptr.result}</span>
                    </div>
                  </div>
                  <div className="tptr-upload-info">
                    <div className="upload-detail">
                      <FaUser className="info-icon" />
                      <span>Uploaded by {tptr.uploadedBy}</span>
                      <FaCalendarAlt className="info-icon" />
                      <span>{tptr.uploadedDate}</span>
                    </div>
                    <div className="upload-detail">
                      <FaUser className="info-icon" />
                      <span>Submitted by {tptr.submittedBy}</span>
                      <FaCalendarAlt className="info-icon" />
                      <span>{tptr.submittedDate}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MaterialComponentDetail; 