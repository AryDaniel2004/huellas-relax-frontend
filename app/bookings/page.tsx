"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import NewBookingModal from "@/components/modals/NewBookingModal";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import PaymentModal from "@/components/modals/PaymentModal";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [deleteBooking, setDeleteBooking] = useState<any | null>(null);
  const [payingBooking, setPayingBooking] = useState<any | null>(null);

  async function fetchBookings() {
    try {
      const { data } = await api.get("/bookings/my");
      setBookings(data || []);
    } catch (err) {
      console.error("❌ Error al cargar reservas:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteBooking) return;
    try {
      await api.delete(`/bookings/${deleteBooking.id}`);
      setDeleteBooking(null);
      await fetchBookings();
    } catch (err) {
      console.error("❌ Error al eliminar reserva:", err);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">
        Cargando tus reservas...
      </p>
    );

  return (
    <main className="py-16 px-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-600 mb-10 text-center">
        Mis Reservas 🏨
      </h1>

      <div className="grid gap-6 max-w-3xl mx-auto">
        {bookings.map((r, index) => (
          <div
            key={`${r.id}-${index}`}
            className="relative bg-white shadow rounded-lg p-6 border border-gray-200"
          >
            {/* 🔹 Solo mostrar botones si está PENDING */}
            {r.status === "PENDING" && (
              <div className="absolute top-3 right-3 flex gap-3">
                <button
                  onClick={() => setPayingBooking(r)}
                  className="text-green-600 hover:text-green-800 font-semibold"
                >
                  💳 Pagar
                </button>
                <button
                  onClick={() => setDeleteBooking(r)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  🗑️ Eliminar
                </button>
              </div>
            )}

            {/* 🔹 Título y datos */}
            <h2 className="text-lg font-semibold text-primary">
              Reserva #{r.id.slice(0, 8).toUpperCase()}
            </h2>
            <p>
              <strong>Fechas:</strong> {r.start_date} → {r.end_date}
            </p>

            {/* 🔹 Estado visual */}
            <p>
              <strong>Estado:</strong>{" "}
              <span
                className={`${
                  r.status === "CONFIRMED"
                    ? "text-green-600"
                    : r.status === "CANCELLED"
                    ? "text-red-600"
                    : "text-yellow-600"
                } font-semibold`}
              >
                {r.status === "CONFIRMED" ? "✅ CONFIRMED" : r.status}
              </span>
            </p>

            <p>
              <strong>Total:</strong> Q{Number(r.total || 0).toFixed(2)}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Creada: {new Date(r.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}

        {/* Nueva reserva */}
        <button
          onClick={() => setShowNewModal(true)}
          className="border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center w-full h-32 text-gray-600 hover:bg-gray-50 hover:border-blue-500 transition"
        >
          <span className="text-4xl font-bold">+</span>
          <span className="text-sm font-semibold mt-2">RESERVA NUEVA</span>
        </button>
      </div>

      {/* Modales */}
      {showNewModal && (
        <NewBookingModal
          onClose={() => setShowNewModal(false)}
          onSuccess={fetchBookings}
        />
      )}

      {deleteBooking && (
        <DeleteConfirmModal
          petName={`la reserva #${deleteBooking.id
            .slice(0, 8)
            .toUpperCase()}`}
          onCancel={() => setDeleteBooking(null)}
          onConfirm={handleDelete}
        />
      )}

      {payingBooking && (
        <PaymentModal
          bookingId={payingBooking.id}
          onClose={() => setPayingBooking(null)}
          onSuccess={() => {
            // 🔹 Cambia el estado visualmente a CONFIRMED
            setBookings((prev) =>
              prev.map((b) =>
                b.id === payingBooking.id
                  ? { ...b, status: "CONFIRMED" }
                  : b
              )
            );

            // 🔹 Cierra el modal
            setPayingBooking(null);
          }}
        />
      )}
    </main>
  );
}
