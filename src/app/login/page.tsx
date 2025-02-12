"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import "@/app/login/animations.css";

export default function LoginPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Roll Number:", rollNumber, "Password:", password);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="background-container">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="dot"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 3}s`,
          }}
          ></div>
        ))}
      </div>

      {/* Content Box */}
      <div className="relative z-10 bg-zinc-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Roll Number Field */}
          <div>
            <label className="text-gray-400 block mb-1">Roll Number</label>
            <Input 
              type="text" 
              placeholder="Enter your roll number" 
              value={rollNumber} 
              onChange={(e) => setRollNumber(e.target.value)} 
              className="w-full text-white bg-gray-800 border-gray-600 focus:border-pink-500 focus:ring-pink-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="text-gray-400 block mb-1">Password</label>
            <Input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full text-white bg-gray-800 border-gray-600 focus:border-pink-500 focus:ring-pink-500"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">Login</Button>
        </form>

        {/* Register Link */}
        <p className="text-gray-400 text-center mt-4">
          Haven't registered yet?{" "}
          <Link href="/register" className="text-pink-500 hover:underline">
            Register here
          </Link>
        </p>

        {/* Back to Home Button */}
        <Button asChild className="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
