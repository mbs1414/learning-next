"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Something went wrong 😢</h2>
      <p>{error.message}</p>

      <button
        onClick={() => reset()} // reset() tries to re-render the route
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          border: "none",
          background: "#0070f3",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
