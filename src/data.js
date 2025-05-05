// src/data.js
// Define the options for filters and data validation
const brandOptions = [
  'ADIDAS', 'ADIDAS CYCLING', 'adidas SLD', 'adidas Y-3', 'ARENA', 'ASHWORTH',
  'CALLAWAY', 'CCM APPAREL', 'CCM HOCKEY', 'ERIMA', 'Five Ten', 'LE COQ SPORTIF',
  'MAXFLI', 'NON ALLOCABLE', 'OFF PITCH', 'PONY', 'REEBOK', 'REEBOK EQUIPMENT',
  'REEBOK SLD', 'REEBOK South Europe', 'ROCKPORT', 'SLAZENGER', 'SLD', 'SUNICE',
  'TAYLOR MADE', 'UNBRANDED'
];

const t1FactoryOptions = [
  '(ADIDAS GROUP) GROUP ATHLETICA LLC (0X0001)',
  '(ADIDAS GROUP) GROUP ATHLETICA LLC (0X0501)',
  '(ADIDAS GROUP) SPORT MASKA ST-HYACINTHE (0XQ501)',
  '(ITW) PACIFIC CONCEPT I ((ITW) PACIFIC CONCEPT I)',
  '(YSB) AT NO.1 BRANCH FACTORY OF DONGGUAN GAO BU YUE YUEN MFR CO (606002)',
  '0Y3001 (WILL DER S.A)',
  '3B Hockey (CAN) (0PU001)',
  '3B Investors Inc (03L001)',
  '4teams - Advertising & Merchan (GRB005)',
  'A.K.H. S. de R.L. (22Z002)',
  'A.K.H. S. de R.L. (22Z502)',
  'A.K.H. S. de R.L. (0XA503)',
  'A.K.H.S. DE R.L. (0XA002)',
  'AAWORLD (AAWORLD)',
  'ACE CO. LTD. (0XB501)',
  'ACE CO. LTD. (0ZG501)',
  'ACE Trading Co. Ltd (JDE001)',
  'ACM (RCH021)',
  'ACTOR SPORTING LTD (RCA037)',
  'ACTOR SPORTING LTD (0DF501)'
  // ... add more as needed
];

const productTypeOptions = [
  'Adult Apparel',
  'Children accessories (bags, hats, gloves & socks)',
  'Children apparel',
  'Children footwear',
  'Children sleepwear',
  'Children sport equipment',
  'Gift with Purchase (non-toy)',
  'Gift with Purchase (Toy)',
  'test for Pat'
];

function generateRandomCertificateId() {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
}

function generateRandomArticleId() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array(5).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// Generate 78 entries
const brands = ['adidas', 'Reebok', 'Puma', 'Nike', 'Under Armour'];
const productTypes = [
  'Children Apparel', 'Adult Apparel', 'Children Footwear', 'Children Accessories',
  'Children Sleepwear', 'Children Sport Equipment', 'Gift with Purchase (Toy)', 'Gift with Purchase (non-toy)'
];
const descriptions = [
  'Kids Performance T-Shirt', 'Men\'s Running Jacket', 'Kids Soccer Cleats', 'Girls Sun Hat',
  'Boys Pajama Set', 'Kids Cap', 'Girls Training Shorts', 'Boys Training Shorts',
  'Kids Running Shoes', 'Kids Soccer Ball', 'Youth Sports Jersey', 'Junior Golf Gloves',
  'Kids Raincoat', 'Kids Backpack', 'Kids Socks', 'Kids Gloves', 'Kids Pajama Set', 'Kids Hoodie'
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const cpcData = Array.from({ length: 68 }, (_, i) => {
  const idx = i + 1;
  const brand = brands[i % brands.length];
  const productType = productTypes[i % productTypes.length];
  const productDescription = descriptions[i % descriptions.length];
  const productId = `ART-${1000 + idx}`;
  const poCount = 2 + (i % 3); // 2-4 POs
  const poNo = Array.from({ length: poCount }, (_, j) => `PO-${10000 + idx * 10 + j}`);
  const t1Factory = t1FactoryOptions[i % t1FactoryOptions.length];
  const prodMonth = `${months[i % 12]} 2024`;
  const lastUpdatedOn = `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`;
  return {
    id: `CPC-${String(idx).padStart(3, '0')}`,
    certificateId: `CERT-${100000 + idx}`,
    articleId: productId,
    productId: { value: productId, label: productId },
    brand,
    productType,
    productDescription,
    poNo,
    t1Factory,
    prodMonth,
    lastUpdatedOn
  };
});

// Product master data
const productMasterData = [
  {
    productId: "P1001",
    brand: "ADIDAS",
    productType: "Children footwear",
    productDescription: "Kids Running Shoes - Lightweight Series",
    allowedT1Factories: [
      { id: "F1", name: t1FactoryOptions[0] },
      { id: "F2", name: t1FactoryOptions[1] },
      { id: "F3", name: t1FactoryOptions[2] }
    ],
    allowedPONumbers: ["PO2024-001", "PO2024-002", "PO2024-003"]
  },
  {
    productId: "P1002",
    brand: "REEBOK",
    productType: "Children apparel",
    productDescription: "Youth Sports Jersey - Premium Collection",
    allowedT1Factories: [
      { id: "F4", name: t1FactoryOptions[3] },
      { id: "F5", name: t1FactoryOptions[4] }
    ],
    allowedPONumbers: ["PO2024-004", "PO2024-005"]
  },
  {
    productId: "P1003",
    brand: "TAYLOR MADE",
    productType: "Children accessories",
    productDescription: "Junior Golf Gloves - Pro Series",
    allowedT1Factories: [
      { id: "F6", name: t1FactoryOptions[5] },
      { id: "F7", name: t1FactoryOptions[6] },
      { id: "F8", name: t1FactoryOptions[7] }
    ],
    allowedPONumbers: ["PO2024-006", "PO2024-007"]
  },
  {
    productId: "P1004",
    brand: "ADIDAS",
    productType: "Children sport equipment",
    productDescription: "Kids Soccer Ball - Training Edition",
    allowedT1Factories: [
      { id: "F9", name: t1FactoryOptions[8] },
      { id: "F10", name: t1FactoryOptions[9] }
    ],
    allowedPONumbers: ["PO2024-008", "PO2024-009"]
  },
  {
    productId: "P1005",
    brand: "REEBOK",
    productType: "Children sleepwear",
    productDescription: "Youth Performance Sleepwear Set",
    allowedT1Factories: [
      { id: "F11", name: t1FactoryOptions[10] },
      { id: "F12", name: t1FactoryOptions[11] }
    ],
    allowedPONumbers: ["PO2024-010", "PO2024-011"]
  }
];

// World Cities and Countries (abbreviated list for demo)
const locationOptions = [
  { value: 'NYC-USA', label: 'New York City, United States' },
  { value: 'LON-UK', label: 'London, United Kingdom' },
  { value: 'PAR-FR', label: 'Paris, France' },
  { value: 'TOK-JP', label: 'Tokyo, Japan' },
  { value: 'SHG-CN', label: 'Shanghai, China' },
  { value: 'SYD-AU', label: 'Sydney, Australia' },
  { value: 'DXB-UAE', label: 'Dubai, United Arab Emirates' },
  { value: 'MUM-IN', label: 'Mumbai, India' },
  { value: 'SAO-BR', label: 'São Paulo, Brazil' },
  { value: 'TRT-CA', label: 'Toronto, Canada' }
  // Add more as needed
];

// Update importerData
const importerData = [
  {
    id: 'IMP001',
    name: 'Global Sports Manufacturing Inc.',
    address: '123 Industry Ave, Portland, OR 97201, USA',
    phone: '+1 (503) 555-0123'
  },
  {
    id: 'IMP002',
    name: 'Elite Athletic Imports LLC',
    address: '456 Commerce Blvd, Boston, MA 02108, USA',
    phone: '+1 (617) 555-0456'
  },
  {
    id: 'IMP003',
    name: 'SportsTech International',
    address: '789 Innovation Drive, Austin, TX 78701, USA',
    phone: '+1 (512) 555-0789'
  },
  {
    id: 'IMP004',
    name: 'Premier Athletic Goods Co.',
    address: '321 Enterprise Way, Seattle, WA 98101, USA',
    phone: '+1 (206) 555-0321'
  },
  {
    id: 'IMP005',
    name: 'Athletic Excellence Ltd.',
    address: '654 Quality Road, Denver, CO 80201, USA',
    phone: '+1 (303) 555-0654'
  }
];

// Update testRecordsContacts
const testRecordsContacts = [
  {
    id: 'TRC001',
    name: 'Quality Control Lab A',
    address: '100 Testing Plaza, San Jose, CA 95110, USA',
    email: 'qc@laba.com',
    phone: '+1 (408) 555-1111'
  },
  {
    id: 'TRC002',
    name: 'Certification Center B',
    address: '200 Standards Ave, Phoenix, AZ 85001, USA',
    email: 'testing@centerb.com',
    phone: '+1 (602) 555-2222'
  },
  {
    id: 'TRC003',
    name: 'Product Testing Institute',
    address: '300 Research Park, Chicago, IL 60601, USA',
    email: 'lab@pti.com',
    phone: '+1 (312) 555-3333'
  },
  {
    id: 'TRC004',
    name: 'Safety Verification Labs',
    address: '400 Compliance Road, Miami, FL 33101, USA',
    email: 'verify@svlabs.com',
    phone: '+1 (305) 555-4444'
  },
  {
    id: 'TRC005',
    name: 'Global Testing Services',
    address: '500 Quality Drive, Houston, TX 77001, USA',
    email: 'test@gts.com',
    phone: '+1 (713) 555-5555'
  }
];

// CPSC Regulations checklist
const cpscRegulations = [
  {
    id: "1303",
    title: "16 CFR 1303 - Ban of Lead-Containing Paint and Certain Consumer Products Bearing Lead-Containing Paint",
    description: "* If the textile ink can be scraped off (e.g., it did not cure properly or it has a purposefully raised texture) or if the ink is tested by a CPSC- accepted lab in its dried state, you may certify the component to this children's product safety rule instead of Sec. 101 of the CPSIA."
  },
  {
    id: "substrate",
    title: "CPSIA-Lead Restrictions for Substrates"
  },
  {
    id: "1501",
    title: "16 CFR 1501 - Method for Identifying Toys and Other Articles Intended for Use by Children Under 3 Years of Age Which Present Choking, Aspiration, or Ingestion Hazards Because of Small Parts"
  },
  {
    id: "1500.48",
    title: "16 CFR 1500.48 - Technical Requirements for Determining a Sharp Point in Toys and Other Articles Intended for Use by Children Under 8 Years of Age"
  },
  {
    id: "1500.49",
    title: "16 CFR 1500.49 - Technical Requirements for Determining a Sharp Edge in Toys and Other Articles Intended for Use by Children Under 8 Years of Age"
  },
  {
    id: "1500.50",
    title: "16 CFR 1500.50 - Test Methods for Simulating Use and Abuse in Toys and Other Articles Intended for Use by Children"
  },
  {
    id: "1610",
    title: "16 CFR 1610 - Standard for the Flammability of Clothing Textiles",
    hasExemption: true
  },
  {
    id: "1611",
    title: "16 CFR 1611 - Standard for the Flammability of Vinyl Plastic Film",
    hasExemption: true
  },
  {
    id: "1615",
    title: "16 CFR 1615 - Standard for the Flammability of Children's Sleepwear; Sizes 0 through 6X"
  },
  {
    id: "1616",
    title: "16 CFR 1616 - Standard for the Flammability of Children's Sleepwear; Sizes 7 through 14"
  },
  {
    id: "1500.44",
    title: "16 CFR 1500.44 - Method for Determining Flammable Solids"
  },
  {
    id: "1500.19",
    title: "16 CFR 1500.19 - Labeling Requirements for Certain Toys and Games"
  },
  {
    id: "F963",
    title: "ASTM F-963-Standard for Consumer Safety Specifications for Toy Safety"
  },
  {
    id: "phthalates",
    title: "Phthalates for Children's Toys and Child Care Articles"
  }
];

// Add this mapping with exact product type strings that match your data
const productTypeRegulationsMap = {
  'Adult Apparel': ['1610', '1611'],
  'Children accessories (bags, hats, gloves & socks)': ['1303', '1501', '1500.48', '1500.49', '1610', '1611'],
  'Children apparel': ['1303', '1501', '1500.48', '1500.49'],
  'Children footwear': ['1303', '1501', '1500.48', '1500.49'],
  'Children sleepwear': ['1303', '1501', '1500.48', '1500.49', '1615', '1616'],
  'Children sport equipment': ['1303', '1501', '1500.48', '1500.49'],
  'Gift with Purchase (non-toy)': ['1303', '1501', '1500.48', '1500.49', '1610', '1611', '1615', '1616', '1500.44'],
  'Gift with Purchase (Toy)': ['1303', '1501', '1500.48', '1500.49']
};

// TPTR Group options
export const tptrGroups = ['Article/Model', 'Material/Component', 'Color'];

// Articles data
export const articles = [
  { id: 'ART-001', name: 'Men\'s Running Jacket' },
  { id: 'ART-002', name: 'Women\'s Training Shorts' },
  { id: 'ART-003', name: 'Performance T-Shirt' },
  { id: 'ART-004', name: 'Running Shoes Model X' },
  { id: 'ART-005', name: 'Training Pants Pro' },
  { id: 'ART-006', name: 'Sports Bra Elite' },
  { id: 'ART-007', name: 'Kids Soccer Cleats' }
];

// Materials data
export const materials = [
  { id: 'MAT-101', name: 'Recycled Polyester Fabric' },
  { id: 'MAT-102', name: 'Performance Mesh' },
  { id: 'MAT-103', name: 'Elastic Band Type A' },
  { id: 'MAT-104', name: 'Moisture Wicking Material' },
  { id: 'MAT-105', name: 'Shoe Sole Component X' },
  { id: 'MAT-106', name: 'Breathable Cotton Blend' },
  { id: 'MAT-107', name: 'Reinforced Stitching Thread' }
];

// Colors data
export const colors = [
  { id: 'COL-201', name: 'Victory Red' },
  { id: 'COL-202', name: 'Ocean Blue' },
  { id: 'COL-203', name: 'Forest Green' },
  { id: 'COL-204', name: 'Midnight Black' },
  { id: 'COL-205', name: 'Solar Yellow' },
  { id: 'COL-206', name: 'Arctic White' },
  { id: 'COL-207', name: 'Storm Grey' }
];

// Suppliers data
export const suppliers = [
  { name: 'Adidas Manufacturing Ltd.', tier: 'T1' },
  { name: 'Premium Sports Production', tier: 'T1' },
  { name: 'Global Apparel Solutions', tier: 'T1' },
  { name: 'Elite Sportswear Inc.', tier: 'T1' },
  { name: 'TextileTech Materials', tier: 'T2' },
  { name: 'Advanced Fabric Solutions', tier: 'T2' },
  { name: 'Performance Materials Co.', tier: 'T2' },
  { name: 'Innovative Textiles Ltd.', tier: 'T2' }
];

// Compliance types
export const complianceTypes = [
  'A01',
  'CPSIA',
  'CPSIA_adult',
  'Toy',
  'Food_contact_material',
  'PPE',
  'NOCSAE',
  'KC_mark',
  'Vegan',
  'PFC_free'
];

export const appendix1Requests = [
  {
    id: "A01-REQ-001",
    requestDate: "2024-04-01",
    supplier: "Elite Sportswear Inc.",
    dueDate: "2024-04-10",
    dateSubmitted: "2024-04-09",
    status: "Submitted on time",
    signature: "John Doe",
    name: "John Doe",
    title: "Quality Manager",
    company: "Elite Sportswear Inc.",
    country: "Vietnam"
  },
  {
    id: "A01-REQ-002",
    requestDate: "2024-04-05",
    supplier: "Elite Sportswear Inc.",
    dueDate: "2024-04-15",
    dateSubmitted: "2024-04-18",
    status: "Submitted after due date",
    signature: "Jane Smith",
    name: "Jane Smith",
    title: "Compliance Officer",
    company: "Elite Sportswear Inc.",
    country: "Vietnam"
  },
  {
    id: "A01-REQ-003",
    requestDate: "2024-04-10",
    supplier: "Elite Sportswear Inc.",
    dueDate: "2024-04-20",
    dateSubmitted: "",
    status: "Pending"
    // No signature, name, etc. yet
  }
  // ...add more as needed
];

export {
  brandOptions,
  t1FactoryOptions,
  productTypeOptions,
  productMasterData,
  locationOptions,
  importerData,
  testRecordsContacts,
  cpscRegulations,
  productTypeRegulationsMap,
  cpcData as default
};