"use client";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

export default function NavBar() {
  const router = useRouter();

  const handlePerfilClick = () => {
    router.push("/profileUser");
  };

  return (
    <header className="w-full h-16 bg-blue-500 border-b border-gray-200 flex items-center justify-end px-6">
      {/* 🔹 Ícone de usuário clicável */}
      <button
        onClick={handlePerfilClick}
        className="w-10 h-10 rounded-full bg-blue-400 hover:bg-blue-600 flex items-center justify-center text-white shadow-md transition-all duration-200"
        title="Ir para o perfil"
      >
        <User className="w-5 h-5" />
      </button>
    </header>
  );
}
