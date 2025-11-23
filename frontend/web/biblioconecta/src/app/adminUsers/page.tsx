"use client";

import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";
import api from "../../api/axios";
import Swal from "sweetalert2";
import { Loader2, Pencil, Trash2, UserPlus, Lock } from "lucide-react";
import EditUserModal from "../components/editUserModal";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    data_prevista_devolucao?: string;
}

export default function UserAdminPage() {
    const router = useRouter();
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<User | null>(null);

    async function carregarUsuarios() {
        try {
            setCarregando(true);
            const response = await api.get("/usuarios");
            setUsuarios(response.data);
        } catch (err) {
            console.error(err);
            setErro("Erro ao carregar usuários.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const usuariosFiltrados = usuarios.filter((u) => {
        const t = busca.toLowerCase();
        return (
            u.name?.toLowerCase().includes(t) ||
            u.email?.toLowerCase().includes(t) ||
            u.status?.toLowerCase().includes(t)
        );
    });

    function editarUsuario(user: User) {
        setUsuarioSelecionado(user);
        setEditModalOpen(true);
    }

    async function excluirUsuario(id: number) {
        const confirmar = await Swal.fire({
            title: "Excluir usuário?",
            text: "Essa ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Deletar",
            cancelButtonText: "Cancelar",
        });

        if (!confirmar.isConfirmed) return;

        try {
            await api.delete(`/usuarios/${id}`);
            Swal.fire("Deletado!", "O usuário foi excluído.", "success");
            carregarUsuarios();
        } catch (err) {
            Swal.fire("Erro!", "Não foi possível excluir o usuário.", "error");
        }
    }

    async function bloquearUsuario(id: number) {
        const confirmar = await Swal.fire({
            title: "Bloquear usuário?",
            text: "O usuário ficará impedido de realizar reservas e empréstimos.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Bloquear",
            cancelButtonText: "Cancelar",
        });

        if (!confirmar.isConfirmed) return;

        try {
            await api.put(`/usuarios/${id}/block`);
            Swal.fire("Bloqueado!", "O usuário foi bloqueado.", "success");
            carregarUsuarios();
        } catch (err) {
            Swal.fire("Erro!", "Não foi possível bloquear o usuário.", "error");
        }
    }

    function corData(data?: string) {
        if (!data) return "text-gray-600";

        const hoje = new Date();
        const prevista = new Date(data);
        const diff = prevista.getTime() - hoje.getTime();
        const dias = diff / (1000 * 3600 * 24);

        if (dias < 0) return "text-red-600 font-bold";         // atrasado
        if (dias <= 3) return "text-yellow-600 font-semibold";  // próximo do vencimento

        return "text-green-700 font-medium";                   // OK
    }

    function formatarData(data?: string) {
        if (!data) return "-";
        return new Date(data).toLocaleDateString("pt-BR");
    }

    return (
        <div className="flex min-h-screen bg-[#f5f8ff]">
            <SideBar />

            <div className="flex-1 flex flex-col">
                <NavBar />

                <main className="ml-56 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-600">
                            Gerenciamento de Usuários
                        </h1>

                        <button
                            onClick={() => router.push("/createUser")}
                            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex gap-2 items-center"
                        >
                            <UserPlus className="w-5 h-5" />
                            Novo Usuário
                        </button>
                    </div>

                    <div className="max-w-md mb-6">
                        <input
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            placeholder="Buscar por nome, e-mail ou status..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {erro && (
                        <div className="p-4 bg-red-100 border border-red-300 text-red-600 rounded mb-4">
                            {erro}
                        </div>
                    )}

                    {carregando ? (
                        <div className="flex justify-center py-10">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <div className="bg-white shadow-md rounded-xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="py-3 px-4">Nome</th>
                                        <th className="py-3 px-4">E-mail</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4">Devolução Prevista</th>
                                        <th className="py-3 px-4">Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {usuariosFiltrados.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-gray-600">
                                                Nenhum usuário encontrado.
                                            </td>
                                        </tr>
                                    ) : (
                                        usuariosFiltrados.map((u) => (
                                            <tr key={u.id} className="border-b hover:bg-gray-50">
                                                <td className="p-3 text-black">{u.name}</td>
                                                <td className="p-3 text-black">{u.email}</td>
                                                <td className="p-3 text-black">{u.status}</td>

                                                <td className={`p-3 ${corData(u.data_prevista_devolucao)}`}>
                                                    {formatarData(u.data_prevista_devolucao)}
                                                </td>

                                                <td className="p-3">
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() => editarUsuario(u)}
                                                            className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg"
                                                        >
                                                            <Pencil className="w-5 h-5 text-yellow-600" />
                                                        </button>

                                                        <button
                                                            onClick={() => bloquearUsuario(u.id)}
                                                            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg"
                                                        >
                                                            <Lock className="w-5 h-5 text-blue-600" />
                                                        </button>

                                                        <button
                                                            onClick={() => excluirUsuario(u.id)}
                                                            className="p-2 bg-red-100 hover:bg-red-200 rounded-lg"
                                                        >
                                                            <Trash2 className="w-5 h-5 text-red-600" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>

            {usuarioSelecionado && (
                <EditUserModal
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    user={usuarioSelecionado}
                    reloadUsers={carregarUsuarios}
                />
            )}
        </div>
    );
}
