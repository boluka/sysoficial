/*
  Warnings:

  - A unique constraint covering the columns `[relatorioId]` on the table `FormArmamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `relatorioId` to the `FormArmamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormArmamento" ADD COLUMN     "relatorioId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FormArmamento_relatorioId_key" ON "FormArmamento"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormArmamento" ADD CONSTRAINT "FormArmamento_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
