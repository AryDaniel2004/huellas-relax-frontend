import React from "react";
import { Button } from "../ui/button";

export function ServiceCard({ name, description, price }: any) {
  return (
    <div className="bg-white shadow rounded-lg p-6 text-center">
      <h2 className="text-xl font-semibold text-primary mb-2">{name}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="font-bold text-lg text-primary mb-4">Q{price?.toFixed(2)}</p>
      <Button variant="primary">Reservar</Button>
    </div>
  );
}
