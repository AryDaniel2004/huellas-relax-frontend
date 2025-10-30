"use client";

interface DeleteConfirmModalProps {
  petName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  petName,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-3">
          ¿Eliminar mascota?
        </h2>
        <p className="text-gray-700 mb-4">
          ¿Estás seguro de eliminar a <strong>{petName}</strong>? Esta acción no
          se puede deshacer.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
