"use client";

import { Home, BookCheck, LogOut, LibraryBig, UserRoundCog, BookAlert } from "lucide-react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface DecodedToken {
  role: string;
}

export default function SideBar() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setRole(decoded.role);
      } catch (err) {
        console.error("Erro ao decodificar token:", err);
      }
    }
  }, []);

  return (
    <aside className="fixed top-0 left-0 w-56 bg-[#1e1e2f] text-white h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-extrabold text-white text-center py-6 border-b border-gray-700">
          Biblio<span className="text-blue-400">Conecta</span>
        </h1>

        <nav className="flex flex-col mt-4">
          <Link href="/homePage" className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition">
            <Home size={20} /> Home
          </Link>

          {role === "ADMIN" && (
            <>
              <Link href="/listBook" className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition">
                <LibraryBig size={20} /> Acervo de Livros
              </Link>

              <Link href="/pendingReservations" className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition">
                <BookCheck size={20} /> Reservas pendentes
              </Link>

              <Link href="/adminUsers" className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition">
                <UserRoundCog size={20} /> Gerenciar Usuários
              </Link>

              <Link href="/listLoansActive" className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition">
                <BookAlert size={20} /> Emprestimos Ativos
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="mb-6">
        <button className="flex items-center gap-3 px-6 py-3 w-full hover:bg-[#2a2a3d] transition">
          <LogOut size={20} /> Sair
        </button>
      </div>
    </aside>
  );
}
