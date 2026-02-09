import { useState } from 'react';
import { CheckCircle, Download, Eye, Mail, Plus, XCircle } from 'lucide-react';
import { getProfessionalById } from '../../data/mockData';

export default function ConfirmationScreen({ submissionId, caseData, applicantInfo, formData, onNewApplication }) {
  const [showEmailModal, setShowEmailModal] = useState(false);

  const signatories = [];

  // Collect all professionals who need to sign
  const designLabels = { architect: 'Architect of Record', structural: 'Structural Engineer', electrical: 'Electrical Engineer' };
  const inspectorLabels = { building: 'Building Inspector', structural: 'Structural Inspector', electrical: 'Electrical Inspector' };

  Object.entries(designLabels).forEach(([key, role]) => {
    const id = formData.designTeam[key];
    if (id && id !== 'na') {
      const prof = getProfessionalById(id);
      if (prof) signatories.push({ name: prof.name, role, email: prof.email || 'Override required' });
    }
  });

  Object.entries(inspectorLabels).forEach(([key, role]) => {
    const id = formData.inspectors[key];
    if (id && id !== 'na') {
      const prof = getProfessionalById(id);
      if (prof) signatories.push({ name: prof.name, role, email: prof.email || 'Override required' });
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Application Submitted Successfully
          </h2>
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-teal-600 font-medium">Submission ID</p>
            <p className="text-2xl font-bold text-teal-700">{submissionId}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Applicant</h3>
          <p className="text-gray-900">{applicantInfo.applicantName}</p>
          <p className="text-gray-500 text-sm">{applicantInfo.applicantEmail}</p>
          {!applicantInfo.isOwner && (
            <p className="text-sm text-orange-600 mt-2">
              <Mail className="w-3 h-3 inline mr-1" />
              Property owner notification will be sent to: {applicantInfo.ownerEmail}
            </p>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Next Steps</h3>
          <ol className="space-y-3">
            {[
              'All selected professionals will receive an email notification with instructions.',
              'Each professional must accept or reject their assignment on this project.',
              'Upon acceptance, they will complete their electronic signature.',
              'You will receive daily status emails until all signatures are collected.',
              'Once all signatures are collected, DPIE staff will review the application.',
            ].map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </span>
                <span className="text-sm text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => alert('PDF download would be triggered here in production.')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF Copy
          </button>
          <button
            onClick={() => setShowEmailModal(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview Emails
          </button>
          <button
            onClick={onNewApplication}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Application
          </button>
        </div>
      </div>

      {/* Email Preview Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Email Notifications Preview
              </h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {signatories.map((s, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{s.name}</span>
                    <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">{s.role}</span>
                  </div>
                  <div className="bg-gray-50 rounded p-3 text-sm">
                    <p className="font-medium text-gray-800 mb-1">
                      Subject: Action Required: Third-Party Inspection Document Signature Request
                    </p>
                    <p className="text-gray-600">To: {s.email}</p>
                    <hr className="my-2" />
                    <p className="text-gray-700">Dear {s.name},</p>
                    <p className="text-gray-700 mt-1">
                      You have been designated as the <strong>{s.role}</strong> for the project
                      &quot;{caseData.projectName}&quot; located at {caseData.projectAddress}, {caseData.city}, {caseData.state} {caseData.zip}
                      (Case: {caseData.caseNumber}).
                    </p>
                    <p className="text-gray-700 mt-1">
                      Please review this assignment and respond using the buttons below.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        Accept & Sign
                      </span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                        Decline
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowEmailModal(false)}
              className="mt-4 w-full py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
