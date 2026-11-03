/*
  Warnings:

  - You are about to drop the column `autorizado` on the `FormEntradaPresos` table. All the data in the column will be lost.
  - You are about to drop the column `documento` on the `FormEntradaPresos` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `FormEntradaPresos` table. All the data in the column will be lost.
  - You are about to drop the column `procedencia` on the `FormEntradaPresos` table. All the data in the column will be lost.
  - Added the required column `presos` to the `FormEntradaPresos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormEntradaPresos" DROP COLUMN "autorizado",
DROP COLUMN "documento",
DROP COLUMN "nome",
DROP COLUMN "procedencia",
ADD COLUMN     "presos" JSONB NOT NULL;
