"use client";

import Link from "next/link";
import { PhoneCall, Siren, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

export function StickyEmergencyBar() {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 px-3 py-3">
        <Button asChild variant="danger" className="h-12 rounded-2xl">
          <Link href="/emergency">
            <Siren className="h-4 w-4" aria-hidden />
            긴급
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-12 rounded-2xl">
          <Link href="/check">
            <PhoneCall className="h-4 w-4" aria-hidden />
            진단
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-12 rounded-2xl">
          <Link href="/evidence">
            <FileText className="h-4 w-4" aria-hidden />
            증거
          </Link>
        </Button>
      </div>
    </div>
  );
}

