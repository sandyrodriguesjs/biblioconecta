"use client";
import React from "react";
import { useRouter } from "next/navigation";
import type { Book } from "../types/books";

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const router = useRouter();

  const handleVerResumo = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(book);
  };

  const handleVerDetalhes = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/bookDetailsPage/${book.id_livro}`);
  };

  return (
    <div
      className="cursor-pointer bg-gradient-to-br from-blue-100 via-white to-blue-50 
                 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 
                 shadow-lg rounded-xl overflow-hidden 
                 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={book.capa_url ?? "/default-book-cover.png"}
          alt={book.titulo}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent 
                        opacity-0 hover:opacity-100 transition duration-300 flex items-end p-3">
          <span className="text-white text-sm italic truncate">
            Clique para ver mais
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-4 mb-4">
          {book.sinopse || "Sinopse não disponível."}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleVerResumo}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-lg transition"
          >
            Ver Resumo
          </button>

          <button
            onClick={handleVerDetalhes}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-2 rounded-lg transition"
          >
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
