import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FANOIR — Fandom, refined.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A1A1A",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Star */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          style={{ marginBottom: 16 }}
        >
          <line x1="20" y1="2" x2="20" y2="38" stroke="#C9A962" strokeWidth="1.5" />
          <line x1="2" y1="20" x2="38" y2="20" stroke="#C9A962" strokeWidth="1.5" />
          <line x1="7" y1="7" x2="33" y2="33" stroke="#C9A962" strokeWidth="1.5" />
          <line x1="33" y1="7" x2="7" y2="33" stroke="#C9A962" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="2.5" fill="#C9A962" />
        </svg>

        <div
          style={{
            fontSize: 72,
            letterSpacing: "0.3em",
            color: "#F8F8F8",
            fontWeight: 300,
            marginBottom: 24,
          }}
        >
          FANOIR
        </div>
        <div
          style={{
            fontSize: 24,
            letterSpacing: "0.15em",
            color: "#C9A962",
            marginBottom: 12,
          }}
        >
          Fandom, refined.
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#4A4A4A",
            letterSpacing: "0.1em",
          }}
        >
          세련되고 품격 있는 팬덤 굿즈 브랜드
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            width: 60,
            height: 1,
            backgroundColor: "#C9A962",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
