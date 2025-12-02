"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import NavBar from "../../components/navBar";
import SideBar from "../../components/sideBar";
import api from "../../../api/axios";
import { Loader2, Upload, X } from "lucide-react";
import Swal from "sweetalert2";

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const idLivro = params.id as string;

  const [isbn, setIsbn] = useState("");
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [categoria, setCategoria] = useState("");
  const [idioma, setIdioma] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [capaPreview, setCapaPreview] = useState<string | null>(null);
  const [capaFile, setCapaFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarLivro() {
      try {
        const response = await api.get(`/livros/${idLivro}`);
        const livro = response.data;

        setIsbn(livro.isbn);
        setTitulo(livro.titulo);
        setAutor(livro.autor);
        setEditora(livro.editora || "");
        setAnoPublicacao(livro.ano_publicacao);
        setSinopse(livro.sinopse);
        setCategoria(livro.categoria || "");
        setIdioma(livro.idioma || "");
        setTags(livro.tags || []);
        setCapaPreview(livro.capa_url || "/default-book-cover.png");

      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Erro ao carregar livro",
          text: "Não foi possível carregar os dados. Tente novamente.",
          confirmButtonColor: "#d33",
        });
      } finally {
        setLoading(false);
      }
    }
    carregarLivro();
  }, [idLivro]);

  const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCapaFile(file);
    setCapaPreview(file ? URL.createObjectURL(file) : capaPreview);
  };

  const removerCapa = () => {
    setCapaFile(null);
    setCapaPreview("/default-book-cover.png");
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("isbn", isbn);
      form.append("titulo", titulo);
      form.append("autor", autor);
      form.append("editora", editora);
      form.append("ano_publicacao", anoPublicacao);
      form.append("sinopse", sinopse);
      form.append("categoria", categoria);
      form.append("idioma", idioma);
      form.append("tags", JSON.stringify(tags));
      if (capaFile) form.append("capa", capaFile);

      await api.put(`/livros/${idLivro}`, form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      Swal.fire({
        icon: "success",
        title: "Livro atualizado!",
        text: "As alterações foram salvas com sucesso.",
        confirmButtonColor: "#2563eb",
      });

      setTimeout(() => router.push("/homePage"), 1200);

    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erro ao atualizar",
        text: err?.response?.data?.error ?? "Não foi possível atualizar o livro.",
        confirmButtonColor: "#d33",
      });
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f5f8ff]">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar />

        <main className="lg:ml-56 p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 md:mb-8 text-center">
            Editar Livro
          </h1>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Seção da capa */}
              <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
                <div className="w-32 h-48 md:w-40 md:h-60 rounded-lg overflow-hidden bg-gray-200 shadow mx-auto lg:mx-0">
                  <img
                    src={capaPreview || "/default-book-cover.png"}
                    className="w-full h-full object-cover"
                    alt="Capa do livro"
                  />
                </div>

                <div className="mt-4 flex flex-col items-center lg:items-start gap-2 w-full">
                  <label className="block w-full">
                    <span className="cursor-pointer flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-100 text-sm md:text-base w-full">
                      <Upload className="w-4 h-4" /> Alterar capa
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCapaChange}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={removerCapa}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remover capa
                  </button>
                </div>
              </div>

              {/* Seção dos campos do formulário */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="font-semibold text-black">Título</label>
                  <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-black mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-black">ISBN</label>
                  <input
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-black mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-black">Autor</label>
                  <input
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-black mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-black">Editora</label>
                  <input
                    value={editora}
                    onChange={(e) => setEditora(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-black mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold text-black">Ano</label>
                  <input
                    value={anoPublicacao}
                    onChange={(e) => setAnoPublicacao(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-black mt-1"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-semibold text-black">Sinopse</label>
                  <textarea
                    value={sinopse}
                    onChange={(e) => setSinopse(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 h-32 text-black mt-1"
                    required
                  />
                </div>

                {/* Campos adicionais que estavam faltando */}
                <div>
                  <label className="font-semibold text-black">Categoria</label>
                  <input
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-black mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold text-black">Idioma</label>
                  <input
                    value={idioma}
                    onChange={(e) => setIdioma(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-black mt-1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-semibold text-black">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {tags.map((tag, index) => (
                      <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botões de ação */}
                <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors order-1 sm:order-2"
                  >
                    Salvar alterações
                  </button>
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}