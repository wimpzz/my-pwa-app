"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import StepTracker from "@/components/ui/StepTracker";

type StepStatus = "completed" | "current" | "pending" | "failed";

interface Step {
  label: string;
  status: StepStatus;
  dateTime?: string;
}

export default function TrackApplication() {
  const [reqNo, setReqNo] = useState("");
  const [steps, setSteps] = useState<Step[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const hardcodedSteps: Step[] = [
    {
      label:
        "[Application Submitted] - Your application was successfully submitted ",
      status: "completed",
      dateTime: "Aug 27, 2025 10:23 AM",
    },
    {
      label:
        "[Application For Verification] - Your application is currently verifying",
      status: "current",
    },
    {
      label:
        "[Application For Verification] - Your application is pending for disbursement",
      status: "pending",
    },
  ];

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setReqNo(e.target.value);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!reqNo.trim()) {
      setError("Please enter a request number.");
      return;
    }

    setError(null);
    // Directly assign hardcoded steps
    setSteps(hardcodedSteps);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Track Loan Application
      </h1>

      <form
        onSubmit={handleSearch}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <label
          htmlFor="reqNo"
          className="block text-sm font-medium text-gray-700"
        >
          Request Number:
        </label>
        <input
          id="reqNo"
          name="reqNo"
          type="text"
          value={reqNo}
          onChange={handleInput}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md"
          placeholder="e.g., SPFC0001"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {steps && (
        <div className="mt-8 w-full max-w-md bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Application Progress
          </h2>
          <StepTracker steps={steps} />
        </div>
      )}
    </div>
  );
}
