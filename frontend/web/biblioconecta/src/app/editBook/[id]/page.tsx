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

  // Buscar dados do livro
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

  // Upload da capa
  const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCapaFile(file);
    setCapaPreview(file ? URL.createObjectURL(file) : capaPreview);
  };

  const removerCapa = () => {
    setCapaFile(null);
    setCapaPreview("/default-book-cover.png");
  };

  // Enviar atualização
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

        <main className="ml-56 p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Editar Livro
          </h1>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 grid grid-cols-3 gap-6"
            >
              <div>
                <div className="w-40 h-60 rounded-lg overflow-hidden bg-gray-200 shadow">
                  <img
                    src={capaPreview || "/default-book-cover.png"}
                    className="w-full h-full object-cover"
                  />
                </div>

                <label className="mt-4 block">
                  <span className="cursor-pointer flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-100">
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
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Remover capa
                </button>
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="font-semibold text-black">Título</label>
                  <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="font-semibold text-black">ISBN</label>
                  <input
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="font-semibold text-black">Autor</label>
                  <input
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="font-semibold text-black">Editora</label>
                  <input
                    value={editora}
                    onChange={(e) => setEditora(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="font-semibold text-black">Ano</label>
                  <input
                    value={anoPublicacao}
                    onChange={(e) => setAnoPublicacao(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-black"
                  />
                </div>

                <div className="col-span-2">
                  <label className="font-semibold text-black">Sinopse</label>
                  <textarea
                    value={sinopse}
                    onChange={(e) => setSinopse(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 h-32 text-black"
                  />
                </div>

                <div className="col-span-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
