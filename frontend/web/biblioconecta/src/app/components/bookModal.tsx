"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { Book } from "../types/books";

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book;
}

export default function BookModal({ isOpen, onClose, book }: BookModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen || !book) return null;

  const b = book;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
          // ⬆️ Sem cor de fundo — totalmente transparente
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl w-[85%] max-w-md p-6 relative flex flex-col items-center text-center backdrop-blur-xl"
            // ⬆️ Glassmorphism suave
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* IMAGEM EM DESTAQUE */}
            <img
              src={b.capa_url || "/placeholder-book.png"}
              alt={b.titulo}
              className="w-40 h-60 object-cover rounded-xl shadow-md mb-4"
            />

            {/* TÍTULO E AUTOR */}
            <h2 className="text-2xl font-bold mb-1">{b.titulo}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {b.autor}
            </p>

            {/* INFORMAÇÕES */}
            <div className="text-sm space-y-1 w-full">
              <p><strong>ISBN:</strong> {b.isbn}</p>
              <p><strong>Editora:</strong> {b.editora}</p>
              <p><strong>Ano:</strong> {b.ano_publicacao}</p>
              <p><strong>Categoria:</strong> {b.categoria}</p>
            </div>

            {/* BOTÃO FECHAR */}
            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
