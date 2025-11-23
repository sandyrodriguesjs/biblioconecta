"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "../components/sideBar";
import NavBar from "../components/navBar";
import api from "../../api/axios";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";

export default function AdminCreateUser() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/register", form);

      await Swal.fire({
        icon: "success",
        title: "Usuário criado!",
        text: "O novo usuário foi cadastrado com sucesso.",
        confirmButtonColor: "#0ea5e9",
      });

      router.push("/adminUsers");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Erro ao criar usuário",
        text: err.response?.data?.error || "Tente novamente.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f3f8fb]">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <NavBar />

        <main className="ml-56 flex flex-col items-center justify-center py-10">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border">
            <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
              Criar Usuário (Admin)
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
                <input
                  type="email"
                  name="email"
                  placeholder="email@exemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                  required
                />
              </div>

              {/* Senha */}
              <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
                <input
                  type="password"
                  name="password"
                  placeholder="•••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-black placeholder-gray-400"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  "Criar Usuário"
                )}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
