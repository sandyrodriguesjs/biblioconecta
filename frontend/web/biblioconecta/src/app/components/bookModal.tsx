"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "../types/books";

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book;
}

export default function BookModal({ isOpen, onClose, book }: BookModalProps) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen || !book) return null;

  const b = book;

  function handleReservar() {
    router.push(`/reserveBook?titulo=${encodeURIComponent(b.titulo)}`);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && book && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[90%] max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Conteúdo */}
            <div className="grid grid-cols-2 gap-y-2">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={b.capa_url || "/placeholder-book.png"}
                  alt={b.titulo}
                  className="w-28 h-40 object-cover rounded-md bg-gray-200"
                />
                <div>
                  <h2 className="text-2xl font-bold">{b.titulo}</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {b.autor}
                  </p>
                </div>
              </div>

              <div>
                <span
                  className={`block mt-4 text-right text-lg font-semibold ${
                    b.exemplares?.some((e) => e.situacao === "disponivel")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {b.exemplares?.some((e) => e.situacao === "disponivel")
                    ? "Disponível"
                    : "Indisponível"}
                </span>

                <div className="flex gap-3 mt-6">
                  {b.exemplares?.some((e) => e.situacao === "disponivel") ? (
                    <button
                      onClick={handleReservar}
                      className="flex-1 px-5 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                    >
                      Reservar
                    </button>
                  ) : (
                    <button
                      onClick={() => alert("Você entrou na fila de espera!")}
                      className="flex-1 px-5 py-2 bg-gray-400 text-white font-semibold rounded-xl hover:bg-gray-500 transition"
                    >
                      Entrar na Fila de Espera
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-sm mt-6">
              <p><strong>Título:</strong> {b.titulo}</p>
              <p><strong>Autor:</strong> {b.autor}</p>
              <p><strong>ISBN:</strong> {b.isbn}</p>
              <p><strong>Editora:</strong> {b.editora}</p>
              <p><strong>Ano de publicação:</strong> {b.ano_publicacao}</p>
              <p><strong>Categoria:</strong> {b.categoria}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
