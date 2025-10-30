import { api } from "./api";

export async function createPaymentIntent(amount: number) {
  const { data } = await api.post("/payments/intent", { amount });
  return data;
}

export async function confirmPayment(paymentId: string) {
  const { data } = await api.post("/payments/confirm", { paymentId });
  return data;
}
