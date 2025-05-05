import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaCalendarAlt, FaUser, FaBuilding, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import './ArticleModelDetail.css';

function ArticleModelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Add a back button
  const handleBack = () => {
    navigate('/tptr/articles');
  };

  // Dummy data for demonstration
  const itemDetails = {
    id: id,
    name: "Men's Running Jacket",
    category: "Article",
    description: "Lightweight running jacket with water-resistant coating",
    articleNumber: "ART-2024-001",
    season: "Spring/Summer 2024",
    supplier: {
      name: "Elite Textile Industries",
      tier: "T1",
      location: "Vietnam",
      contact: "supplier@elitetextile.com"
    },
    specifications: {
      size: "S-XXL",
      material: "100% Polyester",
      construction: "Woven",
      weight: "150 gsm"
    }
  };

  // Dummy TPTR data
  const tptrs = [
    {
      id: "TPTR-2024-001",
      testType: "A-01 RSL",
      issueDate: "2024-02-15",
      status: "Passed",
      uploadedBy: "Elite Textile Industries",
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
    // Add more TPTRs as needed
  ];

  return (
    <div className="article-detail-container">
      {/* Add a back button */}
      <button onClick={handleBack} className="back-button">
        <FaArrowLeft /> Back to Articles
      </button>

      {/* Header Section */}
      <div className="detail-header">
        <h1>{itemDetails.name}</h1>
        <span className={`category-badge ${itemDetails.category.toLowerCase()}`}>
          {itemDetails.category}
        </span>
      </div>

      {/* Article/Model Information */}
      <div className="detail-section">
        <h2>Item Details</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>ID</label>
            <span>{itemDetails.id}</span>
          </div>
          <div className="info-item">
            <label>Article Number</label>
            <span>{itemDetails.articleNumber}</span>
          </div>
          <div className="info-item">
            <label>Season</label>
            <span>{itemDetails.season}</span>
          </div>
          <div className="info-item">
            <label>Description</label>
            <span>{itemDetails.description}</span>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="detail-section">
        <h2>Specifications</h2>
        <div className="info-grid">
          {Object.entries(itemDetails.specifications).map(([key, value]) => (
            <div className="info-item" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Supplier Information */}
      <div className="detail-section">
        <h2>Supplier Information</h2>
        <div className="supplier-card">
          <div className="supplier-header">
            <FaBuilding className="supplier-icon" />
            <h3>{itemDetails.supplier.name}</h3>
            <span className="supplier-tier">{itemDetails.supplier.tier}</span>
          </div>
          <div className="supplier-details">
            <div className="supplier-info">
              <label>Location</label>
              <span>{itemDetails.supplier.location}</span>
            </div>
            <div className="supplier-info">
              <label>Contact</label>
              <span>{itemDetails.supplier.contact}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Updated TPTRs Section */}
      <div className="detail-section">
        <div className="section-header">
          <h2>Test Reports (TPTRs)</h2>
          <Link to={`/tptr/add?articleId=${id}`} className="add-tptr-button">
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

export default ArticleModelDetail; 