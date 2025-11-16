"use client";
import { useState } from "react";
import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";
import api from "../../api/axios";
import { Loader2 } from "lucide-react";

export default function DevolucaoBookPage() {
  const [emprestimoId, setEmprestimoId] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  async function handleDevolverLivro() {
    if (!emprestimoId) return;
    try {
      setCarregando(true);
      setMensagem(null);

      await api.post(`/emprestimos/${emprestimoId}/devolucao`);
      setMensagem("✅ Devolução registrada com sucesso!");
      setEmprestimoId("");
    } catch (error) {
      console.error(error);
      setMensagem("❌ Erro ao registrar devolução. Verifique o ID e tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5f8ff]">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="ml-56 p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-10 text-center">
            Registrar Devolução
          </h1>

          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Informe o ID do empréstimo:
            </label>
            <input
              type="text"
              value={emprestimoId}
              onChange={(e) => setEmprestimoId(e.target.value)}
              placeholder="Exemplo: ID do empréstimo"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
            />

            <button
              onClick={handleDevolverLivro}
              disabled={carregando || emprestimoId.trim() === ""}
              className={`w-full mt-6 py-3 rounded-lg font-semibold text-white transition ${
                carregando
                  ? "bg-blue-400 cursor-wait"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {carregando ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> Processando...
                </span>
              ) : (
                "Confirmar Devolução"
              )}
            </button>

            {mensagem && (
              <p
                className={`mt-4 text-center font-medium ${
                  mensagem.includes("sucesso")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {mensagem}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
