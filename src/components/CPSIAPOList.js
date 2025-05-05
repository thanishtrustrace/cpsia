import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

function CPSIAPOList({ data }) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // Flatten all POs from all certificates
  const poRows = useMemo(() => {
    const rows = [];
    data.forEach(cert => {
      const productId = cert.productId?.value || cert.productId || 'Unknown';
      const brand = cert.brand;
      const productType = cert.productType;
      (cert.poNo || []).forEach(po => {
        rows.push({
          productId,
          brand,
          productType,
          po,
          certId: cert.id || productId + '-' + po,
        });
      });
    });
    return rows;
  }, [data]);

  const filtered = poRows.filter(row =>
    row.po.toLowerCase().includes(search.toLowerCase()) ||
    row.productId.toLowerCase().includes(search.toLowerCase()) ||
    (row.brand && row.brand.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Pagination bar logic (show ellipsis, First/Last, etc.)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1,2,3,4,5,'...',totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1,'...',totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages);
      } else {
        pages.push(1,'...',currentPage-1,currentPage,currentPage+1,'...',totalPages);
      }
    }
    return pages;
  };

  const startEntry = filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, filtered.length);

  return (
    <div className="list-view-container">
      <div className="list-view-header">
        <h1>CPSIA Certificates by PO</h1>
      </div>
      <div className="filters-section">
        <input
          type="text"
          placeholder="Search by PO, Product ID, or Brand..."
          value={search}
          onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          style={{ width: 320, marginBottom: 16 }}
        />
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Product ID</th>
              <th>Brand</th>
              <th>Product Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(row => (
              <tr key={row.certId + '-' + row.po}>
                <td>{row.po}</td>
                <td>{row.productId}</td>
                <td>{row.brand}</td>
                <td>{row.productType}</td>
                <td>
                  <Link to={`/details/${row.certId}`}>View Certificate</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <div className="pagination-info">
          Showing {startEntry} to {endEntry} of {filtered.length} entries
        </div>
        <div className="pagination-controls">
          <select 
            value={itemsPerPage}
            onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="items-per-page"
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
          <div className="pagination-buttons">
            <button 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
              className="pagination-button"
            >First</button>
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
              disabled={currentPage === 1}
              className="pagination-button"
            >Previous</button>
            {getPageNumbers().map((page, idx) =>
              page === '...'
                ? <span key={page + idx} className="pagination-ellipsis">...</span>
                : <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`pagination-button${page === currentPage ? ' active' : ''}`}
                    disabled={page === currentPage}
                  >{page}</button>
            )}
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
              disabled={currentPage === totalPages}
              className="pagination-button"
            >Next</button>
            <button 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages}
              className="pagination-button"
            >Last</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CPSIAPOList; 