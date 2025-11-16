"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";
import api from "../../api/axios";
import { Loader2, Upload, X } from "lucide-react";

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
  const [erro, setErro] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

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
    setErro(null);
    setOkMsg(null);

    const erroValid = validar();
    if (erroValid) {
      setErro(erroValid);
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

      setOkMsg("📚 Livro cadastrado com sucesso!");
      setTimeout(() => router.push("/homePage"), 1200);
    } catch (err: any) {
      setErro(
        err?.response?.data?.error ??
        "Erro ao cadastrar livro. Verifique os dados e tente novamente."
      );
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

          {erro && (
            <div className="max-w-4xl mx-auto mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded">
              {erro}
            </div>
          )}
          {okMsg && (
            <div className="max-w-4xl mx-auto mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded">
              {okMsg}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
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

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  ISBN *
                </label>
                <input
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="Ex.: 9788543101234"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Título *
                </label>
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex.: A Arte de Viver"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Autor(a) *
                </label>
                <input
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  placeholder="Ex.: Vitória Almeida"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Editora
                </label>
                <input
                  value={editora}
                  onChange={(e) => setEditora(e.target.value)}
                  placeholder="Ex.: Editora Fictícia"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Ano de publicação *
                </label>
                <input
                  value={anoPublicacao}
                  onChange={(e) => setAnoPublicacao(e.target.value)}
                  placeholder="Ex.: 2025"
                  maxLength={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Categoria
                </label>
                <input
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  placeholder="Ex.: Romance, História, Ciência..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Sinopse *
                </label>
                <textarea
                  value={sinopse}
                  onChange={(e) => setSinopse(e.target.value)}
                  rows={5}
                  placeholder="Escreva um resumo breve do livro..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>

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
                  className={`px-5 py-2 rounded-lg text-white font-semibold flex items-center gap-2 ${enviando
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
