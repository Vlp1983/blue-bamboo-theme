import { useState } from 'react';
import { Briefcase, ChevronRight, ArrowLeft, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';

const FIELDS = [
  { key: 'company', label: 'Company Name', type: 'text', required: true, half: true },
  { key: 'rep', label: 'On-Site Representative', type: 'text', required: true, half: true },
  { key: 'license', label: 'License Number', type: 'text', required: true, half: true },
  { key: 'licenseExp', label: 'License Expiration', type: 'date', required: true, half: true },
  { key: 'address', label: 'Street Address', type: 'text', required: true, half: false },
  { key: 'city', label: 'City', type: 'text', required: true, half: true },
  { key: 'state', label: 'State', type: 'text', required: true, half: true },
  { key: 'zip', label: 'ZIP Code', type: 'text', required: true, half: true },
  { key: 'phone', label: 'Phone', type: 'tel', required: true, half: true },
  { key: 'email', label: 'Email', type: 'email', required: true, half: false },
];

export default function ContractorScreen({ contractor, setContractor, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setContractor((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    FIELDS.forEach(({ key, label, required, type }) => {
      if (required && !contractor[key]?.trim()) {
        newErrors[key] = `${label} is required`;
      }
      if (key === 'email' && contractor[key] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contractor[key])) {
        newErrors[key] = 'Please enter a valid email address';
      }
      if (key === 'zip' && contractor[key] && !/^\d{5}$/.test(contractor[key].trim())) {
        newErrors[key] = 'ZIP code must be 5 digits';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <Briefcase className="w-10 h-10 text-teal-600 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-900">
          General Contractor
        </h2>
        <p className="text-gray-600 mt-1">
          Enter the general contractor information for this project
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FIELDS.map(({ key, label, type, required, half }) => (
            <div key={key} className={half ? '' : 'md:col-span-2'}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type={type}
                value={contractor[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors[key] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder={
                  type === 'date'
                    ? ''
                    : key === 'phone'
                    ? '(301) 555-0000'
                    : key === 'email'
                    ? 'contractor@email.com'
                    : key === 'zip'
                    ? '20770'
                    : `Enter ${label.toLowerCase()}`
                }
              />
              {errors[key] && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors[key]}
                </p>
              )}
            </div>
          ))}
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
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
