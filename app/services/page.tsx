import Image from "next/image";

export const metadata = {
  title: "Nuestros Servicios | Huellas & Relax",
  description:
    "Descubre todo lo que ofrecemos para el bienestar y cuidado de tu mascota. Hospedaje, grooming, spa y más.",
};

export default function ServicesPage() {
  return (
    <main className="bg-gray-50 py-16">
      {/* ================= ENCABEZADO ================= */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Nuestros Servicios 🐾
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          En <strong>Huellas & Relax</strong> ofrecemos un espacio diseñado para
          que tu mascota se sienta cómoda, cuidada y feliz. 🐶🐱
        </p>
      </section>

      {/* ================= SERVICIOS ================= */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {/* Hospedaje */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <Image
            src="/assets/img/hotel-dogs.jpg"
            alt="Hospedaje para mascotas"
            width={400}
            height={300}
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              🏨 Hospedaje
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Habitaciones amplias, limpias y seguras con clima controlado.
              Atención 24/7 para que tu mascota descanse como en casa.
            </p>
          </div>
        </div>

        {/* Grooming */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <Image
            src="/assets/img/grooming.jpg"
            alt="Grooming"
            width={400}
            height={300}
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              ✂️ Grooming
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Corte, baño y cepillado profesional. Productos hipoalergénicos y
              técnicas suaves para el confort de tu mascota.
            </p>
          </div>
        </div>

        {/* Baño Básico */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <Image
            src="/assets/img/bath.jpg"
            alt="Baño básico para mascotas"
            width={400}
            height={300}
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              🚿 Baño Básico
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Limpieza completa con agua templada y shampoo hipoalergénico.
              Incluye secado, cepillado y revisión general para que tu mascota
              salga fresca, suave y feliz.
            </p>
          </div>
        </div>

        {/* Desparasitación */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <Image
            src="/assets/img/desparasitacion.jpg"
            alt="Desparasitación"
            width={400}
            height={300}
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              💊 Desparasitación
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Tratamiento preventivo y curativo con productos aprobados por
              veterinarios certificados.
            </p>
          </div>
        </div>

        {/* Área de juegos */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <Image
            src="/assets/img/playzone.jpg"
            alt="Área de juegos"
            width={400}
            height={300}
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              🐕 Área de Juegos
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Espacios amplios con juguetes, obstáculos y personal capacitado
              para mantener a tu mascota activa y feliz.
            </p>
          </div>
        </div>

        {/* Cuidado veterinario */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <Image
            src="/assets/img/vet-care.jpg"
            alt="Cuidado veterinario"
            width={400}
            height={300}
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              🩺 Cuidado Veterinario
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Supervisión médica constante y control de salud durante su
              estadía, garantizando el bienestar integral de tu mascota.
            </p>
          </div>
        </div>
      </div>

{/* ================= HABITACIONES ================= */}
<section className="mt-20 bg-white py-16">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-12">
    Habitaciones 🏠
  </h2>

  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
    {/* Habitación Pequeña */}
    <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <Image
        src="/assets/img/room-small.jpg"
        alt="Habitación pequeña para mascotas"
        width={400}
        height={300}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          🐾 Habitación Pequeña S-101
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Ideal para mascotas de hasta 10 kg. Espacio acogedor con cama
          individual, bebedero y ventilación natural.
        </p>
        <p className="text-lg font-bold text-blue-600">Q65.00 / noche</p>
      </div>
    </div>

    {/* Habitación Mediana */}
    <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <Image
        src="/assets/img/room-medium.jpg"
        alt="Habitación mediana para mascotas"
        width={400}
        height={300}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          🐕 Habitación Mediana M-201
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Perfecta para mascotas entre 10 y 25 kg. Cama amplia, juguetes,
          ventilador y control de temperatura.
        </p>
        <p className="text-lg font-bold text-blue-600">Q85.00 / noche</p>
      </div>
    </div>

    {/* Habitación Grande */}
    <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <Image
        src="/assets/img/room-large.jpg"
        alt="Habitación grande para mascotas"
        width={400}
        height={300}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          🐩 Habitación Grande L-301
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Ideal para razas grandes (hasta 60 kg). Espacio ventilado con
          área de descanso, zona de juegos y atención personalizada.
        </p>
        <p className="text-lg font-bold text-blue-600">Q115.00 / noche</p>
      </div>
    </div>

    {/* Habitación Familiar */}
    <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <Image
        src="/assets/img/room-family.jpg"
        alt="Habitación familiar para mascotas"
        width={400}
        height={300}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          🐾 Habitación Pequeña S-102
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Ideal para mascotas de hasta 10 kg. Espacio acogedor con cama
          individual, bebedero y ventilación natural.
        </p>
        <p className="text-lg font-bold text-blue-600">Q65.00 / noche</p>
      </div>
    </div>

    {/* Habitación VIP */}
    <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <Image
        src="/assets/img/room-vip.jpg"
        alt="Habitación VIP para mascotas"
        width={400}
        height={300}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          🐕 Habitación Mediana M-202
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          Perfecta para mascotas entre 10 y 25 kg. Cama amplia, juguetes,
          ventilador y control de temperatura.
        </p>
        <p className="text-lg font-bold text-blue-600">Q85.00 / noche</p>
      </div>
    </div>

    {/* Habitación Exterior */}
    <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <Image
        src="/assets/img/room-outdoor.jpg"
        alt="Habitación exterior para mascotas"
        width={400}
        height={300}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          🐩 Habitación Grande L-302
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
         Ideal para razas grandes (hasta 60 kg). Espacio ventilado con
          área de descanso, zona de juegos y atención personalizada.
        </p>
        <p className="text-lg font-bold text-blue-600">Q115.00 / noche</p>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}
