"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "../../components/navBar";
import SideBar from "../../components/sideBar";
import api from "@/api/axios"; 
import { Loader2 } from "lucide-react";

interface Exemplar {
  id_exemplar: number;
  codigo_exemplar: string;
  status: string; // DISPONIVEL | EMPRESTADO | RESERVADO
}

interface Book {
  id_livro: number;
  titulo: string;
  autor: string;
  isbn: string;
  editora: string;
  ano_publicacao: number;
  sinopse: string;
  categoria: string;
  capa_url?: string;
  exemplares: Exemplar[];
}

export default function BookDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const bookId = params?.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // 🔹 Fetch book by ID
  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        const response = await api.get(`/livros/${bookId}`);
        console.log("Book fetched:", response.data);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setMessage("Error loading book information.");
      } finally {
        setLoading(false);
      }
    }

    if (bookId) fetchBook();
  }, [bookId]);

  const isAvailable =
    book?.exemplares?.some((ex) => ex.status === "DISPONIVEL") ?? false;

  async function handleReserve() {
    if (!book) return;

    try {
      await api.post("/reservas", { idLivro: book.id_livro });
      setMessage("📘 Book reserved successfully!");
      setTimeout(() => router.push("/homePage"), 2000);
    } catch (error: any) {
      console.error(error);
      setMessage("❌ Error reserving book. Try again.");
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5f8ff]">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar />

        <main className="ml-56 p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-10 text-center">
            Book Details
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            </div>
          ) : book ? (
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-8">
              <img
                src={book.capa_url ?? "/default-book-cover.png"}
                alt={book.titulo}
                className="w-48 h-72 object-cover rounded-lg shadow-md"
              />

              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{book.titulo}</h2>
                <p className="text-gray-700 mb-2 text-lg">
                  <strong>Author:</strong> {book.autor}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>ISBN:</strong> {book.isbn}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Publisher:</strong> {book.editora}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Year:</strong> {book.ano_publicacao}
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  <strong>Synopsis:</strong> <br /> {book.sinopse}
                </p>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </span>

                {/* Reserve button */}
                <button
                  onClick={handleReserve}
                  disabled={!isAvailable}
                  className={`mt-6 w-full py-3 rounded-lg font-semibold text-white transition ${
                    isAvailable
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Reserve Book
                </button>

                {message && (
                  <p className="mt-4 text-center font-medium text-blue-700">
                    {message}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Book not found.</p>
          )}
        </main>
      </div>
    </div>
  );
}
