"use client";

import Link from "next/link";
import { Phone, ShieldAlert, Smartphone, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { emergencyQuickActions } from "@/data/emergency-quick-actions";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const icons = {
  phone: Phone,
  shield: ShieldAlert,
  smartphone: Smartphone,
  users: Users,
} as const;

export function EmergencyQuickStrip() {
  return (
    <section
      aria-labelledby="emergency-quick-heading"
      className={cn(
        "no-print sticky top-16 z-40 -mx-4 border-b border-danger/15 bg-gradient-to-b from-[#fff5f5] to-[#ffecec] px-4 py-3 shadow-sm md:static md:top-auto md:z-0 md:mx-0 md:rounded-[1.75rem] md:border md:border-danger/20 md:py-4 md:shadow-[0_12px_40px_-24px_rgb(220_38_38/0.25)]",
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h2 id="emergency-quick-heading" className="text-[14px] font-bold text-danger md:text-[15px]">
              초긴급 · 지금 가장 먼저 해야 할 일
            </h2>
            <p className="mt-0.5 text-[12px] leading-5 text-muted-foreground md:text-[13px]">
              아래 버튼은 <span className="font-medium text-foreground">행동 우선</span> 순서로
              모았습니다. 읽기 어렵다면 하나만 눌러도 됩니다.
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {emergencyQuickActions.map((a) => {
            const Icon = icons[a.iconName];
            const isExternal = a.external;
            const href = a.href;

            return (
              <Button
                key={a.id}
                asChild
                variant="danger"
                className="h-auto min-h-[52px] flex-col gap-1 rounded-2xl px-2 py-3 text-[13px] font-semibold leading-tight shadow-md shadow-danger/15 sm:min-h-[56px] sm:text-[14px]"
              >
                <Link
                  href={href}
                  {...(isExternal ? { target: "_self", rel: undefined } : {})}
                  onClick={() =>
                    trackEvent("home.emergency_strip_click", { actionId: a.id, href })
                  }
                  className="flex flex-col items-center justify-center gap-1 text-center"
                >
                  <Icon className="h-5 w-5 shrink-0 opacity-95" aria-hidden />
                  <span>{a.label}</span>
                  <span className="text-[10px] font-normal uppercase leading-tight text-white/85 sm:text-[11px]">
                    {a.shortHint}
                  </span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
