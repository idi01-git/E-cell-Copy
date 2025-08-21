"use client";

export default function GlobalError({ error, reset }) {
  if (process.env.NODE_ENV !== "production") {
    // Surface the error in dev for easier debugging
    // eslint-disable-next-line no-console
    console.error("Global error:", error);
  }

  return (
    <html>
      <body>
        <div style={{ padding: 24 }}>
          <h2>Something went wrong</h2>
          {process.env.NODE_ENV !== "production" && (
            <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>
              {String(error?.message || error)}
            </pre>
          )}
          <button
            type="button"
            onClick={() => {
              try {
                reset?.();
              } catch {
                // no-op
              }
            }}
            style={{
              marginTop: 16,
              padding: "8px 12px",
              border: "1px solid #444",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
