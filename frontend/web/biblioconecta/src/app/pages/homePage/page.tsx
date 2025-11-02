"use client";
import BookCard, { Book } from "@/app/components/bookCard";
import NavBar from "../../components/navBar";
import SideBar from "../../components/sideBar";
import BookModal from "@/app/components/bookModal";
import { useState } from "react";

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
    sinopse:
      "Um guia sobre o significado da vida e a busca por equilíbrio interior.",
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
    sinopse:
      "Coleção de livros sagrados e históricos da tradição judaico-cristã.",
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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar />

        <main className="ml-56 flex-1 p-8 bg-[#f5f8ff]">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Biblioteca</h1>

          {/* Categorias */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {["Popular", "História", "Ciência", "Ação e Aventura"].map(
              (cat) => (
                <button
                  key={cat}
                  className="px-5 py-2 bg-white border border-gray-300 rounded-full shadow-sm 
                 hover:bg-blue-100 hover:border-blue-400 transition text-gray-800 font-semibold"
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* Livros */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {livros.map((livro) => (
              <BookCard key={livro.id} book={livro} onClick={setSelectedBook} />
            ))}
          </div>

          {/* Modal de detalhes */}
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