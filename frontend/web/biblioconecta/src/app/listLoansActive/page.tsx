"use client";

import { useEffect, useState } from "react";
import api from "../../api/axios";
import SideBar from "../components/sideBar";
import NavBar from "../components/navBar";
import Swal from "sweetalert2";
import { Loader2, BookDown } from "lucide-react";

interface Emprestimo {
    id_emprestimo: number;
    id_usuario: number;
    id_exemplar: number;
    data_retirada: string;
    data_prevista_devolucao: string;
    data_devolucao: string | null;
    renovado: boolean;

    usuario: {
        name: string;
        email: string;
    };

    exemplar: {
        codigo_exemplar: string;
        livro: {
            titulo: string;
        };
    };
}

export default function ActiveLoansPage() {
    const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
    const [loading, setLoading] = useState(true);

    async function carregarEmprestimos() {
        try {
            const { data } = await api.get("/emprestimos");
            setEmprestimos(data);
        } catch (error) {
            Swal.fire("Erro!", "Não foi possível carregar os empréstimos.", "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarEmprestimos();
    }, []);

    async function registrarDevolucao(id: number) {
        const confirm = await Swal.fire({
            icon: "question",
            title: "Registrar devolução?",
            text: "Confirmar que este exemplar foi devolvido?",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
        });

        if (!confirm.isConfirmed) return;

        try {
            await api.post(`/emprestimos/${id}/devolucao`);

            await Swal.fire({
                icon: "success",
                title: "Devolução registrada!",
                text: "O livro foi devolvido com sucesso.",
            });

            carregarEmprestimos();
        } catch (error) {
            Swal.fire("Erro!", "Não foi possível registrar a devolução.", "error");
        }
    }

    return (
        <div className="flex min-h-screen bg-[#f5f8ff]">
            <SideBar />

            <div className="flex-1">
                <NavBar />

                <main className="p-4 sm:p-6 md:p-8 pl-0 md:pl-56 transition-all duration-300">

                    <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                        Empréstimos Ativos
                    </h1>

                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
                        </div>
                    ) : (
                        <div className="bg-white shadow-md rounded-xl overflow-hidden overflow-x-auto">
                            <table className="w-full text-left min-w-[750px]">
                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="py-3 px-4">Usuário</th>
                                        <th className="py-3 px-4">Código do Exemplar</th>
                                        <th className="py-3 px-4">Título</th>
                                        <th className="py-3 px-4">Data de Retirada</th>
                                        <th className="py-3 px-4">Data Prevista</th>
                                        <th className="py-3 px-4 text-center">Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {emprestimos.map((emp) => (
                                        <tr key={emp.id_emprestimo} className="border-b">
                                            <td className="p-3 text-black">{emp.usuario.name}</td>

                                            <td className="p-3 text-black">
                                                {emp.exemplar.codigo_exemplar}
                                            </td>

                                            <td className="p-3 text-black">
                                                {emp.exemplar.livro.titulo}
                                            </td>

                                            <td className="p-3 text-black">
                                                {new Date(emp.data_retirada).toLocaleDateString("pt-BR")}
                                            </td>

                                            <td className="p-3 text-black">
                                                {new Date(emp.data_prevista_devolucao).toLocaleDateString("pt-BR")}
                                            </td>

                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() => registrarDevolucao(emp.id_emprestimo)}
                                                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                                >
                                                    <BookDown size={18} />
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
