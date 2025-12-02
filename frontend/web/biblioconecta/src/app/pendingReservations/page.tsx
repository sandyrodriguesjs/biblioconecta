"use client";

import { useEffect, useState } from "react";
import api from "../../api/axios";
import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";
import Swal from "sweetalert2";
import { Loader2, Check, X } from "lucide-react";

interface ReservaPend {
  id_reserva: number;
  data_reserva: string;
  posicao_fila: number;

  usuario: {
    id_usuario: number;
    name: string;
    email: string;
  };

  livro: {
    id_livro: number;
    titulo: string;
    autor: string;
    capa_url: string | null;
  };

  exemplar: {
    id_exemplar: number;
    codigo_exemplar: string;
    status: string;
  };
}

export default function ReservationsPendingAdminPage() {
  const [reservas, setReservas] = useState<ReservaPend[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarReservas() {
    try {
      const { data } = await api.get("/reservations/pending");
      setReservas(data);
    } catch {
      Swal.fire("Erro!", "Não foi possível carregar as reservas pendentes.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function aprovarReserva(reserva: ReservaPend) {
    const confirm = await Swal.fire({
      icon: "question",
      title: "Aprovar Empréstimo?",
      text: "O exemplar será marcado como EMPRESTADO.",
      showCancelButton: true,
      confirmButtonText: "Aprovar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.post("/emprestimos", {
        userId: reserva.usuario.id_usuario,
        exemplarId: reserva.exemplar.id_exemplar,
      });

      Swal.fire("Sucesso!", "Empréstimo criado.", "success");
      carregarReservas();
    } catch {
      Swal.fire("Erro!", "Não foi possível aprovar a reserva.", "error");
    }
  }

  async function recusarReserva(id_reserva: number) {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Recusar reserva?",
      text: "Esta ação não pode ser desfeita.",
      showCancelButton: true,
      confirmButtonText: "Recusar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/reservations/${id_reserva}`);
      Swal.fire("Reserva recusada!", "", "success");
      carregarReservas();
    } catch {
      Swal.fire("Erro!", "Não foi possível recusar a reserva.", "error");
    }
  }

  useEffect(() => {
    carregarReservas();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f5f8ff]">
      <SideBar />

      <div className="flex-1">
        <NavBar />

        <main className="p-4 sm:p-6 md:p-8 pl-0 md:pl-56 transition-all duration-300">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Reservas Pendentes
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-xl overflow-x-auto w-full">
              <table className="min-w-[800px] w-full text-left">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-3 px-4">Livro</th>
                    <th className="py-3 px-4">Exemplar</th>
                    <th className="py-3 px-4">Usuário</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Data Reserva</th>
                    <th className="py-3 px-4 text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {reservas.map((res) => (
                    <tr key={res.id_reserva} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-black">{res.livro.titulo}</td>

                      <td className="p-3 text-black">
                        {res.exemplar.codigo_exemplar}
                      </td>

                      <td className="p-3 text-black">{res.usuario.name}</td>

                      <td className="p-3 text-black">{res.usuario.email}</td>

                      <td className="p-3 text-black">
                        {new Date(res.data_reserva).toLocaleDateString("pt-BR")}
                      </td>

                      <td className="p-3 text-center flex gap-2 justify-center">
                        <button
                          onClick={() => aprovarReserva(res)}
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                        >
                          <Check size={18} />
                        </button>

                        <button
                          onClick={() => recusarReserva(res.id_reserva)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
