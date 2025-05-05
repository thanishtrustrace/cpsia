import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Demo: Hardcoded supplier name (in real app, get from auth/user context)
const CURRENT_SUPPLIER = "Elite Sportswear Inc.";

// Mock data for Appendix 1 requests
const appendix1Requests = [
  {
    id: "A01-REQ-001",
    requestDate: "2024-04-01",
    supplier: "Elite Sportswear Inc.",
    dueDate: "2024-04-10",
    dateSubmitted: "2024-04-09",
    status: "Submitted on time"
  },
  {
    id: "A01-REQ-002",
    requestDate: "2024-04-05",
    supplier: "Elite Sportswear Inc.",
    dueDate: "2024-04-15",
    dateSubmitted: "2024-04-18",
    status: "Submitted after due date"
  },
  {
    id: "A01-REQ-003",
    requestDate: "2024-04-10",
    supplier: "Elite Sportswear Inc.",
    dueDate: "2024-04-20",
    dateSubmitted: "",
    status: "Pending"
  }
  // ...add more as needed
];

function Appendix1() {
  const navigate = useNavigate();

  // Filter requests for the current supplier
  const requests = useMemo(
    () => appendix1Requests.filter(r => r.supplier === CURRENT_SUPPLIER),
    []
  );

  const handleRespond = (id) => {
    navigate(`/a01/appendix1/respond/${id}`);
  };

  const handleView = (id) => {
    navigate(`/a01/appendix1/view/${id}`);
  };

  return (
    <div>
      <h1>Appendix 1 Requests</h1>
      <p>
        All incoming Appendix 1 requests from <b>Adidas</b> for <b>{CURRENT_SUPPLIER}</b>.
      </p>
      <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginTop: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ padding: 12, textAlign: 'left' }}>Request ID</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Date of Request</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Supplier</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Due Date</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Date Submitted</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: 12 }}>{req.id}</td>
                <td style={{ padding: 12 }}>{req.requestDate}</td>
                <td style={{ padding: 12 }}>{req.supplier}</td>
                <td style={{ padding: 12 }}>{req.dueDate}</td>
                <td style={{ padding: 12 }}>{req.dateSubmitted || '-'}</td>
                <td style={{ padding: 12 }}>
                  <span style={{
                    color: req.status === "Pending" ? "#b91c1c" :
                          req.status === "Submitted on time" ? "#15803d" : "#ca8a04",
                    fontWeight: 600
                  }}>
                    {req.status}
                  </span>
                </td>
                <td style={{ padding: 12 }}>
                  {req.status === "Pending" ? (
                    <button
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "6px 16px",
                        cursor: "pointer"
                      }}
                      onClick={() => handleRespond(req.id)}
                    >
                      Respond
                    </button>
                  ) : (
                    <button
                      style={{
                        background: "#f3f4f6",
                        color: "#2563eb",
                        border: "1px solid #2563eb",
                        borderRadius: 4,
                        padding: "6px 16px",
                        cursor: "pointer"
                      }}
                      onClick={() => handleView(req.id)}
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 24, color: '#6b7280' }}>
                  No requests found for this supplier.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appendix1; 