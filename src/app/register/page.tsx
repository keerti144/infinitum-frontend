"use client"
import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FormField from "./FormField"
import './animation.css'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    department: '',
    year: '1', // Change to string
    phnNo: '',
    password: '',
    source: '', // New field for "How did you hear about us?"
  });

  const [loading, setLoading] = useState(false); // To show loading state
  const [message, setMessage] = useState(''); // To show success or error message

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Reset any previous message

    try {
      // Simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success: handle successful registration
      setMessage('Registration successful! Please login.');
    } catch (error) {
      // Handle unexpected errors
      setMessage('Network error, please try again later.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Dark Complex Background with animated #fc1464 */}
      <div className="absolute inset-0 animate-background-pulse">
        {/* Gradient with #fc1464 blended into the dark tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3e3e3e] to-[#fc1464] opacity-80 animate-gradient"></div>

        {/* Noise overlay effect */}
        <div className="absolute inset-0 bg-noise opacity-15 animate-noise"></div>

        {/* Overlay effect with blur */}
        <div className="absolute inset-0 bg-opacity-20 backdrop-blur-xl animate-blur"></div>
      </div>

      {/* Main form container */}
      <div className="relative z-10 bg-zinc-900 p-8 rounded-lg shadow-xl max-w-md w-full space-y-6 animate__animated animate__fadeIn mt-16 md:mt-24">
        <h1 className="form-title text-4xl font-extrabold text-white text-center">
          Register for the Event
        </h1>

        {message && (
          <div className="text-white text-center mb-4">
            <p>{message}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField label="Full Name" name="name" value={formData.name} handleChange={handleChange} placeholder="Enter your full name" />
          <FormField label="Roll Number" name="rollNo" value={formData.rollNo} handleChange={handleChange} placeholder="Enter your roll number" />
          <FormField label="Department" name="department" value={formData.department} handleChange={handleChange} placeholder="Enter your department" />
          <FormField label="Year" name="year" value={formData.year} handleChange={handleChange} placeholder="Enter your year of study" />
          <FormField label="Phone Number" name="phnNo" value={formData.phnNo} handleChange={handleChange} placeholder="Enter your phone number" />
          <FormField label="Password" name="password" value={formData.password} handleChange={handleChange} placeholder="Enter your password" type="password" />

          {/* New dropdown for "How did you hear about us?" */}
          <div className="flex flex-col">
            <label className="text-white mb-2">How did you hear about us?</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="form-input bg-zinc-800 text-white p-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-[#fc1464] transition duration-300"
            >
              <option value="">Select an option</option>
              <option value="Social Media">Social Media</option>
              <option value="Friends">Friends</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit/Register Button */}
          <button
            type="submit"
            className="form-button w-full mt-4 px-6 py-3 rounded-md bg-[#fc1464] text-white text-lg font-semibold hover:bg-[#f41d72] focus:outline-none focus:ring-4 focus:ring-[#fc1464] transition duration-300 scale-100 hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}