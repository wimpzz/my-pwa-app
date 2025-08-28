import React from "react";

type StepStatus = "completed" | "current" | "pending" | "failed";

interface Step {
  label: string;
  status: StepStatus;
  dateTime?: string;
}

interface StepTrackerProps {
  steps: Step[];
}

const statusStyles = {
  completed: {
    bg: "bg-green-100",
    dot: "bg-green-500",
    icon: "✅",
  },
  current: {
    bg: "bg-blue-100",
    dot: "bg-blue-500",
    icon: "🟢",
  },
  pending: {
    bg: "bg-yellow-100",
    dot: "bg-yellow-500",
    icon: "🕒",
  },
  failed: {
    bg: "bg-red-100",
    dot: "bg-red-500",
    icon: "❌",
  },
};


const StepTracker: React.FC<StepTrackerProps> = ({ steps }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-lg mx-auto">
      <ul className="space-y-6">
        {steps.map((step, index) => {
          const style = statusStyles[step.status];

          return (
            <li
              key={index}
              className={`flex items-start space-x-4 p-4 rounded-lg ${style.bg}`}
              aria-current={step.status === "current" ? "step" : undefined}
            >
              {/* Circle Icon */}
              <div
                className={`w-8 h-8 flex items-center justify-center text-white text-sm font-bold rounded-full ${style.dot}`}
                aria-hidden="true"
              >
                {style.icon}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{step.label}</div>
                {step.dateTime && (
                  <div className="text-sm text-gray-600">{step.dateTime}</div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StepTracker;
