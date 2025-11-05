"use client";

import { LayoutDashboard, BookOpen, Users, Settings } from "lucide-react";
import Link from "next/link";

export default function SideBarAdm() {
  return (
    <aside className="w-64 bg-[#1c1f2b] text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">
          Biblio<span className="text-blue-400">Conecta</span>
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 mt-6 px-4">
        <Link
          href="/pages/homePageAdm"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-500 transition"
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/pages/manageBooks"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-500 transition"
        >
          <BookOpen size={18} />
          <span>Gerenciar Livros</span>
        </Link>

        <Link
          href="/pages/manageUsers"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-500 transition"
        >
          <Users size={18} />
          <span>Usuários</span>
        </Link>

        <Link
          href="/pages/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-500 transition"
        >
          <Settings size={18} />
          <span>Configurações</span>
        </Link>
      </nav>
    </aside>
  );
}
