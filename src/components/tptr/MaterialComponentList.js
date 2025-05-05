import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './TPTRListViews.css';

function MaterialComponentList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const itemsPerPage = 10;

  const materials = [
    { id: 'MAT-2024-001', name: 'Polyester Mesh Fabric', category: 'Material' },
    { id: 'COM-2024-001', name: 'YKK Zipper', category: 'Component' },
    { id: 'MAT-2024-002', name: 'Cotton Blend Jersey', category: 'Material' },
    { id: 'COM-2024-002', name: 'Elastic Waistband', category: 'Component' },
    { id: 'MAT-2024-003', name: 'Reflective Material', category: 'Material' },
    { id: 'COM-2024-003', name: 'Metal Buttons', category: 'Component' },
    { id: 'MAT-2024-004', name: 'Nylon Ripstop Fabric', category: 'Material' },
    { id: 'COM-2024-004', name: 'Drawstring Cord', category: 'Component' },
    { id: 'MAT-2024-005', name: 'Moisture Wicking Fabric', category: 'Material' },
    { id: 'COM-2024-005', name: 'Velcro Fastener', category: 'Component' },
    { id: 'MAT-2024-006', name: 'Denim Fabric', category: 'Material' },
    { id: 'COM-2024-006', name: 'Snap Buttons', category: 'Component' },
  ];

  const filteredItems = useMemo(() => {
    return materials.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [materials, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="list-view-container">
      <div className="list-view-header">
        <h1>Materials & Components</h1>
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

        <div className="filter-container">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="Material">Material</option>
            <option value="Component">Component</option>
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
                    to={`/tptr/materials/detail/${item.id}`} 
                    className="view-link"
                  >
                    View TPTRs
                  </Link>
                  <Link 
                    to={`/tptr/add?materialId=${item.id}`} 
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

export default MaterialComponentList; 