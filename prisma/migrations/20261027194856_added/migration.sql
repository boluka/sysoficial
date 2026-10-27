/*
  Warnings:

  - A unique constraint covering the columns `[relatorioId]` on the table `FormRevezamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `relatorioId` to the `FormRevezamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormRevezamento" ADD COLUMN     "relatorioId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FormRevezamento_relatorioId_key" ON "FormRevezamento"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormRevezamento" ADD CONSTRAINT "FormRevezamento_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
