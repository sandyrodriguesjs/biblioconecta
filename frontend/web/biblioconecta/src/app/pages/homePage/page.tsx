"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import NavBar from "../../components/navBar";
import SideBar from "../../components/sideBar";
import BookCard, { Book } from "@/app/components/bookCard";
import BookModal from "@/app/components/bookModal";

const livros: Book[] = [
  {
    id: "1",
    isbn: "2015213265215",
    titulo: "A arte de viver",
    autor: "Vitória Almeida",
    idioma: "Português",
    editora: "Editora Fictícia",
    ano_publicacao: "2025",
    categoria: "Popular",
    imagem: "https://placehold.co/200x300?text=A+arte+de+viver",
    sinopse: "Um guia sobre o significado da vida e a busca por equilíbrio interior.",
    avaliacao: 5,
    comentarios: [
      {
        usuario: "Lara Trina",
        data: "12/03/2020",
        texto: "Great book it helps me a lot",
      },
    ],
    disponivel: true,
  },
  {
    id: "2",
    isbn: "2012563225212",
    titulo: "Vida longa",
    autor: "Maria Sandy",
    idioma: "Português",
    editora: "Editora Fictícia",
    ano_publicacao: "2024",
    categoria: "Popular",
    imagem: "https://placehold.co/200x300?text=Vida+longa",
    sinopse: "Reflexões sobre longevidade, saúde e bem-estar emocional.",
    avaliacao: 4,
    comentarios: [],
    disponivel: false,
  },
  {
    id: "3",
    isbn: "5521011021152",
    titulo: "Bíblia",
    autor: "Vários autores",
    idioma: "Português",
    editora: "Editora Fictícia",
    ano_publicacao: "2019",
    categoria: "História",
    imagem: "https://placehold.co/200x300?text=Biblia",
    sinopse: "Coleção de livros sagrados e históricos da tradição judaico-cristã.",
    avaliacao: 4,
    comentarios: [],
    disponivel: false,
  },
  {
    id: "4",
    isbn: "5151201195821",
    titulo: "100 receitas",
    autor: "Ana Maria",
    idioma: "Português",
    editora: "Editora Fictícia",
    ano_publicacao: "2017",
    categoria: "Culinária",
    imagem: "https://placehold.co/200x300?text=100+receitas",
    sinopse: "Deliciosas receitas práticas para o dia a dia.",
    avaliacao: 5,
    comentarios: [],
    disponivel: false,
  },
  {
    id: "5",
    isbn: "5163202552012",
    titulo: "Milagre",
    autor: "José Almir",
    idioma: "Português",
    editora: "Editora Fictícia",
    ano_publicacao: "2022",
    categoria: "Popular",
    imagem: "https://placehold.co/200x300?text=Milagre",
    sinopse: "Uma história sobre fé, esperança e superação.",
    avaliacao: 3,
    comentarios: [],
    disponivel: false,
  },
  {
    id: "6",
    isbn: "9542511255823",
    titulo: "Até amanhã",
    autor: "Felipe Souza",
    idioma: "Português",
    editora: "Editora Fictícia",
    ano_publicacao: "2022",
    categoria: "Ação e Aventura",
    imagem: "https://placehold.co/200x300?text=Ate+amanha",
    sinopse: "Um romance sobre recomeços, despedidas e a força do tempo.",
    avaliacao: 4,
    comentarios: [],
    disponivel: true,
  },
];

export default function HomePage() {
  // ====== STATES ======
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [termo, setTermo] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [assuntosSelecionados, setAssuntosSelecionados] = useState<string[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");

  const assuntos = ["Drama", "Filosofia", "Biologia", "Romance", "História", "Matemática"];

  // ====== FUNÇÕES ======
  const alternarAssunto = (assunto: string) => {
    setAssuntosSelecionados((prev) =>
      prev.includes(assunto) ? prev.filter((a) => a !== assunto) : [...prev, assunto]
    );
  };

  // ====== FILTRO ======
  const livrosFiltrados = livros.filter((livro) => {
    const termoLower = termo.toLowerCase();
    const correspondeTermo =
      livro.titulo.toLowerCase().includes(termoLower) ||
      livro.autor.toLowerCase().includes(termoLower) ||
      livro.isbn.toLowerCase().includes(termoLower);

    const correspondeTitulo = titulo
      ? livro.titulo.toLowerCase().includes(titulo.toLowerCase())
      : true;

    const correspondeAutor = autor
      ? livro.autor.toLowerCase().includes(autor.toLowerCase())
      : true;

    const correspondeCategoria = categoriaSelecionada
      ? livro.categoria === categoriaSelecionada
      : true;

    // (opcional) se no futuro os livros tiverem "assunto", dá pra filtrar aqui também

    return correspondeTermo && correspondeTitulo && correspondeAutor && correspondeCategoria;
  });

  return (
    <div className="flex min-h-screen bg-[#f5f8ff]">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar />

        <main className="ml-56 flex-1 p-8">

          {/* 🔍 Busca principal */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <input
              type="text"
              placeholder="Buscar por título, autor ou ISBN..."
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setMostrarFiltros((prev) => !prev)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition"
              type="button"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* 🔽 Filtros avançados */}
          {mostrarFiltros && (
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
              {/* Título */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">Título</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Digite o título..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Autor */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">Autor</label>
                <input
                  type="text"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  placeholder="Digite o autor..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Assuntos */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Assunto</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {assuntos.map((assunto) => (
                    <button
                      key={assunto}
                      type="button"
                      onClick={() => alternarAssunto(assunto)}
                      className={`px-3 py-2 rounded-full border ${
                        assuntosSelecionados.includes(assunto)
                          ? "bg-blue-500 text-white border-blue-600"
                          : "bg-gray-100 text-gray-700 border-gray-300"
                      } hover:bg-blue-100 transition`}
                    >
                      {assunto}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 🔹 Categorias */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["Popular", "História", "Ciência", "Ação e Aventura"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  setCategoriaSelecionada((prev) => (prev === cat ? "" : cat))
                }
                className={`px-5 py-2 rounded-full border font-semibold transition ${
                  categoriaSelecionada === cat
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-blue-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 📚 Lista de Livros */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {livrosFiltrados.map((livro) => (
              <BookCard key={livro.id} book={livro} onClick={setSelectedBook} />
            ))}
          </div>

          {/* 🪟 Modal */}
          <BookModal
            isOpen={!!selectedBook}
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        </main>
      </div>
    </div>
  );
}
