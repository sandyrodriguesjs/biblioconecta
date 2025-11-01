"use client";
import { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import SideBar from "../../components/sideBar";

interface Usuario {
  nome: string;
  email: string;
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

  const buscarDadosUsuario = async () => {
    try {
      setCarregando(true);
      const resposta = await fetch("http://localhost:3030/me");

      if (!resposta.ok) {
        throw new Error("Erro ao carregar dados do usuário");
      }

      const dados = await resposta.json();

      setUsuario({
        nome: dados.nome,
        email: dados.email,
      });

      if (dados.historico) {
        setHistorico(dados.historico);
      }
    } catch (error) {
      setErro("Não foi possível carregar os dados do usuário. Tente novamente mais tarde.");
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDadosUsuario();
  }, []);

  const formatarData = (data: string): string => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const obterInicial = (nome: string): string => nome.charAt(0).toUpperCase();

  const handleSair = () => {
    alert("Funcionalidade de logout seria implementada aqui!");
  };

  return (
    <div className="relative min-h-screen bg-[#f5f8ff] flex">
      {/* Sidebar flutuante no canto superior esquerdo */}
      <div className="fixed top-0 left-0 z-50">
        <SideBar />
      </div>
      
      <div className="flex-1 flex flex-col ml-20">
        <NavBar />

        <main className="ml-56 flex-1 p-8">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-10">
            Perfil do Usuário
          </h1>

          {carregando && (
            <div className="text-center text-gray-600 py-10">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              Carregando informações do perfil...
            </div>
          )}

          {erro && (
            <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
              {erro}
              <button
                onClick={buscarDadosUsuario}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg block mx-auto"
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {!carregando && usuario && (
            <>
              {/* Seção de dados do usuário */}
              <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg">
                    {obterInicial(usuario.nome)}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{usuario.nome}</h2>
                  <p className="text-gray-500">{usuario.email}</p>
                </div>

                {/* Exibição dos dados (apenas texto - não editáveis) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Nome Completo
                    </label>
                    <div className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700">
                      {usuario.nome}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email
                    </label>
                    <div className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700">
                      {usuario.email}
                    </div>
                  </div>
                </div>

                {/* Botão "Atualizar Informações" REMOVIDO */}
              </div>

              {/* Histórico de leitura */}
              <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Histórico de Leitura
                </h2>

                {historico.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Nenhum livro lido ainda.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {historico.map((livro, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {livro.titulo}
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                              Data de leitura: {formatarData(livro.dataLeitura)}
                            </p>
                          </div>
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                            Lido
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 text-center">
                  <button className="text-blue-500 hover:text-blue-600 font-medium">
                    Ver histórico completo →
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Botão Sair flutuante no canto inferior direito */}
      <button
        onClick={handleSair}
        className="fixed bottom-6 right-6 z-50 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sair
      </button>
    </div>
  );
}
