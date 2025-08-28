"use client";

import { useEffect, useState } from "react";
import { JourneyStep, JourneyTracker } from "journey-tracker-component";
import { Provider } from "../../components/ui/provider";

export default function TrackMyApplication() {
  const [steps, setSteps] = useState<JourneyStep[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/War/GetJourney?reqno=SPFC0001`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const mapped: JourneyStep[] = data.map((item: any) => ({
          label: item.remarks?.replace(/\[.*?\]\s*-\s*/g, "") ?? item.approver,
          status: item.status.trim().toLowerCase(),
          dateTime:
            item.approvedDate && item.approvedDate !== "1900-01-01T00:00:00"
              ? new Date(item.approvedDate).toLocaleString()
              : undefined,
        }));
        setSteps(mapped);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error)
    return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!steps) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Track My Application</h1>
      <Provider>
        <JourneyTracker steps={steps} />
      </Provider>
    </div>
  );
}
