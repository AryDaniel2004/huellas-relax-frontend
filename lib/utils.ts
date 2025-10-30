// Formatea dinero en Quetzales
export function formatCurrency(value: number): string {
  return `Q${value.toFixed(2)}`;
}

// Convierte una fecha ISO a formato legible
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-GT", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Devuelve true si el usuario tiene token activo
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
}
