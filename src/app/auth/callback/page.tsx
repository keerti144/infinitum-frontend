"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import axios from "axios";
import { BACKEND_URL } from "../../../../production.config";

const AuthCallback = () => {
  const router = useRouter();
  const { setAuthState } = useAuth();
  const [processing, setProcessing] = useState(false);

  interface AuthResponse {
    token: string;
  }

  interface ErrorResponse {
    message?: string;
  }

  useEffect(() => {
    if (processing) return; // Prevent multiple API calls
    setProcessing(true);

    const extractAuthCode = () => {
      if (typeof window !== "undefined") {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get("code");
      }
      return null;
    };

    const exchangeCodeForToken = async (code: string) => {
      try {
        const response = await axios.post<AuthResponse>(
          `${BACKEND_URL}/api/auth/callback`,
          { code },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        // Store token
        localStorage.setItem("token", response.data.token);
        await setAuthState(response.data.token);

        // ✅ Remove code from URL
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);

        router.push("/dashboard");
      } catch (err: unknown) {
        console.error("Google login failed:", err);

        if (typeof err === "object" && err !== null && "response" in err) {
          const errorResponse = (err as { response?: { status?: number; data?: unknown } }).response;

          if (errorResponse?.status === 404) {
            const data = errorResponse.data as ErrorResponse & { user?: { email: string; name: string; roll_no: string } };

            if (data?.message === "Student not found" && data.user) {
              console.warn("Student not found, redirecting to register...");

              const queryParams = new URLSearchParams({
                showForm: "true",
                email: data.user.email,
                name: data.user.name,
                roll_no: data.user.roll_no,
              }).toString();

              router.push(`/register?${queryParams}`);
              return;
            }
          }
        }

        router.push("/login");
      }
    };

    const authCode = extractAuthCode();
    if (authCode) {
      exchangeCodeForToken(authCode);
    } else {
      console.error("Authorization code not found in URL");
      router.push("/login");
    }
  }, [router, setAuthState, processing]);

  return <h2>Processing login...</h2>;
};

export default AuthCallback;
