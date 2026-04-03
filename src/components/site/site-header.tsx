"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, Shield, Siren, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navGroups } from "@/components/site/site-nav-config";
import { SITE_BRAND, SITE_TAGLINE_KO } from "@/lib/brand";
import { cn } from "@/lib/cn";

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
              {SITE_BRAND}
            </div>
            <div className="truncate text-[12px] font-medium text-muted-foreground">
              {SITE_TAGLINE_KO}
            </div>
          </div>
        </Link>

        {/* 데스크톱: 대분류 + 호버 드롭다운 (한 줄, 줄바꿈 최소화) */}
        <nav
          className="hidden items-center gap-0 lg:flex"
          aria-label="주요 메뉴"
        >
          {navGroups.map((group) => (
            <div key={group.id} className="group/nav relative">
              <button
                type="button"
                className="flex items-center gap-0.5 whitespace-nowrap rounded-xl px-2.5 py-2 text-[13px] font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
                aria-expanded="false"
                aria-haspopup="true"
              >
                {group.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
              </button>
              <div
                className={cn(
                  "invisible absolute left-0 top-full z-[70] min-w-[260px] w-max max-w-[min(100vw-2rem,320px)]",
                  "opacity-0 transition duration-150",
                  "pointer-events-none",
                  "group-hover/nav:visible group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto",
                  "focus-within:visible focus-within:opacity-100 focus-within:pointer-events-auto",
                )}
              >
                <div
                  className="overflow-hidden rounded-2xl border border-border/80 bg-surface py-2 shadow-xl shadow-brand/10 ring-1 ring-black/5"
                  role="menu"
                >
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-left transition hover:bg-muted/80"
                      role="menuitem"
                    >
                      <div className="text-[13px] font-semibold text-foreground">{item.label}</div>
                      {item.description ? (
                        <div className="mt-0.5 text-[12px] leading-snug text-muted-foreground">
                          {item.description}
                        </div>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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

      {open
        ? createPortal(
            <div
              id="mobile-nav"
              className="fixed inset-0 z-[10000] flex justify-end bg-black/60 backdrop-blur-sm lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="모바일 메뉴"
              onClick={() => setOpen(false)}
            >
              <div
                className="flex h-full min-h-0 w-[min(92vw,440px)] max-w-[100vw] flex-col border-l border-border/60 bg-surface shadow-2xl shadow-black/25"
                style={{
                  paddingTop: "max(0.5rem, env(safe-area-inset-top))",
                  paddingBottom: "env(safe-area-inset-bottom)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex shrink-0 items-center justify-between border-b border-border/70 px-4 py-3.5">
                  <span className="text-[16px] font-semibold text-foreground">메뉴</span>
                  <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-xl hover:bg-muted"
                    onClick={() => setOpen(false)}
                    aria-label="닫기"
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                </div>
                <nav
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-2 [-webkit-overflow-scrolling:touch]"
                  aria-label="모바일 주요 메뉴"
                >
                  <div className="flex flex-col gap-5 pb-4">
                    {navGroups.map((group) => (
                      <section key={group.id} aria-labelledby={`mobile-nav-${group.id}`}>
                        <h3
                          id={`mobile-nav-${group.id}`}
                          className="mb-2 px-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground"
                        >
                          {group.label}
                        </h3>
                        <div className="overflow-hidden rounded-2xl border border-border/70 bg-background">
                          <ul className="divide-y divide-border/50">
                            {group.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className="block px-4 py-3.5 text-[15px] transition hover:bg-muted active:bg-muted/80"
                                  onClick={() => setOpen(false)}
                                >
                                  <div className="font-semibold leading-snug text-foreground">
                                    {item.label}
                                  </div>
                                  {item.description ? (
                                    <div className="mt-1 text-[13px] leading-snug text-muted-foreground">
                                      {item.description}
                                    </div>
                                  ) : null}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </section>
                    ))}
                    <div className="rounded-2xl border border-border/70 bg-muted/40">
                      <Link
                        href="/search"
                        className="block px-4 py-3.5 text-[15px] font-semibold text-foreground transition hover:bg-muted"
                        onClick={() => setOpen(false)}
                      >
                        검색
                      </Link>
                    </div>
                  </div>
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
