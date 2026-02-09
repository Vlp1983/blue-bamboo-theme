import { useState, useCallback } from 'react';
import './App.css';
import { mockCases, mockSubmittedApplications, mockDrafts } from './data/mockData';
import ProgressTracker from './components/ProgressTracker';
import LandingScreen from './components/screens/LandingScreen';
import LegalScreen from './components/screens/LegalScreen';
import TypeScreen from './components/screens/TypeScreen';
import CaseInfoScreen from './components/screens/CaseInfoScreen';
import ApplicantScreen from './components/screens/ApplicantScreen';
import DesignTeamScreen from './components/screens/DesignTeamScreen';
import ContractorScreen from './components/screens/ContractorScreen';
import InspectorsScreen from './components/screens/InspectorsScreen';
import ReviewScreen from './components/screens/ReviewScreen';
import ConfirmationScreen from './components/screens/ConfirmationScreen';
import StaffDashboard from './components/StaffDashboard';

// Screen constants
const SCREEN = {
  LANDING: 0,
  LEGAL: 1,
  TYPE: 2,
  CASE_INFO: 3,
  APPLICANT: 4,
  DESIGN_TEAM: 5,
  CONTRACTOR: 6,
  INSPECTORS: 7,
  REVIEW: 8,
  CONFIRMATION: 9,
  STAFF_DASHBOARD: 100,
};

const DEFAULT_CONTRACTOR = {
  company: '', rep: '', license: '', licenseExp: '',
  address: '', city: '', state: 'MD', zip: '',
  phone: '', email: '',
};

const DEFAULT_APPLICANT = {
  isOwner: null, ownerEmail: '', applicantName: '', applicantEmail: '',
};

function App() {
  // Portal mode
  const [mode, setMode] = useState('applicant'); // 'applicant' | 'staff'

  // Screen state
  const [currentScreen, setCurrentScreen] = useState(SCREEN.LANDING);

  // Case data
  const [caseNumber, setCaseNumber] = useState('');
  const [caseData, setCaseData] = useState(null);

  // Legal acknowledgements
  const [legalAck, setLegalAck] = useState({ section1: false, section2: false });

  // Applicant info
  const [applicantInfo, setApplicantInfo] = useState({ ...DEFAULT_APPLICANT });

  // Form data
  const [designTeam, setDesignTeam] = useState({ architect: null, structural: null, electrical: null });
  const [contractor, setContractor] = useState({ ...DEFAULT_CONTRACTOR });
  const [inspectors, setInspectors] = useState({ building: null, structural: null, electrical: null });

  // Submission
  const [submissionId, setSubmissionId] = useState('');
  const [revisionNumber, setRevisionNumber] = useState(0);

  // Reset all form state
  const resetForm = useCallback(() => {
    setLegalAck({ section1: false, section2: false });
    setApplicantInfo({ ...DEFAULT_APPLICANT });
    setDesignTeam({ architect: null, structural: null, electrical: null });
    setContractor({ ...DEFAULT_CONTRACTOR });
    setInspectors({ building: null, structural: null, electrical: null });
    setSubmissionId('');
    setRevisionNumber(0);
  }, []);

  // Handle landing screen continue
  const handleLandingContinue = (inputCaseNumber) => {
    setCaseNumber(inputCaseNumber);
    const foundCase = mockCases[inputCaseNumber];
    if (foundCase) {
      setCaseData({ ...foundCase });
    } else {
      // New case - create a blank entry
      setCaseData({
        caseNumber: inputCaseNumber,
        projectName: '', projectAddress: '', city: '', state: 'MD', zip: '',
        ownerCompany: '', ownerPhone: '', ownerEmail: '',
        officerName: '', officerTitle: '', residentAgent: '', residentPhone: '',
      });
    }
    resetForm();
    setCurrentScreen(SCREEN.LEGAL);
  };

  // Handle submission type selection
  const handleTypeSelect = (type) => {
    if (type === 'new') {
      resetForm();
      setCurrentScreen(SCREEN.CASE_INFO);
    } else if (type === 'continue') {
      const draft = mockDrafts[caseNumber];
      if (draft) {
        setLegalAck(draft.legalAcknowledgements);
        setApplicantInfo(draft.applicantInfo);
        setDesignTeam(draft.formData.designTeam);
        setContractor(draft.formData.contractor);
        setInspectors(draft.formData.inspectors);
        setCurrentScreen(draft.currentScreen);
      }
    } else if (type === 'revise') {
      const submitted = mockSubmittedApplications[caseNumber];
      if (submitted) {
        setLegalAck(submitted.legalAcknowledgements);
        setApplicantInfo(submitted.applicantInfo);
        setDesignTeam(submitted.formData.designTeam);
        setContractor(submitted.formData.contractor);
        setInspectors(submitted.formData.inspectors);
        setRevisionNumber(submitted.revisionNumber + 1);
        setCurrentScreen(SCREEN.CASE_INFO);
      }
    }
  };

  // Handle submit
  const handleSubmit = (signatureData) => {
    const suffix = revisionNumber > 0 ? `-R${revisionNumber}` : '';
    const newId = `${caseNumber}-TPIP${suffix}`;
    setSubmissionId(newId);
    setCurrentScreen(SCREEN.CONFIRMATION);
  };

  // Navigate back to landing
  const handleNewApplication = () => {
    setCaseNumber('');
    setCaseData(null);
    resetForm();
    setCurrentScreen(SCREEN.LANDING);
  };

  // Staff dashboard mode
  if (mode === 'staff') {
    return <StaffDashboard onBack={() => setMode('applicant')} />;
  }

  // Show progress tracker for screens 1-8 (not landing or confirmation)
  const showProgress = currentScreen >= SCREEN.LEGAL && currentScreen <= SCREEN.REVIEW;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      {/* Top bar with staff dashboard link */}
      {currentScreen === SCREEN.LANDING && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setMode('staff')}
            className="text-sm text-teal-600 hover:text-teal-700 underline"
          >
            Staff Dashboard
          </button>
        </div>
      )}

      {/* Progress Tracker */}
      {showProgress && (
        <div className="pt-4 px-4">
          <ProgressTracker
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className={showProgress ? 'px-4 pb-8' : ''}>
        {currentScreen === SCREEN.LANDING && (
          <LandingScreen onContinue={handleLandingContinue} />
        )}

        {currentScreen === SCREEN.LEGAL && (
          <LegalScreen
            acknowledgements={legalAck}
            setAcknowledgements={setLegalAck}
            onNext={() => setCurrentScreen(SCREEN.TYPE)}
            onBack={handleNewApplication}
          />
        )}

        {currentScreen === SCREEN.TYPE && (
          <TypeScreen
            hasDraft={!!mockDrafts[caseNumber]}
            hasSubmitted={!!mockSubmittedApplications[caseNumber]}
            onSelect={handleTypeSelect}
            onBack={() => setCurrentScreen(SCREEN.LEGAL)}
          />
        )}

        {currentScreen === SCREEN.CASE_INFO && caseData && (
          <CaseInfoScreen
            caseData={caseData}
            onUpdateCase={(updated) => setCaseData(updated)}
            onNext={() => setCurrentScreen(SCREEN.APPLICANT)}
            onBack={() => setCurrentScreen(SCREEN.TYPE)}
          />
        )}

        {currentScreen === SCREEN.APPLICANT && caseData && (
          <ApplicantScreen
            caseData={caseData}
            applicantInfo={applicantInfo}
            setApplicantInfo={setApplicantInfo}
            onNext={() => setCurrentScreen(SCREEN.DESIGN_TEAM)}
            onBack={() => setCurrentScreen(SCREEN.CASE_INFO)}
          />
        )}

        {currentScreen === SCREEN.DESIGN_TEAM && (
          <DesignTeamScreen
            designTeam={designTeam}
            setDesignTeam={setDesignTeam}
            onNext={() => setCurrentScreen(SCREEN.CONTRACTOR)}
            onBack={() => setCurrentScreen(SCREEN.APPLICANT)}
          />
        )}

        {currentScreen === SCREEN.CONTRACTOR && (
          <ContractorScreen
            contractor={contractor}
            setContractor={setContractor}
            onNext={() => setCurrentScreen(SCREEN.INSPECTORS)}
            onBack={() => setCurrentScreen(SCREEN.DESIGN_TEAM)}
          />
        )}

        {currentScreen === SCREEN.INSPECTORS && (
          <InspectorsScreen
            inspectors={inspectors}
            setInspectors={setInspectors}
            designTeam={designTeam}
            onNext={() => setCurrentScreen(SCREEN.REVIEW)}
            onBack={() => setCurrentScreen(SCREEN.CONTRACTOR)}
          />
        )}

        {currentScreen === SCREEN.REVIEW && caseData && (
          <ReviewScreen
            caseData={caseData}
            applicantInfo={applicantInfo}
            formData={{ designTeam, contractor, inspectors }}
            onSubmit={handleSubmit}
            onBack={() => setCurrentScreen(SCREEN.INSPECTORS)}
          />
        )}

        {currentScreen === SCREEN.CONFIRMATION && caseData && (
          <ConfirmationScreen
            submissionId={submissionId}
            caseData={caseData}
            applicantInfo={applicantInfo}
            formData={{ designTeam, contractor, inspectors }}
            onNewApplication={handleNewApplication}
          />
        )}
      </div>
    </div>
  );
}

export default App;
