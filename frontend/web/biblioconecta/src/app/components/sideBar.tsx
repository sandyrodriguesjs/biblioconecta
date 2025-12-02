"use client";

import { Home, BookCheck, LibraryBig, UserRoundCog, BookAlert, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface DecodedToken {
  role: string;
}

export default function SideBar() {
  const [role, setRole] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setRole(decoded.role);
      } catch (err) {}
    }
  }, []);

  const logout = async () => {
    const confirm = await Swal.fire({
      icon: "question",
      title: "Deseja sair?",
      showCancelButton: true,
      confirmButtonText: "Sair",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
    });

    if (confirm.isConfirmed) {
      localStorage.removeItem("token");
      Swal.fire({
        icon: "success",
        title: "Você saiu da conta",
        timer: 1200,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/";
      });
    }
  };

  return (
    <>
      {/* BOTÃO HAMBÚRGUER (somente no mobile) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#1e1e2f] text-white p-2 rounded-lg shadow-lg"
      >
        <Menu size={26} />
      </button>

      {/* OVERLAY ESCURO ao abrir o menu */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 w-56 bg-[#1e1e2f] text-white h-screen flex flex-col justify-between z-50
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div>
          <h1 className="text-2xl font-extrabold text-white text-center py-6 border-b border-gray-700">
            Biblio<span className="text-blue-400">Conecta</span>
          </h1>

          <nav className="flex flex-col mt-4">
            <Link
              href="/homePage"
              className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition"
              onClick={() => setOpen(false)}
            >
              <Home size={20} /> Home
            </Link>

            {role === "ADMIN" && (
              <>
                <Link
                  href="/listBook"
                  className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition"
                  onClick={() => setOpen(false)}
                >
                  <LibraryBig size={20} /> Acervo de Livros
                </Link>

                <Link
                  href="/pendingReservations"
                  className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition"
                  onClick={() => setOpen(false)}
                >
                  <BookCheck size={20} /> Reservas pendentes
                </Link>

                <Link
                  href="/adminUsers"
                  className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition"
                  onClick={() => setOpen(false)}
                >
                  <UserRoundCog size={20} /> Gerenciar Usuários
                </Link>

                <Link
                  href="/listLoansActive"
                  className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition"
                  onClick={() => setOpen(false)}
                >
                  <BookAlert size={20} /> Emprestimos Ativos
                </Link>
              </>
            )}
          </nav>
        </div>

        <button
          onClick={logout}
          className="mb-6 mx-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <LogOut size={20} /> Sair
        </button>
      </aside>
    </>
  );
}
