import { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp, ChevronRight, ArrowLeft, Shield } from 'lucide-react';

const sections = [
  {
    title: 'Third-Party Inspection Program Requirements & Compliance',
    content: `The Third-Party Inspection Program (TPIP) is established under the authority of Prince George's County to ensure that construction projects meet all applicable building codes and safety standards through independent third-party inspections.

Statement of Third-Party Inspections (STPI) Requirements:
- All permit applicants for projects requiring third-party inspection must submit a completed STPI form before any inspections may commence.
- The STPI form identifies all design professionals, contractors, and third-party inspectors associated with the project.
- All parties named on the STPI must acknowledge their roles and responsibilities through electronic signature.

Inspector Qualifications and Licensing:
- All third-party inspectors must hold current, valid licenses issued by the State of Maryland or other recognized licensing authority.
- Inspectors must demonstrate competence in their specific discipline (building, structural, electrical, mechanical, fire protection).
- License expiration dates are tracked and inspectors with expired licenses may not perform inspections.
- Inspectors must maintain continuing education requirements as mandated by their licensing authority.

Use & Occupancy Certificate Requirements:
- No Use & Occupancy (U&O) Certificate will be issued until all required third-party inspections are complete and approved.
- A Final Inspection Report must be submitted by each third-party inspector before U&O consideration.
- Any outstanding violations or deficiencies must be resolved prior to U&O issuance.
- The DPIE reserves the right to conduct supplementary inspections at any time during the construction process.`,
  },
  {
    title: 'Insurance, Pre-Construction & Conflict of Interest',
    content: `Errors & Omissions Insurance:
- All third-party inspectors must maintain a minimum of $1,000,000 (One Million Dollars) in Errors & Omissions (E&O) insurance coverage.
- Proof of current E&O insurance must be on file with DPIE before any inspections may be performed.
- Insurance coverage must remain active throughout the duration of the project and for a minimum of two (2) years following project completion.
- Any lapse in insurance coverage will result in immediate suspension of inspection authority.

Pre-Construction Conference:
- A mandatory pre-construction conference must be held before any construction activity begins.
- All parties named on the STPI are required to attend the pre-construction conference, either in person or via approved virtual meeting platform.
- The conference will review project scope, inspection requirements, reporting procedures, and communication protocols.
- Meeting minutes will be recorded and distributed to all parties within five (5) business days.

Conflict of Interest Requirements:
- Third-party inspectors must be independent of the design and construction teams.
- An inspector may NOT be employed by, affiliated with, or have financial interest in:
  (a) The design professional or engineering firm responsible for the same discipline
  (b) The general contractor or any subcontractor on the project
  (c) The property owner or developer
- The structural engineer of record may NOT serve as the structural inspector for the same project.
- The electrical engineer of record may NOT serve as the electrical inspector for the same project.
- Any potential conflict of interest must be disclosed in writing to DPIE before the STPI is submitted.
- DPIE reserves the right to reject any inspector assignment that presents an actual or apparent conflict of interest.`,
  },
];

export default function LegalScreen({ onNext, onBack, acknowledgements, setAcknowledgements }) {
  const [expanded, setExpanded] = useState(null);

  const allAcknowledged = acknowledgements.section1 && acknowledgements.section2;

  const toggleSection = (idx) => {
    setExpanded(expanded === idx ? null : idx);
  };

  const toggleAcknowledgement = (key) => {
    setAcknowledgements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <Shield className="w-10 h-10 text-teal-600 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-900">
          Legal Acknowledgements
        </h2>
        <p className="text-gray-600 mt-1">
          Please review and acknowledge each section before proceeding
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section, idx) => {
          const key = `section${idx + 1}`;
          const isAcknowledged = acknowledgements[key];
          const isExpanded = expanded === idx;

          return (
            <div
              key={key}
              className={`border rounded-lg overflow-hidden transition-all ${
                isAcknowledged
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <button
                onClick={() => toggleSection(idx)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {isAcknowledged ? (
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0" />
                  )}
                  <span className="font-semibold text-gray-900">
                    Section {idx + 1}: {section.title}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto mb-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                      {section.content}
                    </pre>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAcknowledged}
                      onChange={() => toggleAcknowledgement(key)}
                      className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      I have read and acknowledge the above requirements
                    </span>
                  </label>
                </div>
              )}
            </div>
          );
        })}
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
          onClick={onNext}
          disabled={!allAcknowledged}
          className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
