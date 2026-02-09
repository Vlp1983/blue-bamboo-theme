// Mock case data keyed by case number
export const mockCases = {
  'COM-12345-2025': {
    caseNumber: 'COM-12345-2025',
    projectName: 'Westfield Commerce Center',
    projectAddress: '4500 Forbes Blvd',
    city: 'Lanham',
    state: 'MD',
    zip: '20706',
    ownerCompany: 'Westfield Development Group LLC',
    ownerPhone: '(301) 555-0142',
    ownerEmail: 'permits@westfielddev.com',
    officerName: 'James Rodriguez',
    officerTitle: 'VP of Development',
    residentAgent: 'CSC Global Registered Agent',
    residentPhone: '(301) 555-0199',
  },
  'RES-98765-2025': {
    caseNumber: 'RES-98765-2025',
    projectName: 'Maple Ridge Townhomes Phase II',
    projectAddress: '12200 Old Fort Rd',
    city: 'Fort Washington',
    state: 'MD',
    zip: '20744',
    ownerCompany: 'Maple Ridge Partners LLC',
    ownerPhone: '(240) 555-0188',
    ownerEmail: 'info@mapleridgepartners.com',
    officerName: 'Sarah Chen',
    officerTitle: 'Managing Member',
    residentAgent: 'National Registered Agents Inc',
    residentPhone: '(240) 555-0177',
  },
  'COM-12345-2026': {
    caseNumber: 'COM-12345-2026',
    projectName: 'Gateway Office Park',
    projectAddress: '8900 Edmonston Rd',
    city: 'Greenbelt',
    state: 'MD',
    zip: '20770',
    ownerCompany: 'Gateway Commercial Properties',
    ownerPhone: '(301) 555-0233',
    ownerEmail: 'development@gatewayprop.com',
    officerName: 'Michael Park',
    officerTitle: 'Director of Construction',
    residentAgent: '',
    residentPhone: '',
  },
  'COM-EMPTY-2025': {
    caseNumber: 'COM-EMPTY-2025',
    projectName: '',
    projectAddress: '1000 Main St',
    city: '',
    state: 'MD',
    zip: '',
    ownerCompany: '',
    ownerPhone: '',
    ownerEmail: '',
    officerName: '',
    officerTitle: '',
    residentAgent: '',
    residentPhone: '',
  },
};

// Mock professionals database
export const mockProfessionals = [
  { id: 'arch-001', name: 'Robert Chen, AIA', licenseType: 'Architect', license: 'A-2019-4421', exp: '2026-06-30', company: 'Chen Architecture Studio', email: 'rchen@chenarch.com', phone: '(301) 555-0101' },
  { id: 'arch-002', name: 'Patricia Williams, AIA', licenseType: 'Architect', license: 'A-2018-3315', exp: '2026-09-15', company: 'Williams & Associates Architects', email: 'pwilliams@waarch.com', phone: '(240) 555-0102' },
  { id: 'arch-003', name: 'David Kim, AIA', licenseType: 'Architect', license: 'A-2020-5567', exp: '2025-12-31', company: 'Kim Design Group', email: '', phone: '(301) 555-0103' },

  { id: 'se-001', name: 'Dr. Thomas Nguyen, PE', licenseType: 'Structural Engineer', license: 'SE-2017-2234', exp: '2026-03-31', company: 'Nguyen Structural Engineering', email: 'tnguyen@nguyense.com', phone: '(301) 555-0201' },
  { id: 'se-002', name: 'Angela Martinez, PE', licenseType: 'Structural Engineer', license: 'SE-2019-3789', exp: '2026-08-15', company: 'Pinnacle Structural Consultants', email: 'amartinez@pinnaclestruc.com', phone: '(240) 555-0202' },
  { id: 'se-003', name: 'Brian O\'Connor, PE', licenseType: 'Structural Engineer', license: 'SE-2016-1122', exp: '2025-11-30', company: 'O\'Connor Engineering LLC', email: 'boconnor@oconnoreng.com', phone: '(301) 555-0203' },

  { id: 'ee-001', name: 'Sandra Lee, PE', licenseType: 'Electrical Engineer', license: 'EE-2018-4456', exp: '2026-05-31', company: 'Lee Electrical Engineering', email: 'slee@leeelec.com', phone: '(301) 555-0301' },
  { id: 'ee-002', name: 'Mark Johnson, PE', licenseType: 'Electrical Engineer', license: 'EE-2020-5578', exp: '2026-07-15', company: 'PowerGrid Consultants', email: 'mjohnson@powergrid.com', phone: '(240) 555-0302' },
  { id: 'ee-003', name: 'Nancy Wright, PE', licenseType: 'Electrical Engineer', license: 'EE-2017-2290', exp: '2025-10-31', company: 'Wright Electric Solutions', email: '', phone: '(301) 555-0303' },

  { id: 'bi-001', name: 'George Thompson', licenseType: 'Building Inspector', license: 'BI-2019-6612', exp: '2026-04-30', company: 'Metro Building Inspections LLC', email: 'gthompson@metroinsp.com', phone: '(301) 555-0401' },
  { id: 'bi-002', name: 'Linda Garcia', licenseType: 'Building Inspector', license: 'BI-2018-5543', exp: '2026-06-15', company: 'Capital Inspection Services', email: 'lgarcia@capitalinsp.com', phone: '(240) 555-0402' },
  { id: 'bi-003', name: 'William Brown', licenseType: 'Building Inspector', license: 'BI-2020-7789', exp: '2026-01-31', company: 'Reliable Building Inspectors', email: 'wbrown@reliableinsp.com', phone: '(301) 555-0403' },

  { id: 'si-001', name: 'Karen Davis, PE', licenseType: 'Structural Inspector', license: 'SI-2017-3345', exp: '2026-05-15', company: 'Davis Structural Inspections', email: 'kdavis@davissi.com', phone: '(301) 555-0501' },
  { id: 'si-002', name: 'Richard Wilson', licenseType: 'Structural Inspector', license: 'SI-2019-4489', exp: '2026-09-30', company: 'Integrity Structural Services', email: 'rwilson@integrityss.com', phone: '(240) 555-0502' },
  { id: 'si-003', name: 'Jennifer Taylor', licenseType: 'Structural Inspector', license: 'SI-2018-3378', exp: '2026-02-28', company: 'Taylor Inspection Group', email: 'jtaylor@taylorinsp.com', phone: '(301) 555-0503' },

  { id: 'ei-001', name: 'Steven Moore', licenseType: 'Electrical Inspector', license: 'EI-2019-5567', exp: '2026-07-31', company: 'Premier Electrical Inspections', email: 'smoore@premierelec.com', phone: '(301) 555-0601' },
  { id: 'ei-002', name: 'Carol Anderson', licenseType: 'Electrical Inspector', license: 'EI-2018-4423', exp: '2026-03-15', company: 'Certified Electrical Services', email: 'canderson@certifiedel.com', phone: '(240) 555-0602' },
  { id: 'ei-003', name: 'Paul Jackson', licenseType: 'Electrical Inspector', license: 'EI-2020-6690', exp: '2026-11-30', company: 'Jackson Electrical Inspections', email: '', phone: '(301) 555-0603' },
];

// Mock submitted applications
export const mockSubmittedApplications = {
  'COM-12345-2025': {
    submissionId: 'COM-12345-2025-TPIP',
    caseNumber: 'COM-12345-2025',
    status: 'Pending Signatures',
    revisionNumber: 0,
    submittedAt: '2025-01-10T14:30:00Z',
    legalAcknowledgements: { section1: true, section2: true },
    applicantInfo: {
      applicantName: 'James Rodriguez',
      applicantEmail: 'jrodriguez@westfielddev.com',
      isOwner: true,
      ownerEmail: null,
    },
    formData: {
      designTeam: {
        architect: 'arch-001',
        structural: 'se-001',
        electrical: 'ee-001',
      },
      contractor: {
        company: 'Titan Construction Group',
        rep: 'Frank Miller',
        license: 'GC-2018-9901',
        licenseExp: '2026-06-30',
        address: '2500 Business Pkwy',
        city: 'College Park',
        state: 'MD',
        zip: '20740',
        phone: '(301) 555-0700',
        email: 'fmiller@titanconst.com',
      },
      inspectors: {
        building: 'bi-001',
        structural: 'si-001',
        electrical: 'ei-001',
      },
    },
    signatories: [
      { name: 'Robert Chen, AIA', role: 'Architect of Record', email: 'rchen@chenarch.com', status: 'Signed', signedAt: '2025-01-11T09:15:00Z' },
      { name: 'Dr. Thomas Nguyen, PE', role: 'Structural Engineer', email: 'tnguyen@nguyense.com', status: 'Signed', signedAt: '2025-01-11T11:30:00Z' },
      { name: 'Sandra Lee, PE', role: 'Electrical Engineer', email: 'slee@leeelec.com', status: 'Pending', signedAt: null },
      { name: 'George Thompson', role: 'Building Inspector', email: 'gthompson@metroinsp.com', status: 'Signed', signedAt: '2025-01-12T08:45:00Z' },
      { name: 'Karen Davis, PE', role: 'Structural Inspector', email: 'kdavis@davissi.com', status: 'Pending', signedAt: null },
    ],
    previousVersions: [],
  },
  'RES-98765-2025': {
    submissionId: 'RES-98765-2025-TPIP',
    caseNumber: 'RES-98765-2025',
    status: 'Complete',
    revisionNumber: 1,
    submittedAt: '2025-01-05T10:00:00Z',
    legalAcknowledgements: { section1: true, section2: true },
    applicantInfo: {
      applicantName: 'Sarah Chen',
      applicantEmail: 'schen@mapleridgepartners.com',
      isOwner: false,
      ownerEmail: 'info@mapleridgepartners.com',
    },
    formData: {
      designTeam: {
        architect: 'arch-002',
        structural: 'se-002',
        electrical: 'ee-002',
      },
      contractor: {
        company: 'Premier Builders Inc',
        rep: 'Tony Alvarez',
        license: 'GC-2019-7742',
        licenseExp: '2026-03-31',
        address: '1100 Industry Ln',
        city: 'Bowie',
        state: 'MD',
        zip: '20716',
        phone: '(240) 555-0800',
        email: 'talvarez@premierbuilders.com',
      },
      inspectors: {
        building: 'bi-002',
        structural: 'si-002',
        electrical: 'ei-002',
      },
    },
    signatories: [
      { name: 'Patricia Williams, AIA', role: 'Architect of Record', email: 'pwilliams@waarch.com', status: 'Signed', signedAt: '2025-01-05T14:20:00Z' },
      { name: 'Angela Martinez, PE', role: 'Structural Engineer', email: 'amartinez@pinnaclestruc.com', status: 'Signed', signedAt: '2025-01-06T09:00:00Z' },
      { name: 'Mark Johnson, PE', role: 'Electrical Engineer', email: 'mjohnson@powergrid.com', status: 'Signed', signedAt: '2025-01-06T11:45:00Z' },
      { name: 'Linda Garcia', role: 'Building Inspector', email: 'lgarcia@capitalinsp.com', status: 'Signed', signedAt: '2025-01-07T08:30:00Z' },
      { name: 'Richard Wilson', role: 'Structural Inspector', email: 'rwilson@integrityss.com', status: 'Signed', signedAt: '2025-01-07T13:15:00Z' },
      { name: 'Carol Anderson', role: 'Electrical Inspector', email: 'canderson@certifiedel.com', status: 'Signed', signedAt: '2025-01-08T10:00:00Z' },
    ],
    previousVersions: [
      { submissionId: 'RES-98765-2025-TPIP-R0', submittedAt: '2025-01-02T08:00:00Z', status: 'Revised' },
    ],
  },
};

// Mock draft applications
export const mockDrafts = {
  'COM-12345-2026': {
    currentScreen: 5, // Was on Design Team screen
    legalAcknowledgements: { section1: true, section2: true },
    applicantInfo: {
      applicantName: 'Michael Park',
      applicantEmail: 'mpark@gatewayprop.com',
      isOwner: true,
      ownerEmail: null,
    },
    formData: {
      designTeam: {
        architect: 'arch-001',
        structural: null,
        electrical: null,
      },
      contractor: {
        company: '',
        rep: '',
        license: '',
        licenseExp: '',
        address: '',
        city: '',
        state: 'MD',
        zip: '',
        phone: '',
        email: '',
      },
      inspectors: {
        building: null,
        structural: null,
        electrical: null,
      },
    },
  },
};

// Mock staff users
export const mockStaffUsers = {
  admin: { username: 'admin', name: 'System Administrator', role: 'System Administrator' },
  vparker: { username: 'vparker', name: 'Victoria Parker', role: 'DPIE Staff' },
  test: { username: 'test', name: 'Test User', role: 'Test User' },
};

// Helper to get professional by ID
export function getProfessionalById(id) {
  return mockProfessionals.find((p) => p.id === id) || null;
}

// Helper to get professionals by license type
export function getProfessionalsByType(licenseType) {
  return mockProfessionals.filter((p) => p.licenseType === licenseType);
}

// All submitted applications as array for staff dashboard
export function getAllApplications() {
  return Object.values(mockSubmittedApplications);
}
