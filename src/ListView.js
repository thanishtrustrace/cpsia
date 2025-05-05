// src/ListView.js
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ListView.css';
import { brandOptions, t1FactoryOptions, productTypeOptions } from './data';
import debounce from 'lodash/debounce';

function ListView({ data }) {
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter states with simpler structure
  const [filters, setFilters] = useState({
    brands: [],
    productTypes: [],
    factories: [],
    prodMonths: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Memoize the filtered data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = Object.values(item)
          .some(value => 
            String(value).toLowerCase().includes(searchLower)
          );
        if (!matchesSearch) return false;
      }

      return (
        (filters.brands.length === 0 || filters.brands.includes(item.brand)) &&
        (filters.productTypes.length === 0 || filters.productTypes.includes(item.productType)) &&
        (filters.factories.length === 0 || filters.factories.includes(item.t1Factory)) &&
        (filters.prodMonths.length === 0 || filters.prodMonths.includes(item.prodMonth))
      );
    });
  }, [data, searchTerm, filters]);

  // Calculate current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  // Optimized filter handlers
  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterType]: newValues
      };
    });
    setCurrentPage(1);
  }, []);

  // Clear filters with optimized reset
  const clearFilters = useCallback(() => {
    setFilters({
      brands: [],
      productTypes: [],
      factories: [],
      prodMonths: []
    });
    setSearchTerm('');
    setCurrentPage(1);
    setOpenDropdown(null);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="list-view-container">
      <div className="actions">
        <div className="filters" ref={dropdownRef}>
          <FilterDropdown
            label="Brand"
            options={brandOptions}
            selected={filters.brands}
            onChange={(value) => handleFilterChange('brands', value)}
            isOpen={openDropdown === 'brands'}
            onToggle={() => setOpenDropdown(openDropdown === 'brands' ? null : 'brands')}
          />
          <FilterDropdown
            label="Product Type"
            options={productTypeOptions}
            selected={filters.productTypes}
            onChange={(value) => handleFilterChange('productTypes', value)}
            isOpen={openDropdown === 'productTypes'}
            onToggle={() => setOpenDropdown(openDropdown === 'productTypes' ? null : 'productTypes')}
          />
          <FilterDropdown
            label="T1 Factory"
            options={t1FactoryOptions}
            selected={filters.factories}
            onChange={(value) => handleFilterChange('factories', value)}
            isOpen={openDropdown === 'factories'}
            onToggle={() => setOpenDropdown(openDropdown === 'factories' ? null : 'factories')}
          />
          <button 
            className="clear-filters"
            onClick={clearFilters}
            disabled={!Object.values(filters).some(arr => arr.length > 0)}
          >
            Clear filters
          </button>
        </div>
        <div className="search-container">
          <input 
            type="search" 
            placeholder="Search" 
            onChange={(e) => debouncedSearch(e.target.value)}
            className="search-input"
          />
          <button 
            onClick={() => navigate('/add-certificate')}
            className="add-button"
          >
            Add CPSIA Certificate
          </button>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Certificate ID</th>
            <th>Brand</th>
            <th>Article ID</th>
            <th>Product Type</th>
            <th>T1 Factory</th>
            <th>Production Month</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr 
              key={item.id}
              onClick={() => navigate(`/details/${item.id}`)}
              className="table-row"
            >
              <td>{item.certificateId}</td>
              <td>{item.brand}</td>
              <td>{item.articleId}</td>
              <td>{item.productType}</td>
              <td>{item.t1Factory}</td>
              <td>{item.prodMonth}</td>
              <td>{item.lastUpdatedOn}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
}

const tableHeaderStyle = {
  textAlign: 'left',
  padding: '12px',
  backgroundColor: '#f9fafb',
  borderBottom: '1px solid #e5e7eb',
};

const tableCellStyle = {
  padding: '12px',
  borderBottom: '1px solid #e5e7eb',
};

// Separate FilterDropdown component for better performance
const FilterDropdown = React.memo(({ 
  label, 
  options, 
  selected, 
  onChange, 
  isOpen, 
  onToggle 
}) => {
  const handleClick = (e, option) => {
    e.stopPropagation();
    onChange(option);
  };

  return (
    <div className="filter-dropdown">
      <button 
        className={`filter-button ${selected.length > 0 ? 'has-selected' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {label} ({selected.length}) ▼
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {options.map(option => (
            <div 
              key={option}
              className={`dropdown-item ${selected.includes(option) ? 'selected' : ''}`}
              onClick={(e) => handleClick(e, option)}
            >
              <input 
                type="checkbox"
                checked={selected.includes(option)}
                readOnly
                onClick={(e) => e.stopPropagation()}
              />
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

// Add Pagination component
const Pagination = React.memo(({ 
  currentPage, 
  itemsPerPage, 
  totalItems, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
      </div>
      <div className="pagination-controls">
        <select 
          value={itemsPerPage}
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
            onPageChange(1); // Reset to first page when changing items per page
          }}
          className="items-per-page"
        >
          <option value={10}>10 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option>
          <option value={100}>100 / page</option>
        </select>
        
        <div className="pagination-buttons">
          <button 
            onClick={() => onPageChange(1)} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            First
          </button>
          <button 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            // Show current page, first/last pages, and one page before/after current
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}p
                >
                  {pageNumber}
                </button>
              );
            }
            // Show ellipsis for skipped pages
            if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
              return <span key={pageNumber} className="pagination-ellipsis">...</span>;
            }
            return null;
          })}
          
          <button 
            onClick={() => onPageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
          <button 
            onClick={() => onPageChange(totalPages)} 
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
});

export default ListView;