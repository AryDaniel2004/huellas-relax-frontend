import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  const base =
    "px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const styles = {
    primary: "bg-primary text-white hover:bg-blue-700 focus:ring-primary",
    outline:
      "border border-primary text-primary hover:bg-blue-50 focus:ring-primary",
  };

  return (
    <button className={clsx(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}
