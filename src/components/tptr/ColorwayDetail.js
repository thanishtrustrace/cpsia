import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaCalendarAlt, FaUser, FaPalette, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import './ColorwayDetail.css';

function ColorwayDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data for the colorway
  const itemDetails = {
    id: id,
    name: 'Black/White Combo',
    description: 'Two-tone colorway featuring contrasting black and white elements',
    specifications: {
      primaryColor: 'Black (Pantone 19-4005 TCX)',
      secondaryColor: 'White (Pantone 11-0601 TCX)',
      pattern: 'Solid with contrast details',
      dyeingProcess: 'Piece dyed',
      colorFastness: 'Grade 4-5'
    },
    applications: [
      'Main body fabric',
      'Contrast panels',
      'Trims and accessories'
    ]
  };

  // Dummy TPTRs associated with this colorway
  const tptrs = [
    {
      id: "TPTR-2024-001",
      testType: "Color Fastness",
      issueDate: "2024-02-15",
      status: "Passed",
      uploadedBy: "Color Lab Services",
      uploadedDate: "2024-02-16",
      submittedBy: "Dye House QC",
      submittedDate: "2024-02-17",
      result: "Grade 4-5"
    },
    {
      id: "TPTR-2024-002",
      testType: "Color Migration",
      issueDate: "2024-02-18",
      status: "Passed",
      uploadedBy: "Test Lab Corp",
      uploadedDate: "2024-02-19",
      submittedBy: "Lab Manager",
      submittedDate: "2024-02-20",
      result: "No Migration"
    }
  ];

  return (
    <div className="colorway-detail-container">
      <button onClick={() => navigate('/tptr/colors')} className="back-button">
        <FaArrowLeft /> Back to Colorways
      </button>

      <div className="detail-header">
        <h1>
          <FaPalette className="header-icon" />
          {itemDetails.name}
        </h1>
        <div className="header-sub">{itemDetails.id}</div>
      </div>

      <div className="detail-section">
        <h2>Colorway Details</h2>
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
              <label>{key.split(/(?=[A-Z])/).join(' ')}</label>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <h2>Applications</h2>
        <div className="applications-list">
          {itemDetails.applications.map((app, index) => (
            <div key={index} className="application-item">
              {app}
            </div>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <div className="section-header">
          <h2>Test Reports (TPTRs)</h2>
          <Link to={`/tptr/add?colorId=${id}`} className="add-tptr-button">
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

export default ColorwayDetail; 