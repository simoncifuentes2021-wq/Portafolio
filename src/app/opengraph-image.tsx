import { ImageResponse } from "next/og";
export const alt = "Simón Cifuentes — Ideas claras. Software con intención.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#10110f",
        color: "#e8e9df",
        padding: "65px 76px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 19,
          color: "#a0a399",
        }}
      >
        <span>SIMÓN CIFUENTES / FULLSTACK DEVELOPER</span>
        <span>TEMUCO, CHILE ↗</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 66,
          fontSize: 80,
          fontWeight: 600,
          letterSpacing: "-4px",
          lineHeight: 1.1,
        }}
      >
        <span>Ideas claras.</span>
        <span>
          Software con <span style={{ color: "#d5ed86" }}>intención.</span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          paddingTop: 27,
          borderTop: "1px solid #ffffff35",
          justifyContent: "space-between",
          fontSize: 20,
          color: "#a0a399",
        }}
      >
        <span>React · Next.js · FastAPI · PostgreSQL</span>
        <span style={{ color: "#d5ed86" }}>Ingeniería con intención.</span>
      </div>
    </div>,
    size,
  );
}
