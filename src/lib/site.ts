export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_URL?.trim() ||
    "";

  if (!raw) return new URL("http://localhost:3000");
  if (raw.startsWith("http://") || raw.startsWith("https://")) return new URL(raw);
  return new URL(`https://${raw}`);
}
