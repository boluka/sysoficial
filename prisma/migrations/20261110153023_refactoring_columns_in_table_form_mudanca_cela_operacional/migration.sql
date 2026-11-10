/*
  Warnings:

  - You are about to drop the column `destino` on the `FormMudancaCelaOperacional` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `FormMudancaCelaOperacional` table. All the data in the column will be lost.
  - You are about to drop the column `origem` on the `FormMudancaCelaOperacional` table. All the data in the column will be lost.
  - Added the required column `presos` to the `FormMudancaCelaOperacional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormMudancaCelaOperacional" DROP COLUMN "destino",
DROP COLUMN "nome",
DROP COLUMN "origem",
ADD COLUMN     "presos" JSONB NOT NULL;
