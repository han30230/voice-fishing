"use client";

import { Check, Copy, ExternalLink, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type PhoneCopyRowProps = {
  label: string;
  phone?: string;
  className?: string;
};

export function PhoneCopyRow({ label, phone, className }: PhoneCopyRowProps) {
  const [copied, setCopied] = useState(false);
  const trimmed = phone?.trim();
  const canTel = trimmed && /^[\d+*#]+$/.test(trimmed.replace(/\s/g, ""));

  async function copy() {
    if (!trimmed) return;
    try {
      await navigator.clipboard.writeText(trimmed);
      setCopied(true);
      trackEvent("help.phone_copy", { label });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  if (!trimmed) {
    return (
      <div className={cn("rounded-xl border border-dashed border-border px-3 py-2 text-[13px] text-muted-foreground", className)}>
        {label}: 공식 사이트에서 최신 번호를 확인하세요.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-surface px-3 py-2",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
        <div className="min-w-0">
          <div className="text-[12px] text-muted-foreground">{label}</div>
          <div className="font-mono text-[15px] font-semibold tracking-tight text-foreground">
            {trimmed}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-xl"
          onClick={copy}
          aria-label={`${label} 번호 복사`}
        >
          {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          복사
        </Button>
        {canTel ? (
          <Button asChild variant="primary" size="sm" className="rounded-xl">
            <a href={`tel:${trimmed.replace(/\s/g, "")}`} aria-label={`${label} 전화 걸기`}>
              <Phone className="h-4 w-4" aria-hidden />
              전화
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

type OutboundLinkButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function OutboundLinkButton({ href, children, className }: OutboundLinkButtonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Button asChild variant="outline" className="w-full rounded-2xl justify-center gap-2">
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("help.outbound_click", { href })}>
          {children}
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
        </a>
      </Button>
      <p className="text-[12px] leading-5 text-muted-foreground">
        외부 사이트로 이동합니다. 주소창 도메인이 공식 기관인지 확인하세요.
      </p>
    </div>
  );
}
