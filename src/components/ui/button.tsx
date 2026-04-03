import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white shadow-sm hover:bg-brand/90 focus-visible:ring-brand/35",
  secondary:
    "bg-muted text-foreground hover:bg-muted/80 focus-visible:ring-ring/40",
  outline:
    "border border-border bg-background hover:bg-muted/60 focus-visible:ring-ring/40",
  ghost: "hover:bg-muted/60 focus-visible:ring-ring/40",
  danger:
    "bg-danger text-white shadow-sm hover:bg-danger/90 focus-visible:ring-danger/35",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-[15px]",
  lg: "h-14 px-5 text-[17px]",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      asChild,
      variant = "primary",
      size = "md",
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={type ?? (asChild ? undefined : "button")}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50",
          "active:translate-y-[0.5px]",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

