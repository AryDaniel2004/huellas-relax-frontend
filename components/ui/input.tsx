import React from "react";

export function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-primary focus:ring focus:ring-primary/30 outline-none transition"
    />
  );
}
