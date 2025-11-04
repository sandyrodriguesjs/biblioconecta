"use client";

import { useRouter, useSearchParams } from "next/navigation";
import NavBar from "@/app/components/navBar";
import SideBar from "@/app/components/sideBar";

export default function ReservarLivro() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const titulo = searchParams.get("titulo");

  function handleConfirmar() {
    alert("📚 Livro reservado com sucesso!");
    router.push("/pages/homePage");
  }

  return (
    <div className="flex min-h-screen bg-[#f5f8ff]">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar />

        <main className="ml-56 flex-1 flex items-center justify-center p-8">
          <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Confirmar Reserva
            </h1>

            <h2 className="text-xl font-semibold mb-2 text-blue-700">
              {titulo || "Título não informado"}
            </h2>

            <p className="text-gray-600 mb-6">
              Tem certeza que deseja reservar este livro?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmar}
                className="bg-gradient-to-r from-sky-400 to-sky-500 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:opacity-90 transition"
              >
                Confirmar Reserva
              </button>

              <button
                onClick={() => router.push("/pages/homePage")}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Voltar
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
