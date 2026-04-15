"use client";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export default function AuthCallback() {
  const { refreshUser } = useAuth();

  useEffect(() => {
    async function handleCallback() {
      // Supabase implicit flow returns tokens in the URL fragment (#access_token=...)
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const expiresIn = params.get("expires_in");

      if (accessToken && refreshToken) {
        // Send tokens to server to set httpOnly cookie
        try {
          await fetch("/api/auth/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ accessToken, refreshToken, expiresIn: Number(expiresIn) || 3600 }),
          });
          await refreshUser();
        } catch {}
      }

      // Clean the URL and redirect home
      window.location.replace("/");
    }

    handleCallback();
  }, [refreshUser]);

  return null;
}
