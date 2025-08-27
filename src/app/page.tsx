"use client";

import { useState } from "react";
import React from "react";
import { JourneyStep, JourneyTracker } from "journey-tracker-component";
import { Provider } from "@/components/ui/provider";


export const sampleSteps: JourneyStep[] = [
  {
    label: "Application Submitted",
    status: "completed",
    dateTime: new Date().toLocaleString(), // Use current time as dateTime
  },
  {
    label: "Application Under Review",
    status: "pending",
  },
  { label: "Approved", status: "pending" },
];

export default function TrackMyApplication() {
  const [steps] = useState(sampleSteps);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-2">
      <h1 className="font-xxl font-semibold text-gray-800 mb-6">
        Track My Application
      </h1>
      <Provider>
        <JourneyTracker steps={steps} />
      </Provider>
    </div>
  );
}
