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
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-8 md:pb-16 md:pt-12">
        {children}
      </main>
      <SiteFooter />
      <StickyEmergencyBar />
    </div>
  );
}

