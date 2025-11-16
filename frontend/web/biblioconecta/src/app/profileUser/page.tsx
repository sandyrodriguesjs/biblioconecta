"use client";
import { useEffect, useRef, useState } from "react";
import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";
import api from "../../api/axios";
import { Camera, Trash2 } from "lucide-react";

interface Usuario {
  nome: string;
  email: string;
  foto?: string | null;
}

interface LivroHistorico {
  titulo: string;
  dataLeitura: string;
}

export default function PerfilUsuarioPage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [historico, setHistorico] = useState<LivroHistorico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [atualizando, setAtualizando] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 🔹 Busca dados do usuário logado
  const buscarDadosUsuario = async () => {
    try {
      setCarregando(true);
      const { data } = await api.get("/me");

      setUsuario({
        nome: data.name,
        email: data.email,
        foto: data.foto ?? null, // backend deve retornar a URL se existir
      });

      // Exemplo de histórico simulado
      setHistorico([
        { titulo: "A arte de viver", dataLeitura: "2025-01-10" },
        { titulo: "Vida longa", dataLeitura: "2025-03-22" },
      ]);
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      setErro("Não foi possível carregar os dados do usuário.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDadosUsuario();
  }, []);

  const formatarData = (data: string): string =>
    new Date(data).toLocaleDateString("pt-BR");

  const obterInicial = (nome: string): string => nome.charAt(0).toUpperCase();

  // 📸 Atualizar foto de perfil
  const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setAtualizando(true);

    const formData = new FormData();
    formData.append("foto", file);

    try {
      const response = await api.put("/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUsuario((prev) =>
        prev ? { ...prev, foto: response.data.foto ?? previewUrl } : prev
      );
    } catch (err) {
      console.error("Erro ao atualizar foto:", err);
      alert("Erro ao enviar a nova foto de perfil.");
    } finally {
      setAtualizando(false);
    }
  };

  // ❌ Remover foto
  const handleRemoverFoto = async () => {
    if (!confirm("Tem certeza que deseja remover sua foto de perfil?")) return;

    try {
      setAtualizando(true);
      await api.put("/me", { foto: null });
      setUsuario((prev) => (prev ? { ...prev, foto: null } : prev));
      setPreview(null);
    } catch (err) {
      console.error("Erro ao remover foto:", err);
      alert("Erro ao remover a foto de perfil.");
    } finally {
      setAtualizando(false);
    }
  };

  const handleSair = () => alert("Funcionalidade de logout aqui!");

  return (
    <div className="relative min-h-screen bg-[#f5f8ff] flex">
      <div className="fixed top-0 left-0 z-50">
        <SideBar />
      </div>

      <div className="flex-1 flex flex-col ml-20">
        <NavBar />

        <main className="ml-56 flex-1 p-8">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-10">
            Perfil do Usuário
          </h1>

          {carregando ? (
            <div className="text-center text-gray-600 py-10">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              Carregando informações do perfil...
            </div>
          ) : erro ? (
            <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
              {erro}
              <button
                onClick={buscarDadosUsuario}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg block mx-auto"
              >
                Tentar Novamente
              </button>
            </div>
          ) : (
            usuario && (
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 🔹 Perfil */}
                <div className="col-span-1 bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
                  {/* Foto */}
                  <div className="relative mb-4">
                    {usuario.foto || preview ? (
                      <img
                        src={preview || usuario.foto!}
                        alt="Foto do usuário"
                        className="w-32 h-32 rounded-full object-cover shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                        {obterInicial(usuario.nome)}
                      </div>
                    )}

                    {/* Ações */}
                    <div className="absolute -bottom-2 right-0 flex gap-2">
                      <button
                        onClick={() => inputRef.current?.click()}
                        disabled={atualizando}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow transition"
                        title="Alterar foto"
                      >
                        <Camera className="w-4 h-4" />
                      </button>

                      {(usuario.foto || preview) && (
                        <button
                          onClick={handleRemoverFoto}
                          disabled={atualizando}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition"
                          title="Remover foto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Input invisível */}
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFotoChange}
                      className="hidden"
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {usuario.nome}
                  </h2>
                  <p className="text-gray-500 mb-6">{usuario.email}</p>

                  <div className="w-full space-y-5">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Nome Completo
                      </label>
                      <div className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700">
                        {usuario.nome}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Email
                      </label>
                      <div className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700">
                        {usuario.email}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 🔹 Histórico */}
                <div className="col-span-2 bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Histórico de Leitura
                  </h2>

                  {historico.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      Nenhum livro finalizado ainda.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {historico.map((livro, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                        >
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {livro.titulo}
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                              Finalizado em: {formatarData(livro.dataLeitura)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </main>
      </div>

      {/* 🔘 Sair */}
      <button
        onClick={handleSair}
        className="fixed bottom-6 left-6 z-50 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Sair
      </button>
    </div>
  );
}
