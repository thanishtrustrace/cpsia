import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy data for demonstration
const appendix2Data = [
  {
    month: '2024-01',
    pos: [
      {
        poNumber: 'PO-1001',
        articleNumber: 'ART-001',
        articleName: 'Running Shoes',
        submitted: true,
        items: [
          { itemNumber: 'ITEM-001', name: 'Sole', submitted: true },
          { itemNumber: 'ITEM-002', name: 'Upper', submitted: true }
        ]
      },
      {
        poNumber: 'PO-1002',
        articleNumber: 'ART-002',
        articleName: 'Training Shorts',
        submitted: false,
        items: [
          { itemNumber: 'ITEM-003', name: 'Fabric', submitted: false }
        ]
      }
    ]
  },
  {
    month: '2024-02',
    pos: [
      {
        poNumber: 'PO-1003',
        articleNumber: 'ART-003',
        articleName: 'Jacket',
        submitted: false,
        items: [
          { itemNumber: 'ITEM-004', name: 'Zipper', submitted: false }
        ]
      }
    ]
  }
];

function getMonthStats(monthData) {
  const totalPOs = monthData.pos.length;
  const totalItems = monthData.pos.reduce((sum, po) => sum + po.items.length, 0);
  const submittedItems = monthData.pos.reduce(
    (sum, po) => sum + po.items.filter(item => item.submitted).length, 0
  );
  const pendingItems = totalItems - submittedItems;
  const compliance = totalItems === 0 ? 0 : Math.round((submittedItems / totalItems) * 100);
  return { totalPOs, totalItems, submittedItems, pendingItems, compliance };
}

function Appendix2() {
  const [expandedMonth, setExpandedMonth] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1>Appendix 2 Compliance Overview</h1>
        <button
          style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 24px',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/a01/appendix2/add')}
        >
          Add Appendix 2
        </button>
      </div>
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ padding: 12, textAlign: 'left' }}>Month</th>
              <th style={{ padding: 12, textAlign: 'left' }}># POs</th>
              <th style={{ padding: 12, textAlign: 'left' }}># PO Items</th>
              <th style={{ padding: 12, textAlign: 'left' }}># Submitted</th>
              <th style={{ padding: 12, textAlign: 'left' }}># Pending</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Compliance %</th>
              <th style={{ padding: 12, textAlign: 'left' }}></th>
            </tr>
          </thead>
          <tbody>
            {appendix2Data.map(monthData => {
              const stats = getMonthStats(monthData);
              const isExpanded = expandedMonth === monthData.month;
              return (
                <React.Fragment key={monthData.month}>
                  <tr style={{ borderBottom: '1px solid #e5e7eb', background: isExpanded ? '#f9fafb' : undefined }}>
                    <td style={{ padding: 12 }}>{monthData.month}</td>
                    <td style={{ padding: 12 }}>{stats.totalPOs}</td>
                    <td style={{ padding: 12 }}>{stats.totalItems}</td>
                    <td style={{ padding: 12 }}>{stats.submittedItems}</td>
                    <td style={{ padding: 12 }}>{stats.pendingItems}</td>
                    <td style={{ padding: 12 }}>
                      <span style={{
                        color: stats.compliance === 100 ? '#16a34a' : stats.compliance === 0 ? '#b91c1c' : '#ca8a04',
                        fontWeight: 600
                      }}>
                        {stats.compliance}%
                      </span>
                    </td>
                    <td style={{ padding: 12 }}>
                      <button
                        style={{
                          background: '#f3f4f6',
                          color: '#2563eb',
                          border: '1px solid #2563eb',
                          borderRadius: 4,
                          padding: '4px 12px',
                          cursor: 'pointer'
                        }}
                        onClick={() => setExpandedMonth(isExpanded ? null : monthData.month)}
                      >
                        {isExpanded ? 'Hide' : 'Show'}
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan={7} style={{ background: '#f9fafb', padding: 0 }}>
                        <div style={{ padding: 16 }}>
                          <h4 style={{ margin: '8px 0' }}>PO Details for {monthData.month}</h4>
                          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                            <thead>
                              <tr>
                                <th style={{ padding: 8, textAlign: 'left' }}>PO Number</th>
                                <th style={{ padding: 8, textAlign: 'left' }}>Article Number</th>
                                <th style={{ padding: 8, textAlign: 'left' }}>Article Name</th>
                                <th style={{ padding: 8, textAlign: 'left' }}>Submitted</th>
                                <th style={{ padding: 8, textAlign: 'left' }}>Items</th>
                              </tr>
                            </thead>
                            <tbody>
                              {monthData.pos.map(po => (
                                <tr key={po.poNumber}>
                                  <td style={{ padding: 8 }}>{po.poNumber}</td>
                                  <td style={{ padding: 8 }}>{po.articleNumber}</td>
                                  <td style={{ padding: 8 }}>{po.articleName}</td>
                                  <td style={{ padding: 8 }}>
                                    <span style={{
                                      color: po.submitted ? '#16a34a' : '#b91c1c',
                                      fontWeight: 600
                                    }}>
                                      {po.submitted ? 'Yes' : 'No'}
                                    </span>
                                  </td>
                                  <td style={{ padding: 8 }}>
                                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                                      {po.items.map(item => (
                                        <li key={item.itemNumber}>
                                          {item.itemNumber} - {item.name} {' '}
                                          <span style={{
                                            color: item.submitted ? '#16a34a' : '#b91c1c',
                                            fontWeight: 600
                                          }}>
                                            [{item.submitted ? 'Submitted' : 'Pending'}]
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appendix2; 