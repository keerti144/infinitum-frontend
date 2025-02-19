"use client";
import { useState, useEffect } from "react";
import FormField from "./FormField";
import "./animation.css";
import { useRouter, useSearchParams } from "next/navigation";

const BACKEND_URL = "https://infinitum-website.onrender.com";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    year: "1",
    phnNo: "",
    source: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
      return;
    }
    setShowForm(searchParams.get("showForm") === "true");
  }, [router, searchParams]);

  const handleGoogleRegister = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/google`);
      const data = await response.json();

      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        console.error("Failed to get auth URL:", data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Google Sign-in Error:", error.message);
      } else {
        console.error("Google Sign-in Error:", error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['name', 'rollNo', 'department', 'year', 'phnNo'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setMessage(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://infinitum-website.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            roll_no: formData.rollNo,
            department: formData.department,
            year: formData.year,
            phn_no: formData.phnNo,
            source: formData.source,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Please login.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setMessage(`Error: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage("Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 animate-background-pulse">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3e3e3e] to-[#fc1464] opacity-80 animate-gradient"></div>
        <div className="absolute inset-0 bg-noise opacity-15 animate-noise"></div>
        <div className="absolute inset-0 bg-opacity-20 backdrop-blur-xl animate-blur"></div>
      </div>

      <div className="relative z-10 bg-zinc-900/90 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-md w-full space-y-6 animate__animated animate__fadeIn mt-16 md:mt-24 md:max-w-sm overflow-y-auto max-h-[90vh]">
        <h1 className="form-title text-4xl font-extrabold text-white text-center mb-8">
          Register for the Event
        </h1>

        {message && (
          <div className="text-white text-center mb-4 p-3 bg-zinc-800 rounded-lg">
            <p>{message}</p>
          </div>
        )}

        {!showForm ? (
          <button
            onClick={handleGoogleRegister}
            className="w-full py-4 px-6 bg-white hover:bg-gray-100 text-gray-900 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-semibold">Continue with Google</span>
          </button>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormField
              label="Full Name *"
              name="name"
              value={formData.name}
              handleChange={handleChange}
              placeholder="Enter your full name"
            />
            <FormField
              label="Roll Number *"
              name="rollNo"
              value={formData.rollNo}
              handleChange={handleChange}
              placeholder="Enter your roll number"
            />
            <FormField
              label="Department *"
              name="department"
              value={formData.department}
              handleChange={handleChange}
              placeholder="Enter your department"
            />

            <div className="flex flex-col">
              <label className="text-white mb-2">Year *</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="form-input bg-zinc-800 text-white p-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-[#fc1464] transition duration-300"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <FormField
              label="Phone Number *"
              name="phnNo"
              value={formData.phnNo}
              handleChange={handleChange}
              placeholder="Enter your phone number"
            />

            <div className="flex flex-col mb-6">
              <label className="text-white mb-2">
                How did you hear about us?
              </label>
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

            <button
              type="submit"
              className="form-button w-full mt-4 px-8 py-4 rounded-md bg-[#fc1464] text-white text-lg font-semibold hover:bg-[#f41d72] focus:outline-none focus:ring-4 focus:ring-[#fc1464] transition duration-300 scale-100 hover:scale-105"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}