"use client";

import { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";
import api from "../../api/axios";
import { Loader2, Pencil, Trash2, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import ConfirmModal from "../components/confirmModal";
import BookModal from "../components/bookModal";
import type { Book } from "../types/books";

export default function ListBookPage() {
  const router = useRouter();

  const [livros, setLivros] = useState<Book[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [livroParaExcluir, setLivroParaExcluir] = useState<Book | undefined>(undefined);

  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);

  async function carregarLivros() {
    try {
      setCarregando(true);
      const response = await api.get("/livros");
      setLivros(response.data);
    } catch {
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

  function abrirModal(livro: Book) {
    setLivroParaExcluir(livro);
    setModalOpen(true);
  }

  function abrirModalInfo(livro: Book) {
    setSelectedBook(livro);
    setModalInfoOpen(true);
  }

  async function confirmarExclusao() {
    if (!livroParaExcluir) return;

    try {
      await api.delete(`/livros/${livroParaExcluir.id_livro}`);
      setModalOpen(false);
      carregarLivros();
    } catch {
      alert("Erro ao excluir o livro.");
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5f8ff] relative">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <NavBar />

        <main
          className="
            p-4 sm:p-6 md:p-8 
            pl-0 md:pl-56 
            transition-all duration-300
            bg-[#f5f8ff]
            min-h-screen 
            w-full 
            overflow-x-auto
          "
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
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
            <div className="bg-white shadow-md rounded-xl overflow-x-auto w-full">
              <table className="min-w-[800px] w-full text-left">
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
                      <td colSpan={6} className="py-6 text-center text-gray-600">
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
                            src={livro.capa_url || "/default-book-cover.png"}
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
                              onClick={() => abrirModalInfo(livro)}
                              className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg"
                            >
                              <BookOpen className="w-5 h-5 text-blue-700" />
                            </button>

                            <button
                              onClick={() => router.push(`/editBook/${livro.id_livro}`)}
                              className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg"
                            >
                              <Pencil className="w-5 h-5 text-yellow-700" />
                            </button>

                            <button
                              onClick={() => abrirModal(livro)}
                              className="p-2 bg-red-100 hover:bg-red-200 rounded-lg"
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

      <ConfirmModal
        isOpen={modalOpen}
        title="Excluir livro"
        message={`Tem certeza que deseja excluir "${livroParaExcluir?.titulo}"?`}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmarExclusao}
      />

      <BookModal
        isOpen={modalInfoOpen}
        onClose={() => setModalInfoOpen(false)}
        book={selectedBook}
      />
    </div>
  );
}
