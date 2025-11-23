"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../api/axios";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  reloadUsers: () => void;
}

export default function EditUserModal({ isOpen, onClose, user, reloadUsers }: EditUserModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      await api.put(`/usuarios/${user.id}`, {
        name: form.name,
        email: form.email
      });

      Swal.fire("Sucesso", "Usuário atualizado!", "success");

      reloadUsers();
      onClose();
    } catch (err) {
      Swal.fire("Erro", "Falha ao atualizar usuário.", "error");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>

        <form onSubmit={handleSubmit} className="grid gap-4">

          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nome"
            className="border p-2 rounded w-full text-black"
          />

          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="E-mail"
            className="border p-2 rounded w-full text-black"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Salvar alterações
            </button>
          </div>

        </form>
      </div>
    </div>

  );
}
