/*
  Warnings:

  - A unique constraint covering the columns `[relatorioId]` on the table `FormMudancaCelaOperacional` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `relatorioId` to the `FormMudancaCelaOperacional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormMudancaCelaOperacional" ADD COLUMN     "relatorioId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FormMudancaCelaOperacional_relatorioId_key" ON "FormMudancaCelaOperacional"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormMudancaCelaOperacional" ADD CONSTRAINT "FormMudancaCelaOperacional_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
