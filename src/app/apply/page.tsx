'use client';

import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ApplyAsPlanholder() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    lpano: '',
    firstName: '',
    lastName: '',
    birthdate: '',
  });
  const reqNo = 'SPFC0001';
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { lpano, firstName, lastName, birthdate } = formData;
    if (!lpano || !firstName || !lastName || !birthdate) {
      alert('Please fill out all fields.');
      return;
    }
    dialogRef.current?.showModal();
  };

  const handleConfirm = () => {
    dialogRef.current?.close();
    router.push(`/track?reqno=${encodeURIComponent(reqNo)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to St Peter</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* LPANo label */}
        <div className="mb-4">
          <label htmlFor="lpano" className="block text-sm font-medium text-gray-700">
            LPANo
          </label>
          <input
            type="text"
            id="lpano"
            name="lpano"
            value={formData.lpano}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md"
          />
        </div>

        {/* first name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md"
          />
        </div>

        {/* last name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md"
          />
        </div>

        {/* birthdate */}
        <div className="mb-4">
          <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md mt-4"
        >
          Submit Application
        </button>
      </form>

      <dialog
        ref={dialogRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 border-none shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Application submitted</h2>
        <p className="mb-6">
          Your application was successfully submitted. Your request no is <strong>{reqNo}</strong>.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => dialogRef.current?.close()}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Track Application
          </button>
        </div>
      </dialog>
    </div>
  );
}
