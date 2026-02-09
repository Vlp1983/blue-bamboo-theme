import { Plus, History, GitBranch, ArrowLeft } from 'lucide-react';

export default function TypeScreen({ onSelect, onBack, hasDraft, hasSubmitted }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Submission Type</h2>
        <p className="text-gray-600 mt-1">
          How would you like to proceed with this case?
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => onSelect('new')}
          className="w-full flex items-center gap-4 p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-md transition-all text-left group"
        >
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
            <Plus className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              New Submission
            </h3>
            <p className="text-sm text-gray-500">
              Start a fresh STPI application for this case
            </p>
          </div>
        </button>

        {hasDraft && (
          <button
            onClick={() => onSelect('continue')}
            className="w-full flex items-center gap-4 p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
              <History className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Continue Incomplete
              </h3>
              <p className="text-sm text-gray-500">
                Resume your previously saved draft application
              </p>
            </div>
          </button>
        )}

        {hasSubmitted && (
          <button
            onClick={() => onSelect('revise')}
            className="w-full flex items-center gap-4 p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <GitBranch className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Revise Submitted
              </h3>
              <p className="text-sm text-gray-500">
                Modify a previously submitted application (creates new revision)
              </p>
            </div>
          </button>
        )}
      </div>

      <div className="mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </div>
  );
}
