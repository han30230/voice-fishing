import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { StickyEmergencyBar } from "@/components/site/sticky-emergency-bar";

export function SiteShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 md:pb-12 md:pt-10">
        {children}
      </main>
      <SiteFooter />
      <StickyEmergencyBar />
    </div>
  );
}

