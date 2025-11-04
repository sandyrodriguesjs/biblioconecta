"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import adicionado
import { Book } from "./bookCard";
import StarRating from "./starRating";
import { Bookmark } from "lucide-react";

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

export default function BookModal({ isOpen, onClose, book }: BookModalProps) {
  const router = useRouter(); // ✅ Para navegação

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!book) return null;

  // ✅ Função para ir até a tela de reserva
  function handleReservar() {
    if (!book) return; // garante que book não é null
    router.push(`/pages/reserveBook?titulo=${encodeURIComponent(book.titulo)}`);
    onClose(); // Fecha o modal
  }
  

  return (
    <AnimatePresence>
      {isOpen && (
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
            {/* Cabeçalho */}
            <div className="grid grid-cols-2 gap-y-2">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={book.imagem || "/placeholder-book.png"}
                  alt={book.titulo}
                  className="w-28 h-40 object-cover rounded-md bg-gray-200"
                />
                <div>
                  <h2 className="text-2xl font-bold">{book.titulo}</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {book.autor}
                  </p>
                  <div className="flex items-center mt-2 text-yellow-500">
                    {"★".repeat(Math.round(book.avaliacao))}
                    {"☆".repeat(5 - Math.round(book.avaliacao))}
                    <span className="ml-2 text-sm text-gray-500">
                      ({book.avaliacao.toFixed(1)})
                    </span>
                  </div>
                </div>
              </div>
              <div>
                {/* Disponibilidade e ações */}
                <div>
                  <span
                    className={`block mt-4 text-right text-lg font-semibold ${
                      book.disponivel ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {book.disponivel ? "Disponível" : "Indisponível"}
                  </span>
                  <div className="flex gap-3 mt-6">
  {book.disponivel ? (
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

  <button className="p-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
    <Bookmark size={20} />
  </button>
</div>

                </div>
              </div>
            </div>

            {/* Informações */}
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <p>
                <strong>Título:</strong> {book.titulo}
              </p>
              <p>
                <strong>Autor:</strong> {book.autor}
              </p>
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
              <p>
                <strong>Idioma:</strong> {book.idioma}
              </p>
              <p>
                <strong>Editora:</strong> {book.editora}
              </p>
              <p>
                <strong>Ano de publicação:</strong> {book.ano_publicacao}
              </p>
              <p>
                <strong>Categoria:</strong> {book.categoria}
              </p>
            </div>

            {/* Tags */}
            <div className="grid grid-cols-2 mt-4">
              <div>
                <h3 className="font-semibold mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {book.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold mb-2">Avaliação:</h3>
                <StarRating />
              </div>
            </div>

            {/* Comentário */}
            <div className="mt-6">
              <textarea
                placeholder="Deixe um comentário..."
                className="w-full border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
              />
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Postar
              </button>
              <p></p>
            </div>

            {/* Comentários existentes */}
            {(book.comentarios ?? []).length > 0 && (
              <div className="mt-4 space-y-3">
                {(book.comentarios ?? []).map((c, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800"
                  >
                    <p className="text-sm text-gray-600">
                      {c.usuario} • {c.data}
                    </p>
                    <p className="font-medium">{c.texto}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
