import { CheckCircle } from 'lucide-react';

const steps = [
  { label: 'Legal', screen: 1 },
  { label: 'Type', screen: 2 },
  { label: 'Case', screen: 3 },
  { label: 'Applicant', screen: 4 },
  { label: 'Design', screen: 5 },
  { label: 'Contractor', screen: 6 },
  { label: 'Inspectors', screen: 7 },
  { label: 'Review', screen: 8 },
];

export default function ProgressTracker({ currentScreen, onNavigate }) {
  return (
    <div className="w-full overflow-x-auto py-4 mb-6">
      <div className="flex items-center justify-center min-w-max px-4">
        {steps.map((step, idx) => {
          const isCompleted = currentScreen > step.screen;
          const isCurrent = currentScreen === step.screen;
          const isFuture = currentScreen < step.screen;

          return (
            <div key={step.label} className="flex items-center">
              <div
                className={`flex flex-col items-center ${
                  isCompleted ? 'cursor-pointer' : ''
                }`}
                onClick={() => isCompleted && onNavigate(step.screen)}
                title={isCompleted ? `Go back to ${step.label}` : ''}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-teal-600 text-white ring-4 ring-teal-200'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span
                  className={`mt-1 text-xs font-medium ${
                    isCompleted
                      ? 'text-green-600'
                      : isCurrent
                      ? 'text-teal-600'
                      : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`w-10 h-0.5 mx-1 mt-[-12px] ${
                    currentScreen > step.screen + 1
                      ? 'bg-green-400'
                      : currentScreen > step.screen
                      ? 'bg-green-400'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
