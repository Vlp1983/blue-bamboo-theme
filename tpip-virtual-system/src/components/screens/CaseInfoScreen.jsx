import { useState, useEffect } from 'react';
import { FileText, ChevronRight, ArrowLeft, AlertCircle } from 'lucide-react';

const REQUIRED_FIELDS = [
  'projectName',
  'projectAddress',
  'city',
  'zip',
  'ownerCompany',
  'ownerEmail',
];

const FIELD_LABELS = {
  caseNumber: 'Case Number',
  projectName: 'Project Name',
  projectAddress: 'Project Address',
  city: 'City',
  state: 'State',
  zip: 'ZIP Code',
  ownerCompany: 'Owner Company',
  ownerPhone: 'Owner Phone',
  ownerEmail: 'Owner Email',
  officerName: 'Officer Name',
  officerTitle: 'Officer Title',
  residentAgent: 'Resident Agent',
  residentPhone: 'Resident Phone',
};

export default function CaseInfoScreen({ caseData, onNext, onBack, onUpdateCase }) {
  const [localData, setLocalData] = useState({ ...caseData });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setLocalData({ ...caseData });
  }, [caseData]);

  const emptyRequired = REQUIRED_FIELDS.filter((f) => !localData[f]?.trim());
  const hasEditableFields = REQUIRED_FIELDS.some((f) => !caseData[f]?.trim());

  const handleChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
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
    REQUIRED_FIELDS.forEach((f) => {
      if (!localData[f]?.trim()) {
        newErrors[f] = `${FIELD_LABELS[f]} is required`;
      }
    });
    if (localData.ownerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localData.ownerEmail)) {
      newErrors.ownerEmail = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onUpdateCase(localData);
      onNext();
    }
  };

  const renderField = (field) => {
    const isEditable = !caseData[field]?.trim() && REQUIRED_FIELDS.includes(field);
    const isRequired = REQUIRED_FIELDS.includes(field);
    const hasError = errors[field];

    return (
      <div key={field}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {FIELD_LABELS[field]}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
        {isEditable ? (
          <input
            type={field.includes('email') ? 'email' : 'text'}
            value={localData[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
              hasError
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300'
            }`}
            placeholder={`Enter ${FIELD_LABELS[field].toLowerCase()}`}
          />
        ) : (
          <div className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
            {localData[field] || <span className="text-gray-400 italic">N/A</span>}
          </div>
        )}
        {hasError && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {hasError}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <FileText className="w-10 h-10 text-teal-600 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-900">
          Case Information
        </h2>
        <p className="text-gray-600 mt-1">
          Verify your project details below
        </p>
      </div>

      {hasEditableFields && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-orange-800">
              Missing Information
            </p>
            <p className="text-sm text-orange-700">
              Some required fields are empty. Please fill in the highlighted fields before continuing.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(FIELD_LABELS).map(renderField)}
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
