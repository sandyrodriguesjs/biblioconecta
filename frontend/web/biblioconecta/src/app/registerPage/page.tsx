"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../api/axios";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // 🚀 Envia para o backend
      const response = await api.post("/register", {
        name,
        email,
        password,
      });

      setSuccess("Usuário cadastrado com sucesso!");
      setTimeout(() => router.push("/"), 1500); // Redireciona para o login

      console.log(response.data);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.erro || "Erro ao cadastrar. Tente novamente."
      );
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

        {/* Mensagens */}
        {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center font-medium">{success}</p>}

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
