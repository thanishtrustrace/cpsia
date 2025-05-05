import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import '../../styles/ListView.css';

// Helper function to generate TPTR ID
const generateTPTRId = (index) => {
  const paddedIndex = String(index).padStart(3, '0');
  return `TPTR-2024-${paddedIndex}`;
};

// Arrays for generating random data
const tptrGroups = ['Article/Model', 'Material/Component', 'Color'];
const articles = [
  { id: 'ART-001', name: 'Men\'s Running Jacket' },
  { id: 'ART-002', name: 'Women\'s Training Shorts' },
  { id: 'ART-003', name: 'Performance T-Shirt' },
  { id: 'ART-004', name: 'Running Shoes Model X' },
  { id: 'ART-005', name: 'Training Pants Pro' },
  { id: 'ART-006', name: 'Sports Bra Elite' },
  { id: 'ART-007', name: 'Kids Soccer Cleats' }
];

const materials = [
  { id: 'MAT-101', name: 'Recycled Polyester Fabric' },
  { id: 'MAT-102', name: 'Performance Mesh' },
  { id: 'MAT-103', name: 'Elastic Band Type A' },
  { id: 'MAT-104', name: 'Moisture Wicking Material' },
  { id: 'MAT-105', name: 'Shoe Sole Component X' },
  { id: 'MAT-106', name: 'Breathable Cotton Blend' },
  { id: 'MAT-107', name: 'Reinforced Stitching Thread' }
];

const colors = [
  { id: 'COL-201', name: 'Victory Red' },
  { id: 'COL-202', name: 'Ocean Blue' },
  { id: 'COL-203', name: 'Forest Green' },
  { id: 'COL-204', name: 'Midnight Black' },
  { id: 'COL-205', name: 'Solar Yellow' },
  { id: 'COL-206', name: 'Arctic White' },
  { id: 'COL-207', name: 'Storm Grey' }
];

const suppliers = [
  { name: 'Adidas Manufacturing Ltd.', tier: 'T1' },
  { name: 'Premium Sports Production', tier: 'T1' },
  { name: 'Global Apparel Solutions', tier: 'T1' },
  { name: 'Elite Sportswear Inc.', tier: 'T1' },
  { name: 'TextileTech Materials', tier: 'T2' },
  { name: 'Advanced Fabric Solutions', tier: 'T2' },
  { name: 'Performance Materials Co.', tier: 'T2' },
  { name: 'Innovative Textiles Ltd.', tier: 'T2' }
];

const complianceTypes = [
  'A01', 'CPSIA', 'CPSIA_adult', 'Toy', 'Food_contact_material',
  'PPE', 'NOCSAE', 'KC_mark', 'Vegan', 'PFC_free'
];

function TPTRListView({ data }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Filter states with simpler structure
  const [filters, setFilters] = useState({
    tptrGroups: [],
    suppliers: [],
    compliances: []
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Generate TPTR ID
  const generateTPTRId = (index) => {
    const paddedIndex = String(index).padStart(3, '0');
    return `TPTR-2024-${paddedIndex}`;
  };

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
        (filters.tptrGroups.length === 0 || filters.tptrGroups.includes(item.tptrGroup)) &&
        (filters.suppliers.length === 0 || filters.suppliers.includes(item.supplier.name)) &&
        (filters.compliances.length === 0 || item.compliances.some(c => filters.compliances.includes(c)))
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

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({
      tptrGroups: [],
      suppliers: [],
      compliances: []
    });
    setSearchTerm('');
    setCurrentPage(1);
    setOpenDropdown(null);
  }, []);

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
            label="TPTR Group"
            options={tptrGroups}
            selected={filters.tptrGroups}
            onChange={(value) => handleFilterChange('tptrGroups', value)}
            isOpen={openDropdown === 'tptrGroups'}
            onToggle={() => setOpenDropdown(openDropdown === 'tptrGroups' ? null : 'tptrGroups')}
          />
          <FilterDropdown
            label="Supplier"
            options={suppliers.map(s => s.name)}
            selected={filters.suppliers}
            onChange={(value) => handleFilterChange('suppliers', value)}
            isOpen={openDropdown === 'suppliers'}
            onToggle={() => setOpenDropdown(openDropdown === 'suppliers' ? null : 'suppliers')}
          />
          <FilterDropdown
            label="Compliance"
            options={complianceTypes}
            selected={filters.compliances}
            onChange={(value) => handleFilterChange('compliances', value)}
            isOpen={openDropdown === 'compliances'}
            onToggle={() => setOpenDropdown(openDropdown === 'compliances' ? null : 'compliances')}
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
            onClick={() => navigate('/tptr/add')}
            className="add-button"
          >
            Add TPTR Certificate
          </button>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>TPTR ID</th>
            <th>TPTR Group</th>
            <th>Attached To</th>
            <th>Supplier</th>
            <th>Compliance</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr 
              key={item.id}
              onClick={() => navigate(`/tptr/${item.id}`)}
              className="table-row"
            >
              <td>{item.id}</td>
              <td>{item.tptrGroup}</td>
              <td>
                <div className="attached-to">
                  <span className="id">{item.attachedTo.id}</span>
                  <span className="name">{item.attachedTo.name}</span>
                  <span className="type-badge">{item.attachedTo.type}</span>
                </div>
              </td>
              <td>
                <div className="supplier-info">
                  <span>{item.supplier.name}</span>
                  <span className="tier-badge">{item.supplier.tier}</span>
                </div>
              </td>
              <td className="compliance-list">{item.compliances.join(', ')}</td>
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
            onPageChange(1);
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
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                >
                  {pageNumber}
                </button>
              );
            }
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

export default TPTRListView; 