import type { ReactNode } from "react";
import { AlertTriangle, Calendar, BookOpen } from "lucide-react";

import { cn } from "@/lib/cn";

type TrustBlockProps = {
  className?: string;
  /** 비공식 사이트 고지 등 */
  variant?: "disclaimer" | "source" | "verified" | "policy";
  title?: string;
  children: ReactNode;
  verifiedAt?: string;
  sourceLabel?: string;
};

export function TrustBlock({
  className,
  variant = "disclaimer",
  title,
  children,
  verifiedAt,
  sourceLabel,
}: TrustBlockProps) {
  const styles =
    variant === "disclaimer"
      ? "border-amber-200/80 bg-amber-50/90 text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100"
      : variant === "source"
        ? "border-border bg-muted/50"
        : variant === "verified"
          ? "border-brand/20 bg-brand-muted/40"
          : "border-border bg-surface";

  const icon =
    variant === "disclaimer" ? (
      <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />
    ) : variant === "source" ? (
      <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
    ) : variant === "verified" ? (
      <Calendar className="h-4 w-4 shrink-0" aria-hidden />
    ) : null;

  return (
    <aside
      className={cn(
        "rounded-2xl border p-4 text-[13px] leading-6 text-muted-foreground",
        styles,
        className,
      )}
    >
      <div className="flex gap-2">
        {icon}
        <div className="min-w-0 space-y-1">
          {title ? <div className="font-semibold text-foreground">{title}</div> : null}
          {sourceLabel ? (
            <div className="text-[12px] text-muted-foreground">
              <span className="font-medium text-foreground">출처·기준: </span>
              {sourceLabel}
            </div>
          ) : null}
          {verifiedAt ? (
            <div className="flex items-center gap-1 text-[12px]">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              <span>마지막 확인일: {verifiedAt}</span>
            </div>
          ) : null}
          <div>{children}</div>
        </div>
      </div>
    </aside>
  );
}

export function NonGovernmentNotice({ className }: { className?: string }) {
  return (
    <TrustBlock
      className={className}
      variant="disclaimer"
      title="이 사이트는 공공기관이 아닙니다"
    >
      정부·경찰·검찰·금융기관을 사칭하지 않으며, 공식 절차를 대신하지 않습니다. 번호·환급·수사
      결과를 보장하지 않습니다. 위기 상황에서는 공식기관에 직접 확인하세요.
    </TrustBlock>
  );
}
