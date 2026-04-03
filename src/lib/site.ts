/**
 * canonical·metadataBase·OG 절대 URL용.
 * Vercel 프로덕션에서 VERCEL_URL(*.vercel.app)만 쓰면 카카오 등 OG 미리보기 도메인이 실제 서비스 URL과 어긋날 수 있어,
 * NEXT_PUBLIC_SITE_URL이 없을 때는 프로덕션을 www.voiceguard.site 로 둡니다.
 */
export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    if (explicit.startsWith("http://") || explicit.startsWith("https://")) return new URL(explicit);
    return new URL(`https://${explicit}`);
  }
  if (process.env.VERCEL_ENV === "production") {
    return new URL("https://www.voiceguard.site");
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);
  if (process.env.NODE_ENV === "production") {
    return new URL("https://www.voiceguard.site");
  }
  return new URL("http://localhost:3000");
}
