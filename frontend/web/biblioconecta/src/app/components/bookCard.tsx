"use client";
import React from "react";

export interface Book {
  id: string;
  isbn: string;
  titulo: string;
  autor: string;
  editora?: string;
  ano_publicacao: string;
  sinopse: string;

  imagem?: string;
  categoria?: string;
  idioma?: string;
  tags?: string[];
  avaliacao: number;
  comentarios?: { usuario: string; data: string; texto: string }[];
  disponivel?: boolean;
}

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onClick,
}: BookCardProps) => {
  return (
    <div
      onClick={() => onClick(book)}
      className="cursor-pointer bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200"
    >
      <img
        src={book.imagem}
        alt={book.titulo}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {book.titulo}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{book.autor}</p>
      </div>
    </div>
  );
};

export default BookCard;
