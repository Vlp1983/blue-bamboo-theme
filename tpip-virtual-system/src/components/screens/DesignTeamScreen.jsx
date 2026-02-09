import { useState } from 'react';
import { Users, ChevronRight, ArrowLeft, Award, Briefcase, Mail, Phone, AlertCircle } from 'lucide-react';
import { getProfessionalsByType, getProfessionalById } from '../../data/mockData';

const ROLES = [
  { key: 'architect', label: 'Architect of Record (AR)', licenseType: 'Architect' },
  { key: 'structural', label: 'Structural Engineer (SER)', licenseType: 'Structural Engineer' },
  { key: 'electrical', label: 'Electrical Engineer (EER)', licenseType: 'Electrical Engineer' },
];

export default function DesignTeamScreen({ designTeam, setDesignTeam, onNext, onBack }) {
  const [emailOverrides, setEmailOverrides] = useState({});

  const handleSelect = (roleKey, professionalId) => {
    setDesignTeam((prev) => ({ ...prev, [roleKey]: professionalId || null }));
  };

  const handleEmailOverride = (roleKey, email) => {
    setEmailOverrides((prev) => ({ ...prev, [roleKey]: email }));
  };

  const renderProfessionalCard = (roleKey) => {
    const selected = designTeam[roleKey];
    if (!selected || selected === 'na') return null;

    const prof = getProfessionalById(selected);
    if (!prof) return null;

    const needsEmail = !prof.email;

    return (
      <div className="mt-3 p-4 bg-teal-50 border border-teal-200 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Company:</span>
            <span className="font-medium text-gray-900">{prof.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">License:</span>
            <span className="font-medium text-gray-900">{prof.license}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Email:</span>
            <span className="font-medium text-gray-900">{prof.email || 'Not on file'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium text-gray-900">{prof.phone}</span>
          </div>
          <div className="flex items-center gap-2 col-span-full">
            <span className="text-gray-600">Expires:</span>
            <span className="font-medium text-gray-900">{prof.exp}</span>
          </div>
        </div>

        {needsEmail && (
          <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <label className="block text-sm font-medium text-orange-800 mb-1">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Email not on file. Please provide an email for signature requests:
            </label>
            <input
              type="email"
              value={emailOverrides[roleKey] || ''}
              onChange={(e) => handleEmailOverride(roleKey, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="professional@email.com"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <Users className="w-10 h-10 text-teal-600 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-900">Design Team</h2>
        <p className="text-gray-600 mt-1">
          Select the licensed design professionals for this project
        </p>
      </div>

      <div className="space-y-6">
        {ROLES.map(({ key, label, licenseType }) => {
          const professionals = getProfessionalsByType(licenseType);
          return (
            <div key={key} className="bg-white rounded-lg shadow-lg p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {label}
              </label>
              <select
                value={designTeam[key] || ''}
                onChange={(e) => handleSelect(key, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">-- Select {label} --</option>
                <option value="na">N/A - Not Required</option>
                {professionals.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.company} (Lic: {p.license})
                  </option>
                ))}
              </select>
              {renderProfessionalCard(key)}
              {designTeam[key] === 'na' && (
                <p className="mt-2 text-sm text-gray-500 italic">
                  This role is not required for this project.
                </p>
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
          className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
