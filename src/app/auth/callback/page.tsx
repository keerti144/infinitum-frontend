"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthCallback = () => {
  const router = useRouter();

  interface AuthResponse {
    token: string;
  }

  interface ErrorResponse {
    message?: string;
  }

  useEffect(() => {
    const extractTokenFromHash = () => {
      if (typeof window !== "undefined") {
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        return hashParams.get("access_token");
      }
      return null;
    };

    const getUserEmailAndName = async (accessToken: string) => {
      try {
        const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const { email, name } = await response.json(); // Extract only email & name
        console.log("Email:", email);
        console.log("Name:", name);

        const rollNo = email.split('@')[0].substring(0, 5).toUpperCase();
        const year = new Date().getFullYear() - parseInt(rollNo.substring(0, 2));

        localStorage.setItem("roll_no", rollNo);
        localStorage.setItem("name", name);
        localStorage.setItem("year", year.toString());
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const exchangeTokenForSession = async (access_token: string) => {
      try {
        const response = await axios.post<AuthResponse>(
          "https://infinitum-website.onrender.com/api/auth/callback",
          { access_token },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      } catch (err: unknown) {
        if (typeof err === "object" && err !== null && "response" in err) {
          const errorResponse = (
            err as { response?: { status?: number; data?: unknown } }
          ).response;

          if (errorResponse?.status === 404) {
            const data = errorResponse.data as ErrorResponse;
            if (data?.message === "Student not found") {
              console.warn("Student not found, redirecting to register...");
              await getUserEmailAndName(access_token);
              router.push("/register?showForm=true");
              return;
            }
          }

          console.error(
            "Google login failed:",
            errorResponse?.data || "Unknown error"
          );
        } else {
          console.error("An unknown error occurred.", err);
        }
        router.push("/login");
      }
    };

    const accessToken = extractTokenFromHash();
    if (accessToken) {
      exchangeTokenForSession(accessToken);
    } else {
      console.error("Required tokens not found in URL");
      router.push("/login");
    }
  }, [router]);

  return <h2>Processing login...</h2>;
};

export default AuthCallback;