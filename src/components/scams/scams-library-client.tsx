"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ScamScenario } from "@/schemas/domain";

export function ScamsLibraryClient({ scenarios }: { scenarios: ScamScenario[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set(scenarios.map((s) => s.category));
    return ["all", ...Array.from(set).sort()];
  }, [scenarios]);

  const filtered = useMemo(() => {
    const nq = q.trim().toLowerCase();
    return scenarios.filter((s) => {
      if (cat !== "all" && s.category !== cat) return false;
      if (!nq) return true;
      const hay = `${s.title} ${s.shortSummary} ${s.category} ${s.commonScripts.join(" ")}`.toLowerCase();
      return hay.includes(nq);
    });
  }, [scenarios, q, cat]);

  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, ScamScenario[]>>((acc, s) => {
      acc[s.category] ??= [];
      acc[s.category]!.push(s);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="scam-q">검색</Label>
          <Input
            id="scam-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="제목, 요약, 멘트…"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="scam-cat">카테고리</Label>
          <select
            id="scam-cat"
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[15px] shadow-sm outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "전체" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-[13px] text-muted-foreground">
        {filtered.length}개 유형이 표시됩니다.
      </div>

      <div className="space-y-10">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-[16px] font-semibold">{category}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {items.map((s) => (
                <Card key={s.slug} className="hover:border-ring/60">
                  <CardHeader>
                    <CardTitle className="text-[16px]">{s.title}</CardTitle>
                    <CardDescription>{s.shortSummary}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link
                      className="text-[14px] font-semibold text-brand hover:underline"
                      href={`/scams/${s.slug}`}
                    >
                      상세 보기
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
