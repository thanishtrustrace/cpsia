// src/DetailView.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

function DetailView({ data }) {
  const { id } = useParams();
  const item = data.find(record => record.id === parseInt(id));

  if (!item) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Record not found</h2>
        <Link to="/" style={{ color: '#4f46e5', textDecoration: 'none' }}>Back to List</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ color: '#4f46e5', textDecoration: 'none', display: 'block', marginBottom: '20px' }}>
        ← Back to List
      </Link>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px' }}>
        <h2 style={{ marginTop: 0 }}>Certificate Details</h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div><strong>Certificate ID:</strong> {item.certificateId}</div>
          <div><strong>Brand:</strong> {item.brand}</div>
          <div><strong>Article ID:</strong> {item.articleId}</div>
          <div><strong>Product Type:</strong> {item.productType}</div>
          <div><strong>T1 Factory:</strong> {item.t1Factory}</div>
          <div><strong>Production Month:</strong> {item.prodMonth}</div>
          <div><strong>Last Updated:</strong> {item.lastUpdatedOn}</div>
        </div>
      </div>
    </div>
  );
}

export default DetailView;