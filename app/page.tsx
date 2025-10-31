import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Huellas & Relax",
  description: "Hotel y cuidado integral para tus mascotas.",
};

export default function HomePage() {
  return (
    <main
      className="relative text-center py-20 px-6 min-h-[calc(100vh-150px)] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/img/happy-dogs-room.jpg')", 
      }}
    >
 
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />


      <div className="relative z-10 max-w-3xl mx-auto">
        <Image
          src="/assets/img/logo.png"
          alt="Huellas & Relax"
          width={150}
          height={150}
          className="mx-auto mb-6 drop-shadow-md"
        />

        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 drop-shadow-sm">
          Bienvenido a Huellas & Relax 🐾
        </h1>

        <p className="text-gray-700 font-medium mb-8">
          Un lugar seguro y lleno de amor para tus mascotas. Hospedaje y cuidado, en cada visita.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/services"
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition shadow-md"
          >
            Ver servicios
          </Link>
          <Link
            href="/bookings"
            className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-blue-50 transition shadow-sm"
          >
            Reservar ahora
          </Link>
        </div>
      </div>
    </main>
  );
}
