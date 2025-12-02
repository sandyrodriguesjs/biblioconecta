"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import api from "../api/axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/login", { email, password });
      const { token } = response.data;

      localStorage.setItem("token", token);

      Swal.fire({
        icon: "success",
        title: "Login realizado!",
        text: "Bem-vindo de volta!",
        confirmButtonColor: "#3b82f6",
        timer: 1400,
        timerProgressBar: true,
      }).then(() => router.push("/homePage"));

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Falha ao entrar",
        text: err.response?.data?.erro || "Credenciais inválidas. Tente novamente.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f8fb] px-4 sm:px-6">
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
        >
          {loading ? "Entrando..." : "Entrar →"}
        </button>

        <Link href="/registerPage" className="w-full">
          <button
            type="button"
            className="w-full bg-gradient-to-r from-sky-400 to-sky-500 text-white py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            Cadastre-se →
          </button>
        </Link>
      </form>
    </div>
  );
}
