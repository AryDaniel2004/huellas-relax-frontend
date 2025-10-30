"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function PaymentsPage() {
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const handlePay = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/payments/intent");
      setConfirmation(`Pago confirmado con ID: ${data.paymentId || "N/A"}`);
    } catch {
      setConfirmation("Error procesando el pago ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center py-24 px-6 text-center">
      <h1 className="text-3xl font-bold text-primary mb-6">Procesar Pago 💳</h1>
      <button
        onClick={handlePay}
        disabled={loading}
        className="bg-primary text-white px-8 py-3 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Procesando..." : "Pagar reserva"}
      </button>
      {confirmation && <p className="mt-6 text-gray-700">{confirmation}</p>}
    </main>
  );
}
