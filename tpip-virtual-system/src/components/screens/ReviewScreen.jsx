import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, ArrowLeft, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { getProfessionalById } from '../../data/mockData';

const DESIGN_LABELS = {
  architect: 'Architect of Record',
  structural: 'Structural Engineer',
  electrical: 'Electrical Engineer',
};

const INSPECTOR_LABELS = {
  building: 'Building Inspector',
  structural: 'Structural Inspector',
  electrical: 'Electrical Inspector',
};

export default function ReviewScreen({ caseData, applicantInfo, formData, onSubmit, onBack }) {
  const [requirementsExpanded, setRequirementsExpanded] = useState(false);
  const [ack1, setAck1] = useState(false);
  const [ack2, setAck2] = useState(false);
  const [signName, setSignName] = useState('');
  const [signTitle, setSignTitle] = useState('');
  const [signDate, setSignDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState({});

  const allReady = ack1 && ack2 && signName.trim() && signTitle.trim() && signDate;

  const validate = () => {
    const newErrors = {};
    if (!ack1) newErrors.ack1 = 'Required';
    if (!ack2) newErrors.ack2 = 'Required';
    if (!signName.trim()) newErrors.signName = 'Full legal name is required';
    if (!signTitle.trim()) newErrors.signTitle = 'Title/position is required';
    if (!signDate) newErrors.signDate = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ signName, signTitle, signDate });
    }
  };

  const renderProfessional = (id, label) => {
    if (!id || id === 'na') {
      return (
        <div className="flex justify-between py-2">
          <span className="text-gray-600">{label}</span>
          <span className="text-gray-400 italic">N/A</span>
        </div>
      );
    }
    const prof = getProfessionalById(id);
    if (!prof) return null;
    return (
      <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
        <span className="text-gray-600">{label}</span>
        <div className="text-right">
          <span className="font-medium text-gray-900">{prof.name}</span>
          <span className="text-sm text-gray-500 block">{prof.company} | {prof.license}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <FileText className="w-10 h-10 text-teal-600 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
        <p className="text-gray-600 mt-1">
          Review all information before submitting your application
        </p>
      </div>

      <div className="space-y-6">
        {/* Project Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            Project Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div><span className="text-gray-500">Case Number:</span> <span className="font-medium ml-1">{caseData.caseNumber}</span></div>
            <div><span className="text-gray-500">Project Name:</span> <span className="font-medium ml-1">{caseData.projectName}</span></div>
            <div className="md:col-span-2"><span className="text-gray-500">Address:</span> <span className="font-medium ml-1">{caseData.projectAddress}, {caseData.city}, {caseData.state} {caseData.zip}</span></div>
            <div><span className="text-gray-500">Owner:</span> <span className="font-medium ml-1">{caseData.ownerCompany}</span></div>
            <div><span className="text-gray-500">Owner Email:</span> <span className="font-medium ml-1">{caseData.ownerEmail}</span></div>
          </div>
        </div>

        {/* Applicant Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            Applicant Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div><span className="text-gray-500">Name:</span> <span className="font-medium ml-1">{applicantInfo.applicantName}</span></div>
            <div><span className="text-gray-500">Email:</span> <span className="font-medium ml-1">{applicantInfo.applicantEmail}</span></div>
            <div>
              <span className="text-gray-500">Property Owner:</span>
              <span className={`font-medium ml-1 ${applicantInfo.isOwner ? 'text-teal-600' : 'text-orange-600'}`}>
                {applicantInfo.isOwner ? 'Yes' : 'No'}
              </span>
            </div>
            {!applicantInfo.isOwner && (
              <div><span className="text-gray-500">Owner Email:</span> <span className="font-medium ml-1">{applicantInfo.ownerEmail}</span></div>
            )}
          </div>
        </div>

        {/* Design Team */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            Design Team
          </h3>
          <div className="space-y-1">
            {Object.entries(DESIGN_LABELS).map(([key, label]) =>
              renderProfessional(formData.designTeam[key], label)
            )}
          </div>
        </div>

        {/* General Contractor */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            General Contractor
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div><span className="text-gray-500">Company:</span> <span className="font-medium ml-1">{formData.contractor.company}</span></div>
            <div><span className="text-gray-500">Representative:</span> <span className="font-medium ml-1">{formData.contractor.rep}</span></div>
            <div><span className="text-gray-500">License:</span> <span className="font-medium ml-1">{formData.contractor.license}</span></div>
            <div><span className="text-gray-500">Expires:</span> <span className="font-medium ml-1">{formData.contractor.licenseExp}</span></div>
            <div className="md:col-span-2"><span className="text-gray-500">Address:</span> <span className="font-medium ml-1">{formData.contractor.address}, {formData.contractor.city}, {formData.contractor.state} {formData.contractor.zip}</span></div>
            <div><span className="text-gray-500">Phone:</span> <span className="font-medium ml-1">{formData.contractor.phone}</span></div>
            <div><span className="text-gray-500">Email:</span> <span className="font-medium ml-1">{formData.contractor.email}</span></div>
          </div>
        </div>

        {/* Third-Party Inspectors */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            Third-Party Inspectors
          </h3>
          <div className="space-y-1">
            {Object.entries(INSPECTOR_LABELS).map(([key, label]) =>
              renderProfessional(formData.inspectors[key], label)
            )}
          </div>
        </div>

        {/* Final Acknowledgements */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            Final Acknowledgements
          </h3>

          <button
            onClick={() => setRequirementsExpanded(!requirementsExpanded)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 mb-4"
          >
            <span className="text-sm font-medium text-gray-700">
              View Inspection & Reporting Requirements
            </span>
            {requirementsExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {requirementsExpanded && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 max-h-48 overflow-y-auto">
              <p className="mb-2"><strong>Inspection Requirements:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>All inspection records must be maintained for a minimum of ten (10) years.</li>
                <li>Inspectors must file reports within five (5) business days of each inspection.</li>
                <li>A Final Inspection Report must be submitted before issuance of Use & Occupancy Certificate.</li>
                <li>Any critical deficiencies must be reported to DPIE within 24 hours.</li>
                <li>Monthly progress reports are required for projects exceeding 6 months duration.</li>
              </ul>
            </div>
          )}

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={ack1}
                onChange={() => setAck1(!ack1)}
                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700">
                I acknowledge the inspection requirements including 10-year record retention,
                timely reporting of all inspections, and submission of a Final Inspection Report.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={ack2}
                onChange={() => setAck2(!ack2)}
                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700">
                I certify that all information provided in this application is accurate and complete.
                I understand that all designated parties will receive electronic signature requests
                and must acknowledge their roles before the STPI is considered complete.
              </span>
            </label>
          </div>
        </div>

        {/* Electronic Signature */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
            Electronic Signature
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={signName}
                onChange={(e) => setSignName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.signName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your full legal name"
              />
              {errors.signName && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />{errors.signName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title / Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={signTitle}
                onChange={(e) => setSignTitle(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.signTitle ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="e.g. Project Manager"
              />
              {errors.signTitle && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />{errors.signTitle}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={signDate}
                  onChange={(e) => setSignDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {signName.trim() && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Signature Preview:</p>
              <p className="signature-preview text-3xl text-gray-800">{signName}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!allReady}
          className="flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          <CheckCircle className="w-5 h-5" />
          Submit Application
        </button>
      </div>
    </div>
  );
}
