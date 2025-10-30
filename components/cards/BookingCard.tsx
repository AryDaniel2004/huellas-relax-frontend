import React from "react";

export function BookingCard({ booking }: any) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold text-primary mb-2">
        {booking.serviceName || "Servicio"}
      </h3>
      <p>Desde: {booking.start_date}</p>
      <p>Hasta: {booking.end_date}</p>
      <p className="mt-2 font-medium text-gray-700">Estado: {booking.status}</p>
    </div>
  );
}
