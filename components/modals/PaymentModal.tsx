"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { api } from "@/lib/api";

const stripePromise = loadStripe(
  "pk_test_51SCvAFBIKU6YNWqDxJAsx7t3R1nye2Z0AKPMQpgue36vx3xt0VWuk8KNA9xAXFR18pyLVP7RlX6PB7Y5bCpFVDxW003FyHgpV4"
);

export default function PaymentModal({ bookingId, onClose, onSuccess }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
          💳 Pago de Reserva
        </h2>
        <Elements stripe={stripePromise}>
          <PaymentForm
            bookingId={bookingId}
            onClose={onClose}
            onSuccess={onSuccess}
          />
        </Elements>
      </div>
    </div>
  );
}

function PaymentForm({ bookingId, onClose, onSuccess }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      console.log("📦 bookingId enviado al backend:", bookingId);

      if (!bookingId || bookingId.length < 10) {
        alert("❌ ID de reserva no válido.");
        setLoading(false);
        return;
      }

      console.log("🔗 URL base del backend:", api.defaults.baseURL);

      // 🔹 Crear PaymentIntent en el backend
      const { data } = await api.post("/payments/intent", {
        booking_id: bookingId,
      });

      console.log("✅ Respuesta del backend (intent creado):", data);

      const { client_secret } = data;
      if (!client_secret) {
        throw new Error("No se recibió client_secret desde el backend");
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("No se encontró el elemento de tarjeta.");
      }

      // 🔹 Confirmar el pago con Stripe
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (error) {
        console.error("❌ Error de Stripe:", error);
        alert("❌ Error al procesar el pago: " + error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        alert("✅ Pago completado correctamente");

        // 🔹 Actualizar estado en la base de datos a CONFIRMED
        try {
          await api.patch(`/bookings/${bookingId}/status`, {
            status: "CONFIRMED",
          });
          console.log("✅ Estado actualizado en la BD: CONFIRMED");
        } catch (err) {
          console.error("⚠️ Error actualizando estado en la BD:", err);
        }

        // 🔹 Refrescar la vista y cerrar modal
        onSuccess();
        onClose();
      } else {
        console.warn("⚠️ Estado inesperado:", paymentIntent?.status);
        alert("El pago no se completó correctamente.");
      }
    } catch (err) {
      console.error("❌ Error procesando pago:", err);
      alert("Error interno al procesar el pago. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="border rounded-md p-3 mb-4 bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#a0aec0" },
              },
            },
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Procesando..." : "Pagar"}
        </button>
      </div>
    </form>
  );
}
