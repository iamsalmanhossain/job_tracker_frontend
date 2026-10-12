"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth.store";
import { isTokenExpired, getTokenRemainingTime, handleSessionExpired } from "@/lib/auth-utils";

/**
 * Global session watcher that continuously monitors JWT expiration.
 * Triggers automatic logout when session expires.
 */
export default function SessionWatcher() {
  const { token, isAuthenticated } = useAuthStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!isAuthenticated || !token) {
      return;
    }

    // 1. Immediate expiration check on mount or token update
    if (isTokenExpired(token)) {
      handleSessionExpired("Your session has expired. Please log in again.");
      return;
    }

    // 2. Set timer for the exact remaining lifetime of the token
    const remainingTime = getTokenRemainingTime(token);
    if (remainingTime > 0 && remainingTime < Infinity) {
      timerRef.current = setTimeout(() => {
        handleSessionExpired("Your session has expired. Please log in again.");
      }, remainingTime);
    }

    // 3. Tab visibility / window focus check (e.g. waking computer from sleep)
    const checkExpiration = () => {
      const currentToken = useAuthStore.getState().token;
      const currentAuth = useAuthStore.getState().isAuthenticated;
      if (currentAuth && currentToken && isTokenExpired(currentToken)) {
        handleSessionExpired("Your session has expired. Please log in again.");
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkExpiration();
      }
    };

    window.addEventListener("focus", checkExpiration);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 4. Periodic safety check every 30 seconds
    const interval = setInterval(checkExpiration, 30000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      clearInterval(interval);
      window.removeEventListener("focus", checkExpiration);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [token, isAuthenticated]);

  return null;
}
