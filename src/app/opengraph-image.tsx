import { ImageResponse } from "next/og";

import { SITE_BRAND, SITE_TAGLINE_KO } from "@/lib/brand";

export const alt = `${SITE_BRAND} — ${SITE_TAGLINE_KO}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** 전체 한글 글리프 TTF — Mozilla UA로 요청 시 Google이 단일 파일을 반환 */
const NOTO_KR_TTF = {
  500: "https://fonts.gstatic.com/s/notosanskr/v39/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzztgyeLQ.ttf",
  600: "https://fonts.gstatic.com/s/notosanskr/v39/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzjQ1eLQ.ttf",
  700: "https://fonts.gstatic.com/s/notosanskr/v39/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzg01eLQ.ttf",
} as const;

export default async function OpenGraphImage() {
  const [font500, font600, font700] = await Promise.all([
    fetch(NOTO_KR_TTF[500]).then((r) => r.arrayBuffer()),
    fetch(NOTO_KR_TTF[600]).then((r) => r.arrayBuffer()),
    fetch(NOTO_KR_TTF[700]).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#f4f7fc",
          backgroundImage:
            "radial-gradient(1200px 600px at 50% -200px, rgb(15 61 122 / 0.09), transparent 55%), radial-gradient(800px 400px at 100% 0%, rgb(13 124 106 / 0.06), transparent 50%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgb(15 61 122 / 0.14), transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -72,
            bottom: -72,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgb(13 124 106 / 0.12), transparent 65%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 1040,
            minHeight: 500,
            padding: "52px 56px",
            borderRadius: 32,
            border: "1px solid rgb(211 222 239 / 0.95)",
            backgroundColor: "#ffffff",
            boxShadow: "0 20px 60px -24px rgb(15 61 122 / 0.35), 0 0 0 1px rgb(255 255 255 / 0.6)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-start",
              padding: "10px 18px",
              borderRadius: 9999,
              border: "1px solid rgb(15 61 122 / 0.15)",
              backgroundColor: "rgb(232 238 248 / 0.85)",
              color: "#0f3d7a",
              fontSize: 22,
              fontWeight: 600,
              fontFamily: '"Noto Sans KR", sans-serif',
            }}
          >
            당황하지 마세요 · 지금부터 함께합니다
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#0f3d7a",
              fontFamily: '"Noto Sans KR", sans-serif',
            }}
          >
            {SITE_BRAND}
          </div>

          <div
            style={{
              marginTop: 20,
              fontSize: 38,
              fontWeight: 700,
              lineHeight: 1.25,
              color: "#0a1020",
              fontFamily: '"Noto Sans KR", sans-serif',
            }}
          >
            보이스피싱·스미싱이 의심될 때,
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.2,
              fontFamily: '"Noto Sans KR", sans-serif',
              backgroundImage:
                "linear-gradient(90deg, #0f3d7a 0%, #0f5c8c 52%, #0d7c6a 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            지금 바로 확인하고 대응하세요.
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              fontWeight: 600,
              color: "#4a5b78",
              lineHeight: 1.45,
              fontFamily: '"Noto Sans KR", sans-serif',
            }}
          >
            {SITE_TAGLINE_KO}
          </div>

          <div style={{ flex: 1 }} />

          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "rgb(74 91 120 / 0.85)",
              fontFamily: '"Noto Sans KR", sans-serif',
            }}
          >
            voiceguard.site
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans KR", data: font500, style: "normal", weight: 500 },
        { name: "Noto Sans KR", data: font600, style: "normal", weight: 600 },
        { name: "Noto Sans KR", data: font700, style: "normal", weight: 700 },
      ],
    },
  );
}
