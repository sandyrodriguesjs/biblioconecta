"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import api from "../api/axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      // ✅ Recebe o token JWT do backend
      const { token } = response.data;

      // ✅ Salva o token no localStorage
      localStorage.setItem("token", token);

      // ✅ Redireciona para a página principal
      router.push("/homePage");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.erro ||
          "Erro ao fazer login. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f8fb] px-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-black">
        Bem-vindo!
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
          <Mail className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="seuemail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            required
          />
        </div>

        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
          <Lock className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="•••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
        >
          {loading ? "Entrando..." : "Entrar →"}
        </button>

        <Link
          href="/registerPage"
          className="text-sky-500 font-medium hover:underline hover:text-sky-600 transition"
        >
          <button
            type="button"
            className="w-full bg-gradient-to-r from-sky-400 to-sky-500 text-white py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            Cadastre-se →
          </button>
        </Link>
      </form>

      <p className="text-sm text-gray-500 mt-4 hover:underline cursor-pointer">
        Esqueceu a senha?
      </p>
    </div>
  );
}
