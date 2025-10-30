import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>{children}</div>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="border-b pb-2 mb-4">{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold text-primary">{children}</h2>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600 text-sm">{children}</p>;
}
