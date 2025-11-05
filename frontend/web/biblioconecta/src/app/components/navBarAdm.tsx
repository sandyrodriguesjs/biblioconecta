"use client";

export default function NavBarAdm() {
  return (
    <header className="w-full h-16 bg-blue-600 border-b border-gray-200 flex items-center justify-end px-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
          A
        </div>
        <span className="text-sm text-white font-medium">Administrador</span>
      </div>
    </header>
  );
}
