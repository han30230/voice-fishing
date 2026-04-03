"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, Shield, Siren, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/check", label: "1분 자가진단" },
  { href: "/emergency", label: "긴급 대응" },
  { href: "/scams", label: "유형 라이브러리" },
  { href: "/recovery", label: "피해 회복" },
  { href: "/evidence", label: "증거 정리" },
  { href: "/alerts", label: "경보" },
  { href: "/learn", label: "학습" },
  { href: "/family", label: "가족/어르신" },
  { href: "/help", label: "공식 도움" },
];

export function SiteHeader({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-50 border-b border-border/60 bg-surface/80 shadow-[0_1px_0_rgb(255_255_255/0.65)_inset] backdrop-blur-xl backdrop-saturate-150",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 md:py-3.5">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 rounded-2xl outline-none ring-brand/0 transition ring-offset-2 ring-offset-background focus-visible:ring-4 focus-visible:ring-brand/35"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-[#0a2d5c] text-white shadow-md shadow-brand/25 ring-1 ring-white/15">
            <Shield className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[16px] font-semibold tracking-tight text-foreground">
              안심콜
            </div>
            <div className="truncate text-[12px] font-medium text-muted-foreground">
              보이스피싱·스미싱 대응
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="주요 메뉴">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-[13px] font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-xl lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            <span className="sr-only">메뉴</span>
          </Button>

          <Button asChild variant="outline" size="sm" className="hidden rounded-xl sm:inline-flex">
            <Link href="/search">
              <Search className="h-4 w-4" aria-hidden />
              검색
            </Link>
          </Button>
          <Button asChild variant="danger" size="sm" className="rounded-xl shadow-md shadow-danger/20">
            <Link href="/emergency" aria-label="긴급 대응으로 이동">
              <Siren className="h-4 w-4" aria-hidden />
              지금 긴급
            </Link>
          </Button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-[60] flex flex-col bg-surface lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="모바일 메뉴"
        >
          <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
            <span className="text-[15px] font-semibold">메뉴</span>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl hover:bg-muted"
              onClick={() => setOpen(false)}
              aria-label="닫기"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 pb-8 pt-2">
            <div className="mx-auto flex max-w-lg flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3.5 text-[16px] font-semibold text-foreground transition hover:bg-muted active:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/search"
                className="rounded-2xl px-4 py-3.5 text-[16px] font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                검색
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
