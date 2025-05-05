import React from 'react';
import { useParams, Link } from 'react-router-dom';

function CPSIAArticleDetail({ data }) {
  const { productId } = useParams();
  // Find all certificates for this productId
  const certs = data.filter(cert => {
    const id = cert.productId?.value || cert.productId;
    return id === productId;
  });
  if (certs.length === 0) {
    return <div style={{ padding: 32 }}><h2>No certificates found for {productId}</h2></div>;
  }
  const { brand, productType, productDescription } = certs[0];
  return (
    <div className="list-view-container">
      <div className="list-view-header">
        <h1>Certificates for Article: {productId}</h1>
        <div style={{ marginBottom: 16 }}>
          <b>Brand:</b> {brand} &nbsp; <b>Type:</b> {productType} &nbsp; <b>Description:</b> {productDescription}
        </div>
        <Link to="/articles" style={{ color: '#2563eb', textDecoration: 'underline' }}>← Back to Articles</Link>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Certificate ID</th>
              <th>PO Numbers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certs.map(cert => (
              <tr key={cert.id}>
                <td>{cert.id}</td>
                <td>{(cert.poNo || []).join(', ')}</td>
                <td>
                  <Link to={`/details/${cert.id}`}>View Certificate</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CPSIAArticleDetail; 