"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  interface AuthResponse {
    token: string;
  }

  interface ErrorResponse {
    message?: string;
  }

  useEffect(() => {
    const exchangeTokenForSession = async (
      access_token: string,
      provider_token: string
    ) => {
      try {
        const response = await axios.post<AuthResponse>(
          "https://infinitum-website.onrender.com/api/auth/callback",
          { access_token, provider_token },
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
              router.push("/register");
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

    const accessToken = searchParams.get("access_token");
    const providerToken = searchParams.get("provider_token");

    if (accessToken && providerToken) {
      exchangeTokenForSession(accessToken, providerToken);
    } else {
      console.error("Required tokens not found in URL");
      router.push("/login");
    }
  }, [router, searchParams]);

  return <h2>Processing login...</h2>;
};

export default AuthCallback;
