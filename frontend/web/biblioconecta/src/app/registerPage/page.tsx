"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../api/axios";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/register", {
        name,
        email,
        password,
      });

      Swal.fire({
        icon: "success",
        title: "Cadastro realizado!",
        text: "Seu usuário foi criado com sucesso.",
        confirmButtonColor: "#0ea5e9",
      }).then(() => {
        router.push("/");
      });

    } catch (err: any) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Erro ao cadastrar",
        text:
          err.response?.data?.erro ||
          "Não foi possível criar a conta. Tente novamente.",
        confirmButtonColor: "#d33",
      });

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f8fb] px-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-black">
        Cadastre-se!
      </h1>

      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-xs">
        
        {/* Nome */}
        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
          <input
            type="email"
            placeholder="seuemail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            required
          />
        </div>

        {/* Senha */}
        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
          <input
            type="password"
            placeholder="•••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            required
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-sky-400 to-sky-500 text-white py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
        >
          {loading ? "Cadastrando..." : "Cadastre-se →"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-5">
        Já possui uma conta?{" "}
        <Link
          href="/"
          className="text-sky-500 font-medium hover:underline hover:text-sky-600 transition"
        >
          Faça login
        </Link>
      </p>
    </div>
  );
}
