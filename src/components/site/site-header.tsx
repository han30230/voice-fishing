import Link from "next/link";
import { Shield, Siren, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/check", label: "1분 자가진단" },
  { href: "/emergency", label: "긴급 대응" },
  { href: "/scams", label: "유형 라이브러리" },
  { href: "/evidence", label: "증거 정리" },
  { href: "/family", label: "가족/어르신" },
  { href: "/help", label: "공식 도움" },
];

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "no-print sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white">
            <Shield className="h-5 w-5" aria-hidden />
          </span>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight">안심콜</div>
            <div className="text-[12px] text-muted-foreground">
              보이스피싱·스미싱 대응
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="주요 메뉴">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-[14px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/search">
              <Search className="h-4 w-4" aria-hidden />
              검색
            </Link>
          </Button>
          <Button asChild variant="danger">
            <Link href="/emergency" aria-label="긴급 대응으로 이동">
              <Siren className="h-4 w-4" aria-hidden />
              지금 긴급
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

