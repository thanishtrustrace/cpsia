import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaInbox, FaPaperPlane } from 'react-icons/fa';
import './TPTRListViews.css';

function TPTRRequestList() {
  const [activeTab, setActiveTab] = useState('received');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const itemsPerPage = 10;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchQuery('');
    setSelectedStatus('');
  };

  // Updated dummy data for received requests with only Pending and Completed statuses
  const receivedRequests = [
    {
      id: 'REQ-2024-001',
      attachedTo: 'ART-2024-001 (Men\'s Running Jacket)',
      requestedBy: 'Brand Quality Team',
      supplier: 'Elite Textile Industries',
      requestDate: '2024-03-01',
      status: 'Pending',
      tptrId: 'TPTR-2024-001'
    },
    {
      id: 'REQ-2024-002',
      attachedTo: 'MAT-2024-002 (Cotton Blend Jersey)',
      requestedBy: 'Product Development',
      supplier: 'Global Fabrics Co.',
      requestDate: '2024-03-02',
      status: 'Completed',
      tptrId: 'TPTR-2024-002'
    }
  ];

  // Updated dummy data with TPTR IDs
  const sentRequests = [
    {
      id: 'REQ-2024-003',
      attachedTo: 'COL-2024-001 (Black/White Combo)',
      requestedTo: 'Color Solutions Ltd.',
      supplier: 'Your Company',
      requestDate: '2024-03-03',
      status: 'Completed',
      tptrId: 'TPTR-2024-003' // Added TPTR ID
    },
    {
      id: 'REQ-2024-004',
      attachedTo: 'ART-2024-005 (Women\'s Yoga Pants)',
      requestedTo: 'Quality Control Lab',
      supplier: 'Your Company',
      requestDate: '2024-03-04',
      status: 'Pending',
      tptrId: 'TPTR-2024-004' // Added TPTR ID
    }
    // Add more sent requests...
  ];

  const currentData = activeTab === 'received' ? receivedRequests : sentRequests;

  const filteredItems = useMemo(() => {
    return currentData.filter(item => {
      const matchesSearch = 
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.attachedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !selectedStatus || item.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [currentData, searchQuery, selectedStatus]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Status options based on active tab
  const getStatusOptions = () => {
    if (activeTab === 'received') {
      return [
        { value: '', label: 'All Statuses' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Completed', label: 'Completed' }
      ];
    }
    return [
      { value: '', label: 'All Statuses' },
      { value: 'Pending', label: 'Pending' },
      { value: 'In Progress', label: 'In Progress' },
      { value: 'Completed', label: 'Completed' }
    ];
  };

  return (
    <div className="list-view-container">
      <div className="list-view-header">
        <h1>TPTR Requests</h1>
      </div>

      <div className="list-view-subheader">
        <div className="tab-buttons">
          <button 
            className={`list-tab-button ${activeTab === 'received' ? 'active' : ''}`}
            onClick={() => handleTabChange('received')}
          >
            <FaInbox className="tab-icon" />
            Received Requests
          </button>
          <button 
            className={`list-tab-button ${activeTab === 'sent' ? 'active' : ''}`}
            onClick={() => handleTabChange('sent')}
          >
            <FaPaperPlane className="tab-icon" />
            Sent Requests
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by ID, Item, or Supplier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            {getStatusOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Attached To</th>
              <th>{activeTab === 'received' ? 'Requested By' : 'Requested To'}</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.attachedTo}</td>
                <td>{activeTab === 'received' ? item.requestedBy : item.requestedTo}</td>
                <td>{item.requestDate}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td className="action-buttons">
                  {activeTab === 'received' ? (
                    // Received tab: Respond for Pending, View for Completed
                    item.status === 'Pending' ? (
                      <Link 
                        to={`/tptr/requests/${item.id}/edit`} 
                        className="add-link"
                      >
                        Respond
                      </Link>
                    ) : item.status === 'Completed' ? (
                      <Link 
                        to={`/tptr/${item.tptrId}`} 
                        className="view-link"
                      >
                        View
                      </Link>
                    ) : null
                  ) : (
                    // Sent tab: Only View Details action
                    <Link 
                      to={`/tptr/${item.tptrId}`} 
                      className="view-link"
                    >
                      View Details
                    </Link>
                  )}
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

export default TPTRRequestList; 