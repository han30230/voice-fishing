"use client";

import Link from "next/link";
import { PhoneCall, Siren, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

export function StickyEmergencyBar() {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="pointer-events-none mx-auto max-w-6xl px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
        <div className="pointer-events-auto overflow-hidden rounded-2xl border border-border/70 bg-surface/90 shadow-[0_-8px_30px_rgb(15_61_122/0.12)] backdrop-blur-xl">
          <div className="grid grid-cols-3 gap-px bg-border/60">
            <Button asChild variant="danger" className="h-14 rounded-none py-3 text-[15px] font-semibold shadow-none">
              <Link href="/emergency">
                <Siren className="h-5 w-5" aria-hidden />
                긴급
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-14 rounded-none border-0 bg-surface py-3 text-[15px] font-semibold text-foreground shadow-none hover:bg-muted"
            >
              <Link href="/check">
                <PhoneCall className="h-5 w-5 text-brand" aria-hidden />
                진단
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-14 rounded-none border-0 bg-surface py-3 text-[15px] font-semibold text-foreground shadow-none hover:bg-muted"
            >
              <Link href="/evidence">
                <FileText className="h-5 w-5 text-brand" aria-hidden />
                증거
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

