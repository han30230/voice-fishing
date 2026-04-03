"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeAlert,
  Landmark,
  PhoneCall,
  ShieldAlert,
  Smartphone,
  Siren,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

const ICONS: Record<string, LucideIcon> = {
  phone: PhoneCall,
  badge: BadgeAlert,
  smartphone: Smartphone,
  siren: Siren,
  users: Users,
  landmark: Landmark,
  shield: ShieldAlert,
};

export function HomeQuickTiles({
  tiles,
}: {
  tiles: { id: string; title: string; desc: string; href: string; icon: keyof typeof ICONS }[];
}) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tiles.map((t) => {
        const Icon = ICONS[t.icon] ?? BadgeAlert;
        return (
        <Card
          key={t.href}
          className="group border-border/70 hover:-translate-y-0.5 hover:border-brand/25"
        >
          <CardHeader className="space-y-3 pb-2">
            <CardTitle className="flex items-start gap-3 text-[16px] leading-snug">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-muted to-muted text-brand ring-1 ring-brand/10 transition group-hover:from-brand/10 group-hover:to-brand-muted">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="pt-0.5">{t.title}</span>
            </CardTitle>
            <CardDescription className="text-[14px] leading-relaxed">
              {t.desc}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild variant="outline" className="w-full rounded-2xl border-dashed group-hover:border-brand/35 group-hover:bg-brand-muted/40">
              <Link
                href={t.href}
                onClick={() => trackEvent("home.emergency_tile_click", { tileId: t.id, href: t.href })}
              >
                5분 대응 보기
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </Button>
          </CardContent>
        </Card>
        );
      })}
    </div>
  );
}
