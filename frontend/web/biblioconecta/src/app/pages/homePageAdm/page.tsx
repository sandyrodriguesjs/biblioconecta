"use client";

import NavBarAdm from "@/app/components/navBarAdm";
import SideBarAdm from "@/app/components/sideBarAdm";

export default function HomePageAdm() {
  return (
    <div className="flex min-h-screen bg-[#f3f8fb]">
      {/* Sidebar */}
      <SideBarAdm />

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1">
        <NavBarAdm />

        <main className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Bem-vindo, Administrador 👋
          </h1>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Livros cadastrados
              </h2>
              <p className="text-3xl font-bold text-blue-500">124</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Usuários ativos
              </h2>
              <p className="text-3xl font-bold text-blue-500">58</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Reservas em andamento
              </h2>
              <p className="text-3xl font-bold text-blue-500">12</p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Últimas atividades
            </h2>
            <ul className="bg-white shadow rounded-xl divide-y divide-gray-200">
              <li className="px-6 py-4 text-gray-700">
                📚 Novo livro “A Arte de Viver” adicionado por Maria.
              </li>
              <li className="px-6 py-4 text-gray-700">
                👤 Usuário João fez login.
              </li>
              <li className="px-6 py-4 text-gray-700">
                📖 Reserva do livro “História da Ciência” aprovada.
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
