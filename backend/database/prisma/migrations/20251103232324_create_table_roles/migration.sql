/*
  Warnings:

  - Added the required column `id_role` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "id_role" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "roles" (
    "id_role" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_role")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_nome_key" ON "roles"("nome");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;
