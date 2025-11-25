"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";
import api from "../../api/axios";
import { Loader2, Upload, X } from "lucide-react";
import Swal from "sweetalert2";

export default function CreateBookPage() {
  const router = useRouter();

  const [isbn, setIsbn] = useState("");
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [categoria, setCategoria] = useState("");

  const [capaFile, setCapaFile] = useState<File | null>(null);
  const [capaPreview, setCapaPreview] = useState<string | null>(null);

  const [enviando, setEnviando] = useState(false);

  const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCapaFile(file);
    setCapaPreview(file ? URL.createObjectURL(file) : null);
  };

  const removerCapa = () => {
    setCapaFile(null);
    setCapaPreview(null);
  };

  const validar = () => {
    if (!isbn.trim()) return "Informe o ISBN.";
    if (!titulo.trim()) return "Informe o título.";
    if (!autor.trim()) return "Informe o autor.";
    if (!anoPublicacao.trim() || !/^\d{4}$/.test(anoPublicacao))
      return "Ano de publicação inválido (use 4 dígitos).";
    if (!sinopse.trim()) return "Informe a sinopse.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const erroValid = validar();
    if (erroValid) {
      Swal.fire({
        icon: "warning",
        title: "Atenção",
        text: erroValid,
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      setEnviando(true);

      const form = new FormData();
      form.append("isbn", isbn);
      form.append("titulo", titulo);
      form.append("autor", autor);
      if (editora) form.append("editora", editora);
      form.append("ano_publicacao", anoPublicacao);
      form.append("sinopse", sinopse);
      if (categoria) form.append("categoria", categoria);
      if (capaFile) form.append("capa", capaFile);

      await api.post("/livros", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Livro cadastrado!",
        text: "O livro foi adicionado ao acervo.",
        confirmButtonColor: "#2563EB",
      });

      setTimeout(() => router.push("/homePage"), 1500);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Erro ao cadastrar",
        text:
          err?.response?.data?.error ??
          "Não foi possível cadastrar o livro.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f8ff]">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <NavBar />

        <main className="ml-56 p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Cadastrar Livro
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* COLUNA DA CAPA */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col items-center">
                <div className="w-40 h-60 rounded-lg overflow-hidden bg-gray-200 shadow flex items-center justify-center">
                  {capaPreview ? (
                    <img
                      src={capaPreview}
                      alt="Capa do livro"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs px-2 text-center">
                      Nenhuma capa selecionada
                    </span>
                  )}
                </div>

                <label className="mt-4 w-full">
                  <div className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Selecionar capa
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCapaChange}
                      className="hidden"
                    />
                  </div>
                </label>

                {capaFile && (
                  <button
                    type="button"
                    onClick={removerCapa}
                    className="mt-2 text-red-600 text-sm flex items-center gap-1 hover:underline"
                  >
                    <X className="w-4 h-4" />
                    Remover capa
                  </button>
                )}

                <p className="text-xs text-gray-500 mt-3 text-center">
                  Formatos aceitos: JPG, PNG. Tamanho recomendado: 400x550.
                </p>
              </div>
            </div>

            {/* CAMPOS DO LIVRO */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* ISBN */}
              <div>
                <label className="block text-sm font-medium text-gray-700">ISBN *</label>
                <input
                  type="text"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="9781234567890"
                />
              </div>

              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Título *</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite o título do livro"
                />
              </div>

              {/* Autor */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Autor *</label>
                <input
                  type="text"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do autor"
                />
              </div>

              {/* Editora */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Editora</label>
                <input
                  type="text"
                  value={editora}
                  onChange={(e) => setEditora(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome da editora"
                />
              </div>

              {/* Ano de Publicação */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ano de Publicação *
                </label>
                <input
                  type="number"
                  value={anoPublicacao}
                  onChange={(e) => setAnoPublicacao(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2020"
                />
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Categoria</label>
                <input
                  type="text"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex.: Romance, Fantasia, Técnico..."
                />
              </div>

              {/* Sinopse */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Sinopse *</label>
                <textarea
                  value={sinopse}
                  onChange={(e) => setSinopse(e.target.value)}
                  rows={4}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Escreva uma breve sinopse do livro..."
                />
              </div>

              {/* Botões */}
              <div className="md:col-span-2 mt-2 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={enviando}
                  className={`px-5 py-2 rounded-lg text-white font-semibold flex items-center gap-2 ${
                    enviando
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {enviando && <Loader2 className="w-4 h-4 animate-spin" />}
                  Cadastrar
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
