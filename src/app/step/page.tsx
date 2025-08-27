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
  const [searching, setSearching] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setReqNo(e.target.value);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!reqNo.trim()) {
      setError("Please enter a request number.");
      return;
    }

    setSearching(true);
    setError(null);
    setSteps(null);

    try {
      const res = await fetch(
        `http://192.168.23.185:82/SPASv2Repo/api/War/GetJourney?reqno=${encodeURIComponent(
          reqNo.trim()
        )}`
      );
      if (!res.ok) throw new Error("Network response was not ok.");
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setError("Application does not exist.");
      } else {
        const mapped: Step[] = data.map((item: any) => ({
          label: item.remarks || "Step",
          status: item.status.trim().toLowerCase() as StepStatus,
          dateTime:
            item.approvedDate && item.approvedDate !== "1900-01-01T00:00:00"
              ? new Date(item.approvedDate).toLocaleString()
              : undefined,
        }));

        setSteps(mapped);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch journey data.");
    } finally {
      setSearching(false);
    }
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
          disabled={searching}
          className="w-full py-3 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 disabled:opacity-50"
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {steps && steps.length > 0 && (
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
