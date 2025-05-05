// src/App.js
import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListView from './ListView';
import DetailView from './DetailView';
import Sidebar from './Sidebar';
import cpcData, { 
  brandOptions, 
  t1FactoryOptions, 
  productTypeOptions,
  productMasterData,
  importerData,
  testRecordsContacts,
  cpscRegulations,
  tptrGroups,
  articles,
  materials,
  colors,
  suppliers,
  complianceTypes
} from './data';
import AddCertificate from './components/AddCertificate';
import TPTRListView from './components/tptr/TPTRListView';
import TPTRDetail from './components/tptr/TPTRDetail';
import AddTPTR from './components/tptr/AddTPTR';
import ArticleModelList from './components/tptr/ArticleModelList';
import MaterialComponentList from './components/tptr/MaterialComponentList';
import ColorwayList from './components/tptr/ColorwayList';
import ArticleModelDetail from './components/tptr/ArticleModelDetail';
import MaterialComponentDetail from './components/tptr/MaterialComponentDetail';
import ColorwayDetail from './components/tptr/ColorwayDetail';
import TPTRRequestList from './components/tptr/TPTRRequestList';
import Appendix1 from './components/tptr/Appendix1';
import Appendix2 from './components/tptr/Appendix2';
import Appendix1RequestDetail from './components/tptr/Appendix1RequestDetail';
import Appendix1RespondForm from './components/tptr/Appendix1RespondForm';
import AddAppendix2 from './components/tptr/AddAppendix2';

// Add these arrays for organization names
const organizations = {
  Brand: [
    'Nike Sportswear',
    'Adidas Athletics',
    'Under Armour Sports',
    'Puma Active',
    'New Balance Athletics'
  ],
  T1: [
    'Evergreen Manufacturing Ltd.',
    'Global Apparel Solutions',
    'Premier Garments Co.',
    'Elite Textile Industries',
    'Unified Clothing Corp.'
  ],
  T2: [
    'Fabric Masters International',
    'Textile World Trading',
    'Supreme Materials Co.',
    'Quality Fabric Suppliers',
    'Advanced Textile Solutions'
  ],
  T3: [
    'Raw Materials Direct',
    'Fiber Source Global',
    'Base Components Ltd.',
    'Material Hub Trading',
    'Resource Solutions Inc.'
  ],
  TestLab: [
    'SGS Testing Services',
    'Bureau Veritas Labs',
    'Intertek Quality Control',
    'TÜV SÜD Testing',
    'UL Testing Laboratory'
  ]
};

function App() {
  // Generate TPTR data at the App level
  const tptrData = useMemo(() => {
    return Array.from({ length: 97 }, (_, index) => {
      const tptrGroup = tptrGroups[Math.floor(Math.random() * tptrGroups.length)];
      let attachedTo;

      switch (tptrGroup) {
        case 'Article/Model':
          const article = articles[Math.floor(Math.random() * articles.length)];
          attachedTo = { ...article, type: 'Article' };
          break;
        case 'Material/Component':
          const material = materials[Math.floor(Math.random() * materials.length)];
          attachedTo = { ...material, type: 'Material' };
          break;
        default:
          const color = colors[Math.floor(Math.random() * colors.length)];
          attachedTo = { ...color, type: 'Color' };
      }

      const supplierPool = tptrGroup === 'Article/Model' 
        ? suppliers.filter(s => s.tier === 'T1')
        : suppliers.filter(s => s.tier === 'T2');
      const supplier = supplierPool[Math.floor(Math.random() * supplierPool.length)];

      const numCompliances = Math.floor(Math.random() * 3) + 1;
      const compliances = Array.from({ length: numCompliances }, () => {
        return complianceTypes[Math.floor(Math.random() * complianceTypes.length)];
      }).filter((v, i, a) => a.indexOf(v) === i);

      // Generate random dates within the last month
      const uploadedDate = new Date(2024, 0, Math.floor(Math.random() * 28) + 1);
      const submittedDate = new Date(uploadedDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000); // 0-7 days after upload

      // Randomly select organization types and names
      const orgTypes = ['Brand', 'T1', 'T2', 'T3', 'TestLab'];
      const uploadOrgType = orgTypes[Math.floor(Math.random() * orgTypes.length)];
      const submitOrgType = orgTypes[Math.floor(Math.random() * orgTypes.length)];

      const uploadedByOrg = organizations[uploadOrgType][Math.floor(Math.random() * organizations[uploadOrgType].length)];
      const submittedByOrg = organizations[submitOrgType][Math.floor(Math.random() * organizations[submitOrgType].length)];

      return {
        id: `TPTR-2024-${String(index + 1).padStart(3, '0')}`,
        tptrGroup,
        attachedTo,
        supplier,
        compliances,
        createdDate: new Date(2024, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toISOString(),
        lastUpdated: new Date(2024, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toISOString(),
        tptrIssueDate: new Date(2024, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toISOString(),
        testParameters: [
          { parameter: 'pH Value', result: '7.2' },
          { parameter: 'Color Fastness', result: 'Grade 4' },
          { parameter: 'Dimensional Stability', result: '±2%' }
        ],
        uploadedBy: {
          type: uploadOrgType,
          name: uploadedByOrg
        },
        uploadedDate: uploadedDate.toISOString(),
        submittedBy: {
          type: submitOrgType,
          name: submittedByOrg
        },
        submittedDate: submittedDate.toISOString()
      };
    });
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: '240px', padding: '24px' }}>
          <Routes>
            {/* CPSIA Routes */}
            <Route path="/" element={
              <>
                <h1 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#111827', 
                  marginBottom: '24px' 
                }}>
                  CPSIA Compliance Certificate
                </h1>
                <ListView data={cpcData} />
              </>
            } />
            <Route path="/add-certificate" element={<AddCertificate />} />
            <Route path="/details/:id" element={<DetailView data={cpcData} />} />
            
            {/* TPTR Routes */}
            <Route path="/tptr" element={
              <>
                <h1 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#111827', 
                  marginBottom: '24px' 
                }}>
                  Third Party Test Reports
                </h1>
                <TPTRListView data={tptrData} />
              </>
            } />
            <Route path="/tptr/add" element={<AddTPTR />} />
            <Route path="/tptr/:tptrId" element={<TPTRDetail />} />
            <Route path="/tptr/articles" element={<ArticleModelList />} />
            <Route path="/tptr/materials" element={<MaterialComponentList />} />
            <Route path="/tptr/colors" element={<ColorwayList />} />
            <Route path="/tptr/articles/detail/:id" element={<ArticleModelDetail />} />
            <Route 
              path="/tptr/materials/detail/:id" 
              element={<MaterialComponentDetail />} 
            />
            <Route 
              path="/tptr/colors/detail/:id" 
              element={<ColorwayDetail />} 
            />
            <Route 
              path="/tptr/requests" 
              element={<TPTRRequestList />} 
            />
            <Route path="/a01/appendix1" element={<Appendix1 />} />
            <Route path="/a01/appendix1/view/:id" element={<Appendix1RequestDetail />} />
            <Route path="/a01/appendix1/respond/:id" element={<Appendix1RespondForm />} />
            <Route path="/a01/appendix2" element={<Appendix2 />} />
            <Route path="/a01/appendix2/add" element={<AddAppendix2 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;