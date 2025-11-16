"use client";

import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";
import api from "../../api/axios";
import { Loader2, Pencil, Trash2, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

interface Livro {
  id_livro: number;
  titulo: string;
  autor: string;
  ano_publicacao: number;
  categoria: string;
  isbn: string;
  capa_url?: string;
  imagem?: string;
}

export default function ListaLivrosPage() {
  const router = useRouter();

  const [livros, setLivros] = useState<Livro[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarLivros() {
    try {
      setCarregando(true);
      const response = await api.get("/livros");
      setLivros(response.data);
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar lista de livros.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarLivros();
  }, []);

  const livrosFiltrados = livros.filter((l) => {
    const termo = busca.toLowerCase();
    return (
      l.titulo?.toLowerCase().includes(termo) ||
      l.autor?.toLowerCase().includes(termo) ||
      l.isbn?.toLowerCase().includes(termo)
    );
  });

  async function deletarLivro(id_livro: number) {
    if (!confirm("Tem certeza que deseja excluir este livro?")) return;

    try {
      await api.delete(`/livros/${id_livro}`);
      carregarLivros();
      alert("Livro excluído com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir o livro.");
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5f8ff]">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <NavBar />

        <main className="ml-56 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Gestão de Acervo</h1>

            <button
              onClick={() => router.push("/createBook")}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              + Novo Livro
            </button>
          </div>

          <div className="max-w-md mb-6">
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar livro, autor ou ISBN..."
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
                    <th className="py-3 px-4">Capa</th>
                    <th className="py-3 px-4">Título</th>
                    <th className="py-3 px-4">Autor</th>
                    <th className="py-3 px-4">Ano</th>
                    <th className="py-3 px-4">Categoria</th>
                    <th className="py-3 px-4">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {livrosFiltrados.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-6 text-center text-gray-600"
                      >
                        Nenhum livro encontrado.
                      </td>
                    </tr>
                  ) : (
                    livrosFiltrados.map((livro) => (
                      <tr
                        key={livro.id_livro}
                        className="border-b last:border-none hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <img
                            src={
                              livro.capa_url ||
                              livro.imagem ||
                              "/default-book-cover.png"
                            }
                            className="w-14 h-20 object-cover rounded shadow"
                          />
                        </td>

                        <td className="p-3 text-black">{livro.titulo}</td>
                        <td className="p-3 text-black">{livro.autor}</td>
                        <td className="p-3 text-black">{livro.ano_publicacao}</td>
                        <td className="p-3 text-black">{livro.categoria}</td>

                        <td className="p-3">
                          <div className="flex gap-3">
                            <button
                              onClick={() =>
                                router.push(`/livro/${livro.id_livro}`)
                              }
                              className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg"
                              title="Ver detalhes"
                            >
                              <BookOpen className="w-5 h-5 text-blue-700" />
                            </button>

                            <button
                              onClick={() =>
                                router.push(`/editBook/${livro.id_livro}`)
                              }
                              className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg"
                              title="Editar"
                            >
                              <Pencil className="w-5 h-5 text-yellow-700" />
                            </button>

                            <button
                              onClick={() => deletarLivro(livro.id_livro)}
                              className="p-2 bg-red-100 hover:bg-red-200 rounded-lg"
                              title="Excluir"
                            >
                              <Trash2 className="w-5 h-5 text-red-700" />
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
    </div>
  );
}
