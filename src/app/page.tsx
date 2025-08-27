'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleApplyNow = () => {
    router.push('/apply');
  };

  const handleTrackApplication = () => {
    router.push('/track');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">St Peter Loan Application</h1>

      <div className="flex space-x-4">
        <button
          onClick={handleApplyNow}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          aria-label="Apply for a new loan"
        >
          Apply Now
        </button>

        <button
          onClick={handleTrackApplication}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          aria-label="Track existing loan application"
        >
          Track My Application
        </button>
      </div>
    </div>
  );
}
