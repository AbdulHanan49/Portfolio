"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        background: "#030810",
        color: "#F0EEFF",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
        Something went wrong
      </h2>
      <p style={{ color: "rgba(240,238,255,0.5)", margin: 0, maxWidth: 400 }}>
        An unexpected error occurred. Try refreshing the page.
      </p>
      <button
        onClick={reset}
        style={{
          padding: "0.6rem 1.5rem",
          background: "linear-gradient(135deg,#562abd,#210C6E)",
          color: "#F0EEFF",
          border: "none",
          borderRadius: "0.75rem",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "0.9rem",
        }}
      >
        Try again
      </button>
    </div>
  );
}
