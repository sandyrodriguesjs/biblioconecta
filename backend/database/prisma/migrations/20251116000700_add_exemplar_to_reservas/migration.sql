/*
  Warnings:

  - Added the required column `id_exemplar` to the `reservas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservas" ADD COLUMN     "id_exemplar" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_id_exemplar_fkey" FOREIGN KEY ("id_exemplar") REFERENCES "exemplares"("id_exemplar") ON DELETE RESTRICT ON UPDATE CASCADE;
