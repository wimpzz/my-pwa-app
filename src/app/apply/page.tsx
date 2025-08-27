"use client";

import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";

export default function ApplyAsPlanholder() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    lpano: "",
    firstName: "",
    lastName: "",
    birthdate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation example
    if (
      !formData.lpano ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.birthdate
    ) {
      alert("Please fill out all fields.");
      return;
    }

    console.log("Form Submitted:", formData);

    // Redirect to /track after submit
    router.push("/track");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Welcome to St Peter
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label
            htmlFor="lpano"
            className="block text-sm font-medium text-gray-700"
          >
            LPANO:
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

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name:
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

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name:
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

        <div className="mb-4">
          <label
            htmlFor="birthdate"
            className="block text-sm font-medium text-gray-700"
          >
            Birthdate:
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
    </div>
  );
}
