import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './TPTRListViews.css';

function ColorwayList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  const colors = [
    { id: 'COL-2024-001', name: 'Black/White Combo' },
    { id: 'COL-2024-002', name: 'Navy/Red Pattern' },
    { id: 'COL-2024-003', name: 'Heather Grey Mix' },
    { id: 'COL-2024-004', name: 'Neon Yellow' },
    { id: 'COL-2024-005', name: 'Digital Camo Print' },
    { id: 'COL-2024-006', name: 'Forest Green' },
    { id: 'COL-2024-007', name: 'Ocean Blue Fade' },
    { id: 'COL-2024-008', name: 'Red/Black Stripe' },
    // Add more colors as needed
  ];

  const filteredItems = useMemo(() => {
    return colors.filter(item => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.id.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [colors, searchQuery]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="list-view-container">
      <div className="list-view-header">
        <h1>Colorways</h1>
      </div>

      <div className="filters-wrapper">
        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by ID or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td className="action-buttons">
                  <Link 
                    to={`/tptr/colors/detail/${item.id}`} 
                    className="view-link"
                  >
                    View TPTRs
                  </Link>
                  <Link 
                    to={`/tptr/add?colorId=${item.id}`} 
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

export default ColorwayList; 