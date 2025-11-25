"use client";
import { useEffect, useRef, useState } from "react";
import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";
import api from "../../api/axios";
import { Camera, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

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

  //Buscar dados do usuário
  const buscarDadosUsuario = async () => {
    try {
      setCarregando(true);

      // Dados do usuário
      const { data } = await api.get("/me");
      setUsuario({
        nome: data.name,
        email: data.email,
        foto: data.foto ?? null,
      });

      //Buscar histórico real do mês atual
      const historyResponse = await api.get("/reading-history/current-month");

      setHistorico(
        historyResponse.data.map((item: any) => ({
          titulo: item.exemplar.livro.titulo,
          dataLeitura: item.data_retirada,
        }))
      );

    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao carregar dados",
        text: "Não foi possível carregar os dados do usuário.",
      });
      setErro("Erro ao carregar usuário.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDadosUsuario();
  }, []);

  const formatarData = (data: string): string =>
    new Date(data).toLocaleDateString("pt-BR");

  const obterInicial = (nome: string): string =>
    nome.charAt(0).toUpperCase();

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

      Swal.fire({
        icon: "success",
        title: "Foto atualizada!",
        timer: 1300,
        showConfirmButton: false,
      });

    } catch (err) {
      console.error("Erro ao atualizar foto:", err);
      Swal.fire({
        icon: "error",
        title: "Erro ao enviar foto",
        text: "Não foi possível atualizar sua foto de perfil.",
      });
    } finally {
      setAtualizando(false);
    }
  };

  const handleRemoverFoto = async () => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Remover foto?",
      text: "Deseja realmente remover sua foto de perfil?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, remover",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      setAtualizando(true);
      await api.put("/me", { foto: null });

      setUsuario((prev) => (prev ? { ...prev, foto: null } : prev));
      setPreview(null);

      Swal.fire({
        icon: "success",
        title: "Foto removida!",
        timer: 1200,
        showConfirmButton: false,
      });

    } catch (err) {
      console.error("Erro ao remover foto:", err);
      Swal.fire({
        icon: "error",
        title: "Erro ao remover foto",
      });
    } finally {
      setAtualizando(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f5f8ff] flex">
      <div className="fixed top-0 left-0 z-50">
        <SideBar />
      </div>

      <div className="flex-1 flex flex-col ml-20">
        <NavBar />

        <main className="ml-56 p-8 flex-1">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-10">
            Perfil do Usuário
          </h1>

          {carregando ? (
            <div className="text-center py-10 text-gray-600">
              Carregando informações...
            </div>
          ) : usuario ? (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

              <div className="bg-white p-6 shadow-md rounded-xl flex flex-col items-center">

                <div className="relative mb-4">
                  {usuario.foto || preview ? (
                    <img
                      src={preview || usuario.foto!}
                      className="w-32 h-32 rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-4xl text-white shadow-lg">
                      {obterInicial(usuario.nome)}
                    </div>
                  )}

                  {/* Botões */}
                  <div className="absolute -bottom-2 right-0 flex gap-2">
                    <button
                      onClick={() => inputRef.current?.click()}
                      disabled={atualizando}
                      className="p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
                    >
                      <Camera className="w-4 h-4" />
                    </button>

                    {(usuario.foto || preview) && (
                      <button
                        onClick={handleRemoverFoto}
                        disabled={atualizando}
                        className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <input
                    ref={inputRef}
                    type="file"
                    onChange={handleFotoChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                <h2 className="text-xl font-semibold text-black">{usuario.nome}</h2>
                <p className="text-black">{usuario.email}</p>
              </div>

              <div className="col-span-2 bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-black">
                  Histórico de Leitura
                </h2>

                {historico.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Nenhum livro encontrado neste mês.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {historico.map((livro, index) => (
                      <div
                        key={index}
                        className="border p-4 rounded-lg hover:bg-gray-50 flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-medium text-gray-800">{livro.titulo}</h3>
                          <p className="text-sm text-gray-500">
                            Emprestado em: {formatarData(livro.dataLeitura)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
