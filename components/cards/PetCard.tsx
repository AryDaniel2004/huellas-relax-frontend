import React from "react";

export function PetCard({ pet }: any) {
  return (
    <div className="bg-white shadow rounded-lg p-6 text-center">
      <h2 className="text-xl font-semibold mb-2 text-primary">{pet.name}</h2>
      <p className="text-gray-600">{pet.breed}</p>
      <p className="text-gray-500 text-sm">{pet.age} años</p>
    </div>
  );
}
