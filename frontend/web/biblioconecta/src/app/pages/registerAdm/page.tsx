"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, KeyRound } from "lucide-react";

export default function RegisterAdm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cadastro do admin:", { email, password, accessCode });
    // Aqui você pode conectar com sua API futuramente:
    // await api.post("/admin/register", { email, password, accessCode });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f8fb] px-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-black">
        Cadastro de Administrador
      </h1>

      {/* Formulário */}
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        {/* Campo de e-mail */}
        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
          <Mail className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="admin@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Campo de senha */}
        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
          <Lock className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="•••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Campo código de acesso */}
        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
          <KeyRound className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Código de acesso"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Botão principal */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
        >
          Cadastrar administrador →
        </button>
      </form>

      {/* Link para login */}
      <p className="text-sm text-gray-600 mt-5">
        Já possui uma conta de admin?{" "}
        <Link
          href="/pages/loginAdm"
          className="text-sky-500 font-medium hover:underline hover:text-sky-600 transition"
        >
          Fazer login
        </Link>
      </p>
    </div>
  );
}
