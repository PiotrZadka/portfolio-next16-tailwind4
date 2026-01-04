import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Piotr Zadka | Full-stack Developer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0b",
        backgroundImage:
          "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0b",
          padding: "40px 80px",
          borderRadius: "20px",
          border: "1px solid #27272a",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: "#e5e5e5",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          Piotr Zadka
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#14b8a6",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Full-stack Developer
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          React • Next.js • TypeScript • AI-Driven Productivity
        </div>
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    }
  );
}
