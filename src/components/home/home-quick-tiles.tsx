"use client";

import Link from "next/link";
import {
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
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tiles.map((t) => {
        const Icon = ICONS[t.icon] ?? BadgeAlert;
        return (
        <Card key={t.href} className="hover:border-ring/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-brand">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              {t.title}
            </CardTitle>
            <CardDescription>{t.desc}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild variant="outline" className="w-full rounded-xl">
              <Link
                href={t.href}
                onClick={() => trackEvent("home.emergency_tile_click", { tileId: t.id, href: t.href })}
              >
                지금 5분 대응 보기
              </Link>
            </Button>
          </CardContent>
        </Card>
        );
      })}
    </div>
  );
}
