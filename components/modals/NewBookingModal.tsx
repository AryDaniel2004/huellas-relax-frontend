"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Room {
  id: string;
  code: string;
  price: number;
  type: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
}

interface Pet {
  id: string;
  name: string;
  species: string;
}

interface NewBookingModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewBookingModal({
  onClose,
  onSuccess,
}: NewBookingModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [roomId, setRoomId] = useState("");
  const [petId, setPetId] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [bookedRanges, setBookedRanges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [roomsRes, servicesRes, petsRes] = await Promise.all([
          api.get("/rooms"),
          api.get("/services"),
          api.get("/pets/my"),
        ]);
        setRooms(roomsRes.data || []);
        setServices(servicesRes.data || []);
        setPets(petsRes.data || []);
      } catch (err) {
        console.error(" Error cargando datos:", err);
      }
    }
    loadData();
  }, []);


  useEffect(() => {
    async function loadAvailability() {
      if (!roomId) return;
      const { data } = await api.get(`/rooms/availability?room_id=${roomId}`);
      setBookedRanges(data || []);
    }
    loadAvailability();
  }, [roomId]);


  const isDateBlocked = (date: Date) => {
    return bookedRanges.some((range) => {
      const start = new Date(range.start_date);
      const end = new Date(range.end_date);
      return date >= start && date <= end;
    });
  };


  const selectedRoom = rooms.find((r) => r.id === roomId);
  const serviceTotal = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((acc, s) => acc + (s.price || 0), 0);
  const total = (selectedRoom?.price || 0) + serviceTotal;

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomId || !petId || !startDate || !endDate) {
      setError("Completa todos los campos requeridos.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        room_id: roomId,
        pet_id: petId,
        services: selectedServices,
        notes,
      };

      console.log(" Enviando payload:", payload);
      const res = await api.post("/bookings", payload);
      console.log(" Reserva creada:", res.data);

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(" Error al crear reserva:", err);
      setError(err.response?.data?.error || "Error al crear la reserva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[480px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
          🏨 Nueva Reserva
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
   
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mascota
            </label>
            <select
              value={petId}
              onChange={(e) => setPetId(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-blue-500"
            >
              <option value="">Selecciona una mascota</option>
              {pets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.species}
                </option>
              ))}
            </select>
          </div>

     
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Habitación
            </label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-blue-500"
            >
              <option value="">Selecciona una habitación</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.code} — {r.type} — Q{r.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

    
          {roomId && (
            <>
              <p className="text-sm text-gray-600 mb-1">
                Los días en{" "}
                <span className="text-red-500 font-bold">rojo</span> están
                ocupados.
              </p>
              <DatePicker
  selected={startDate}
  onChange={(dates: Date | [Date | null, Date | null] | null) => {
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate(dates);
      setEndDate(null);
    }
  }}
  startDate={startDate}
  endDate={endDate}
  selectsRange
  inline
  dayClassName={(date: Date) =>
    isDateBlocked(date)
      ? "bg-red-500 text-white rounded-full cursor-not-allowed"
      : "hover:bg-blue-200 rounded-full"
  }
  filterDate={(date: Date) => !isDateBlocked(date)}
/>
            </>
          )}


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Servicios adicionales
            </label>
            <div className="space-y-1">
              {services.map((s) => (
                <label
                  key={s.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(s.id)}
                    onChange={() => toggleService(s.id)}
                    className="accent-blue-600"
                  />
                  <span>
                    {s.name}{" "}
                    <span className="text-gray-500 text-sm">
                      — Q{s.price.toFixed(2)}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

 
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Comentarios adicionales..."
              className="w-full border rounded-md px-3 py-2 focus:outline-blue-500"
            />
          </div>


          <p className="text-right text-gray-700 font-semibold">
            Total estimado:{" "}
            <span className="text-blue-600">Q{total.toFixed(2)}</span>
          </p>

 
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
