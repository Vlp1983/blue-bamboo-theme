import { useState } from 'react';
import { Building2, Search, ChevronRight, Shield } from 'lucide-react';

export default function LandingScreen({ onContinue }) {
  const [caseNumber, setCaseNumber] = useState('');

  const handleInputChange = (e) => {
    setCaseNumber(e.target.value.toUpperCase());
  };

  const handleSubmit = () => {
    if (caseNumber.trim()) {
      onContinue(caseNumber.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Virtual TPIP System
          </h1>
          <p className="text-gray-600">
            Prince George's County Department of Permitting, Inspections and
            Enforcement
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Statement of Third-Party Inspections (STPI) Electronic Submission
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Enter your Case / Application / Permit Number
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={caseNumber}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="e.g. COM-12345-2025"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-lg"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!caseNumber.trim()}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Demo Case Numbers:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-mono bg-white px-2 py-1 rounded border text-gray-800">
                COM-12345-2025
              </span>
              <span className="text-gray-500">Submitted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono bg-white px-2 py-1 rounded border text-gray-800">
                RES-98765-2025
              </span>
              <span className="text-gray-500">Submitted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono bg-white px-2 py-1 rounded border text-gray-800">
                COM-12345-2026
              </span>
              <span className="text-gray-500">Draft</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono bg-white px-2 py-1 rounded border text-gray-800">
                COM-EMPTY-2025
              </span>
              <span className="text-gray-500">Empty Fields</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
          <Shield className="w-4 h-4" />
          <span>Secure electronic submission system</span>
        </div>
      </div>
    </div>
  );
}
