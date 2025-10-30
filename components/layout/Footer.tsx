export function Footer() {
  return (
    <footer className="bg-slate-100 border-t py-6 mt-10 text-center text-gray-600">
      <p>
        © {new Date().getFullYear()} <strong>Huellas & Relax</strong>. Todos los
        derechos reservados.
      </p>
      <p className="text-sm mt-1">Hecho con 🐾 y cuidado para tus mascotas.</p>
    </footer>
  );
}
