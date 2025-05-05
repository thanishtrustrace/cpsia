import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './TPTRListViews.css';

function ArticleModelList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const itemsPerPage = 10;

  const articles = [
    { id: 'ART-2024-001', name: 'Men\'s Running Jacket', category: 'Article' },
    { id: 'ART-2024-002', name: 'Women\'s Training Shorts', category: 'Article' },
    { id: 'MOD-2024-001', name: 'Basic T-Shirt Pattern', category: 'Model' },
    { id: 'ART-2024-003', name: 'Kids Performance T-Shirt', category: 'Article' },
    { id: 'MOD-2024-002', name: 'Standard Pants Cut', category: 'Model' },
    // Add more dummy data...
  ];

  const filteredItems = useMemo(() => {
    return articles.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="list-view-container">
      <div className="list-view-header">
        <h1>Articles & Models</h1>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by ID or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="Article">Article</option>
            <option value="Model">Model</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <span className={`category-badge ${item.category.toLowerCase()}`}>
                    {item.category}
                  </span>
                </td>
                <td className="action-buttons">
                  <Link 
                    to={`/tptr/articles/detail/${item.id}`} 
                    className="view-link"
                  >
                    View TPTRs
                  </Link>
                  <Link 
                    to={`/tptr/add?articleId=${item.id}`} 
                    className="add-link"
                  >
                    Add TPTR
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ArticleModelList; 