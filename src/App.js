import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import ListView from './ListView';
import DetailView from './DetailView';
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
import Appendix1RequestDetail from './components/tptr/Appendix1RequestDetail';
import Appendix1RespondForm from './components/tptr/Appendix1RespondForm';
import Appendix2 from './components/tptr/Appendix2';
import AddAppendix2 from './components/tptr/AddAppendix2';
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
import CPSIAArticleList from './components/CPSIAArticleList';
import CPSIAPOList from './components/CPSIAPOList';
import CPSIAArticleDetail from './components/CPSIAArticleDetail';

// Example organizations for generating TPTR dummy data
const organizations = {
  Brand: ['Nike Sportswear','Adidas Athletics','Under Armour Sports'],
  T1: ['Elite Textile Industries','Global Apparel Solutions'],
  T2: ['Fabric Masters Intl','Textile World Trading'],
  T3: ['Raw Materials Direct','Fiber Source Global'],
  TestLab: ['SGS Testing','Intertek']
};

function App() {
  // Generate dummy TPTR data once
  const tptrData = useMemo(() => {
    return Array.from({ length: 97 }, (_, idx) => {
      const tptrGroup = tptrGroups[Math.floor(Math.random() * tptrGroups.length)];
      let attachedTo;
      if (tptrGroup === 'Article/Model') {
        attachedTo = { ...articles[Math.floor(Math.random() * articles.length)], type: 'Article' };
      } else if (tptrGroup === 'Material/Component') {
        attachedTo = { ...materials[Math.floor(Math.random() * materials.length)], type: 'Material' };
      } else {
        attachedTo = { ...colors[Math.floor(Math.random() * colors.length)], type: 'Color' };
      }

      const pool = tptrGroup === 'Article/Model'
        ? suppliers.filter(s => s.tier === 'T1')
        : suppliers.filter(s => s.tier === 'T2');
      const supplier = pool[Math.floor(Math.random() * pool.length)];

      const compliances = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
        complianceTypes[Math.floor(Math.random() * complianceTypes.length)]
      ).filter((v,i,a) => a.indexOf(v) === i);

      const uploadedDate = new Date(2024,0, Math.floor(Math.random()*28)+1);
      const submittedDate = new Date(uploadedDate.getTime() + Math.random()*7*24*60*60*1000);
      const uploadType = ['Brand','T1','T2','T3','TestLab'][Math.floor(Math.random()*5)];
      const submitType = ['Brand','T1','T2','T3','TestLab'][Math.floor(Math.random()*5)];

      return {
        id: `TPTR-2024-${String(idx+1).padStart(3,'0')}`,
        tptrGroup,
        attachedTo,
        supplier,
        compliances,
        createdDate: uploadedDate.toISOString(),
        lastUpdated: submittedDate.toISOString(),
        tptrIssueDate: uploadedDate.toISOString(),
        testParameters: [
          { parameter: 'pH Value', result: '7.2' },
          { parameter: 'Color Fastness', result: 'Grade 4' }
        ],
        uploadedBy: { type: uploadType, name: organizations[uploadType][0] },
        uploadedDate: uploadedDate.toISOString(),
        submittedBy: { type: submitType, name: organizations[submitType][0] },
        submittedDate: submittedDate.toISOString()
      };
    });
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div style={{ display:'flex', minHeight:'100vh', background:'#f9fafb' }}>
        <Sidebar />
        <div style={{ flex:1, marginLeft:240, padding:24 }}>
          <Routes>
            {/* CPSIA */}
            <Route path="/" element={
              <>
                <h1 style={{ fontSize:24, fontWeight:600, color:'#111827', marginBottom:24 }}>
                  CPSIA Compliance Certificate
                </h1>
                <ListView data={cpcData} />
              </>
            }/>
            <Route path="/add-certificate" element={<AddCertificate />} />
            <Route path="/details/:id" element={<DetailView data={cpcData} />} />

            {/* CPSIA Article-level and PO-level list pages */}
            <Route path="/articles" element={<CPSIAArticleList data={cpcData} />} />
            <Route path="/articles/:productId" element={<CPSIAArticleDetail data={cpcData} />} />
            <Route path="/pos" element={<CPSIAPOList data={cpcData} />} />

            {/* TPTR */}
            <Route path="/tptr" element={
              <>
                <h1 style={{ fontSize:24, fontWeight:600, color:'#111827', marginBottom:24 }}>
                  Third Party Test Reports
                </h1>
                <TPTRListView data={tptrData} />
              </>
            }/>
            <Route path="/tptr/add" element={<AddTPTR />} />
            <Route path="/tptr/:tptrId" element={<TPTRDetail />} />
            <Route path="/tptr/articles" element={<ArticleModelList />} />
            <Route path="/tptr/materials" element={<MaterialComponentList />} />
            <Route path="/tptr/colors" element={<ColorwayList />} />
            <Route path="/tptr/articles/detail/:id" element={<ArticleModelDetail />} />
            <Route path="/tptr/materials/detail/:id" element={<MaterialComponentDetail />} />
            <Route path="/tptr/colors/detail/:id" element={<ColorwayDetail />} />
            <Route path="/tptr/requests" element={<TPTRRequestList />} />

            {/* Appendix 1 */}
            <Route path="/a01/appendix1" element={<Appendix1 />} />
            <Route path="/a01/appendix1/view/:id" element={<Appendix1RequestDetail />} />
            <Route path="/a01/appendix1/respond/:id" element={<Appendix1RespondForm />} />

            {/* Appendix 2 */}
            <Route path="/a01/appendix2" element={<Appendix2 />} />
            <Route path="/a01/appendix2/add" element={<AddAppendix2 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;