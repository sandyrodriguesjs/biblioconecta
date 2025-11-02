"use client";
import { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import SideBar from "../../components/sideBar";

interface Usuario {
  nome: string;
  email: string;
  avatar?: string;
}

interface LivroHistorico {
  id: string;
  titulo: string;
  dataLeitura: string;
  autor?: string;
}

export default function PerfilUsuarioPage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [historico, setHistorico] = useState<LivroHistorico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const buscarDadosUsuario = async () => {
    try {
      setCarregando(true);
      setErro(null);
      
      const resposta = await fetch("http://localhost:3030/me");
      
      if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status} ao carregar dados`);
      }

      const dados = await resposta.json();

      setUsuario({
        nome: dados.nome,
        email: dados.email,
        avatar: dados.avatar
      });

      setHistorico(dados.historico || []);
      
    } catch (error) {
      setErro("Não foi possível carregar os dados do usuário.");
      console.error("Erro na requisição:", error);
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

  const obterInicial = (nome: string): string => {
    return nome.charAt(0).toUpperCase();
  };

  const handleSair = () => {
    // Lógica para logout
    console.log("Usuário solicitou logout");
    alert("Funcionalidade de logout seria implementada aqui!");
  };

  if (carregando) {
    return (
      <div className="relative min-h-screen bg-[#f5f8ff] flex">
        {/* Sidebar flutuante no canto superior esquerdo */}
        <div className="fixed top-0 left-0 z-50">
          <SideBar />
        </div>
        
        <div className="flex-1 flex flex-col ml-20">
          <NavBar />
          <main className="flex-1 p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando perfil...</p>
            </div>
          </main>
        </div>

        {/* Botão Sair flutuante no canto inferior direito */}
        <button
          onClick={handleSair}
          className="fixed bottom-6 right-6 z-50 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 group"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="group-hover:block hidden">Sair</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#f5f8ff] flex">
      {/* Sidebar flutuante no canto superior esquerdo */}
      <div className="fixed top-0 left-0 z-50">
        <SideBar />
      </div>
      
      <div className="flex-1 flex flex-col ml-20">
        <NavBar />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-10">
            Perfil do Usuário
          </h1>

          {erro && (
            <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
              <p className="mb-3">{erro}</p>
              <button
                onClick={buscarDadosUsuario}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {usuario && (
            <>
              {/* Seção de Informações do Usuário */}
              <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold mb-6 shadow-xl">
                    {usuario.avatar ? (
                      <img 
                        src={usuario.avatar} 
                        alt={usuario.nome}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      obterInicial(usuario.nome)
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{usuario.nome}</h2>
                  <p className="text-gray-500 text-lg">{usuario.email}</p>
                </div>

                {/* Campos de Informação (somente leitura) */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                      Nome Completo
                    </label>
                    <div className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 bg-gray-50 text-gray-800 text-lg font-medium">
                      {usuario.nome}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                      Endereço de Email
                    </label>
                    <div className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 bg-gray-50 text-gray-800 text-lg font-medium">
                      {usuario.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Histórico de Leitura */}
              <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Histórico de Leitura
                  </h2>
                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                    {historico.length} {historico.length === 1 ? 'livro' : 'livros'}
                  </span>
                </div>

                {historico.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-300 text-6xl mb-4">📚</div>
                    <p className="text-gray-500 text-xl mb-2">Nenhum livro lido ainda</p>
                    <p className="text-gray-400">Seus livros aparecerão aqui após a leitura</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {historico.map((livro) => (
                        <div
                          key={livro.id}
                          className="border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 group"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors mb-2">
                                {livro.titulo}
                              </h3>
                              {livro.autor && (
                                <p className="text-gray-600 mb-3">por {livro.autor}</p>
                              )}
                              <p className="text-gray-500 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Lido em {formatarData(livro.dataLeitura)}
                              </p>
                            </div>
                            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                              Concluído
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 text-center">
                      <button className="text-blue-500 hover:text-blue-600 font-semibold transition-colors flex items-center justify-center gap-2 mx-auto text-lg">
                        Ver histórico completo
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Botão Sair flutuante no canto inferior direito */}
      <button
        onClick={handleSair}
        className="fixed bottom-6 right-6 z-50 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 group"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span className="group-hover:block hidden">Sair</span>
      </button>
    </div>
  );
}
