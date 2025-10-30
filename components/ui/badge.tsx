import React from "react";
import clsx from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
  const styles = {
    default: "bg-primary text-white",
    outline: "border border-primary text-primary",
  };
  return <span className={clsx(base, styles[variant], className)}>{children}</span>;
}
