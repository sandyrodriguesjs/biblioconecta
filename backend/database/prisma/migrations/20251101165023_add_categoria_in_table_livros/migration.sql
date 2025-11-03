/*
  Warnings:

  - Added the required column `categoria` to the `livros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "livros" ADD COLUMN     "categoria" TEXT NOT NULL;
