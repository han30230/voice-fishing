import { ImageResponse } from "next/og";

export const alt = "VoiceGuard — 보이스피싱·스미싱 대응 정보";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** 카카오·SNS 링크 미리보기용 — 한글은 시스템 폰트 대체로 깨질 수 있어 영문 위주(메타 태그에 한글 유지) */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0a2d5c 0%, #0f5c8c 48%, #0b1426 100%)",
          padding: 72,
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          />
          <span style={{ fontSize: 22, fontWeight: 600, opacity: 0.9 }}>voiceguard.site</span>
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          VoiceGuard
        </div>
        <div style={{ marginTop: 16, fontSize: 34, fontWeight: 600, opacity: 0.95 }}>
          Voice phishing · Smishing response hub
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 26,
            fontWeight: 500,
            opacity: 0.82,
            maxWidth: 920,
            lineHeight: 1.4,
          }}
        >
          Step-by-step guidance · Official reporting & support channels · Evidence tools
        </div>
      </div>
    ),
    { ...size },
  );
}
