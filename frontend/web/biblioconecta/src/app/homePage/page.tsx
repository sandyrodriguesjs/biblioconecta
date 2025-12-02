"use client";

import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";
import BookCard from "@/app/components/bookCard";
import BookModal from "@/app/components/bookModal";
import Image from "next/image";
import { motion } from "framer-motion";
import api from "@/api/axios";
import type { Book } from "../types/books";

export default function HomePage() {
  const [livros, setLivros] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [termo, setTermo] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const categorias = ["Popular", "História", "Ciência", "Ação e Aventura", "Culinária"];

  useEffect(() => {
    async function fetchLivros() {
      try {
        setLoading(true);
        const response = await api.get("/livros");
        setLivros(response.data);
      } catch {
        setErro("Erro ao carregar os livros. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }
    fetchLivros();
  }, []);

  const livrosFiltrados = livros.filter((livro) => {
    const termoLower = termo.toLowerCase();
    const correspondeTermo =
      livro.titulo?.toLowerCase().includes(termoLower) ||
      livro.autor?.toLowerCase().includes(termoLower) ||
      livro.isbn?.toLowerCase().includes(termoLower);

    const correspondeCategoria = categoriaSelecionada
      ? livro.categoria === categoriaSelecionada
      : true;

    return correspondeTermo && correspondeCategoria;
  });

  return (
    <div className="flex min-h-screen bg-[#f5f8ff] overflow-hidden">
      <SideBar />

      <div className="flex-1 flex flex-col max-h-screen overflow-y-auto">
        <NavBar />

        <main className="p-4 sm:p-6 md:p-8 space-y-10 pl-0 md:pl-56 transition-all duration-300">

          <section className="relative w-full overflow-hidden rounded-2xl shadow-lg">
            <motion.div
              className="flex gap-4 overflow-x-hidden"
              initial={{ x: 0 }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {livros.map((livro) => (
                <Image
                  key={`carousel-${livro.id_livro}`}
                  src={livro.capa_url ?? "/default-book-cover.png"}
                  alt={livro.titulo}
                  width={200}
                  height={300}
                  className="rounded-xl shadow-md object-cover"
                />
              ))}
            </motion.div>

            <div className="absolute bottom-3 left-6 bg-black/40 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
              <h2 className="text-lg font-semibold">📚 Livros em destaque</h2>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            <input
              type="text"
              placeholder="Buscar por título, autor ou ISBN..."
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
              <Filter className="w-5 h-5" />
              Filtros
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 px-2">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                type="button"
                onClick={() =>
                  setCategoriaSelecionada((prev) => (prev === categoria ? "" : categoria))
                }
                className={`px-5 py-2 rounded-full border font-semibold transition ${
                  categoriaSelecionada === categoria
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-blue-100"
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              Todos os livros
            </h2>

            {loading ? (
              <p className="text-center text-gray-600">Carregando livros...</p>
            ) : erro ? (
              <p className="text-center text-red-500">{erro}</p>
            ) : livrosFiltrados.length === 0 ? (
              <p className="text-center text-gray-600">Nenhum livro encontrado.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-10">
                {livrosFiltrados.map((livro) => (
                  <motion.div
                    key={`livro-${livro.id_livro}-${livro.isbn}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BookCard book={livro} onClick={setSelectedBook} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          <BookModal
            isOpen={!!selectedBook}
            book={selectedBook}
            onClose={() => setSelectedBook(undefined)}
          />
        </main>
      </div>
    </div>
  );
}
