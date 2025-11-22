"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "../../components/navBar";
import SideBar from "../../components/sideBar";
import api from "@/api/axios";
import { Loader2 } from "lucide-react";

// 👉 Apenas SweetAlert2 puro
import Swal from "sweetalert2";

interface Exemplar {
  id_exemplar: number;
  codigo_exemplar: string;
  status: string;
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

  // 🔹 Buscar livro por ID
  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        const response = await api.get(`/livros/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Erro ao carregar",
          text: "Não foi possível carregar os dados do livro.",
        });
      } finally {
        setLoading(false);
      }
    }

    if (bookId) fetchBook();
  }, [bookId]);

  const isAvailable =
    book?.exemplares?.some((ex) => ex.status === "DISPONIVEL") ?? false;

  // 🔹 Função para reservar
  async function handleReserve() {
    if (!book) return;

    try {
      await api.post("/reservas", { id_livro: book.id_livro });

      Swal.fire({
        icon: "success",
        title: "Reserva realizada!",
        text: "O livro foi reservado com sucesso.",
        confirmButtonColor: "#2563EB",
      });

      setTimeout(() => router.push("/homePage"), 1500);
    } catch (error: any) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Erro ao reservar",
        text:
          error?.response?.data?.erro ??
          "Não foi possível concluir a reserva.",
        confirmButtonColor: "#DC2626",
      });
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5f8ff]">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar />

        <main className="ml-56 p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-10 text-center">
            Detalhes do Livro
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
                <h2 className="text-3xl font-bold mb-2 text-blue-600">
                  {book.titulo}
                </h2>

                <p className="text-gray-700 mb-2 text-lg">
                  <strong>Autor:</strong> {book.autor}
                </p>

                <p className="text-gray-700 mb-2">
                  <strong>ISBN:</strong> {book.isbn}
                </p>

                <p className="text-gray-700 mb-2">
                  <strong>Editora:</strong> {book.editora}
                </p>

                <p className="text-gray-700 mb-2">
                  <strong>Ano:</strong> {book.ano_publicacao}
                </p>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  <strong>Sinopse:</strong> <br /> {book.sinopse}
                </p>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {isAvailable ? "Disponível" : "Indisponível"}
                </span>

                <button
                  onClick={handleReserve}
                  disabled={!isAvailable}
                  className={`mt-6 w-full py-3 rounded-lg font-semibold text-white transition ${
                    isAvailable
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Reservar Livro
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Livro não encontrado.</p>
          )}
        </main>
      </div>
    </div>
  );
}
