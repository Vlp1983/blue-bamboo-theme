import { useState } from 'react';
import { User, UserCheck, AlertCircle, ChevronRight, ArrowLeft, Mail } from 'lucide-react';

export default function ApplicantScreen({ caseData, applicantInfo, setApplicantInfo, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setApplicantInfo((prev) => ({ ...prev, [field]: value }));
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
    if (!applicantInfo.applicantName?.trim()) newErrors.applicantName = 'Full name is required';
    if (!applicantInfo.applicantEmail?.trim()) {
      newErrors.applicantEmail = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantInfo.applicantEmail)) {
      newErrors.applicantEmail = 'Please enter a valid email address';
    }
    if (applicantInfo.isOwner === null) newErrors.isOwner = 'Please indicate property ownership';
    if (applicantInfo.isOwner === false) {
      if (!applicantInfo.ownerEmail?.trim()) {
        newErrors.ownerEmail = 'Property owner email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantInfo.ownerEmail)) {
        newErrors.ownerEmail = 'Please enter a valid email address';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <User className="w-10 h-10 text-teal-600 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-900">
          Applicant Information
        </h2>
        <p className="text-gray-600 mt-1">
          Identify yourself and confirm property ownership
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={applicantInfo.applicantName || ''}
              onChange={(e) => handleChange('applicantName', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                errors.applicantName ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.applicantName && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />{errors.applicantName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={applicantInfo.applicantEmail || ''}
              onChange={(e) => handleChange('applicantEmail', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                errors.applicantEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
            {errors.applicantEmail && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />{errors.applicantEmail}
              </p>
            )}
          </div>
        </div>

        <div className="border-t pt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Are you the owner of the property at{' '}
            <span className="font-semibold text-gray-900">
              {caseData.projectAddress}, {caseData.city}, {caseData.state} {caseData.zip}
            </span>
            ? <span className="text-red-500">*</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleChange('isOwner', true)}
              className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all ${
                applicantInfo.isOwner === true
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <UserCheck className={`w-5 h-5 ${applicantInfo.isOwner === true ? 'text-teal-600' : 'text-gray-400'}`} />
              <span className="font-medium">Yes, I am the owner</span>
            </button>
            <button
              onClick={() => handleChange('isOwner', false)}
              className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-all ${
                applicantInfo.isOwner === false
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <User className={`w-5 h-5 ${applicantInfo.isOwner === false ? 'text-orange-600' : 'text-gray-400'}`} />
              <span className="font-medium">No, I am not the owner</span>
            </button>
          </div>
          {errors.isOwner && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{errors.isOwner}
            </p>
          )}
        </div>

        {applicantInfo.isOwner === false && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-800">
                  Property Owner Signature Required
                </p>
                <p className="text-sm text-orange-700">
                  Since you are not the property owner, the owner will receive a separate e-signature
                  request via email. Please provide the property owner's email address below.
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Owner's Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={applicantInfo.ownerEmail || ''}
                  onChange={(e) => handleChange('ownerEmail', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.ownerEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="owner@email.com"
                />
              </div>
              {errors.ownerEmail && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />{errors.ownerEmail}
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg p-3 border border-orange-100">
              <p className="text-xs font-medium text-gray-600 mb-2">Signature Order:</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded font-medium">1. You (Applicant)</span>
                <span>→</span>
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded font-medium">2. Property Owner</span>
                <span>→</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">3. Professionals</span>
              </div>
            </div>
          </div>
        )}
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
