/*
  Warnings:

  - You are about to drop the `FormEntradaSaida` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormEntradaSaida" DROP CONSTRAINT "FormEntradaSaida_relatorioId_fkey";

-- DropTable
DROP TABLE "FormEntradaSaida";

-- CreateTable
CREATE TABLE "FormEntradaPresos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "procedencia" TEXT NOT NULL,
    "autorizado" TEXT NOT NULL,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormEntradaPresos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormEntradaPresos_relatorioId_key" ON "FormEntradaPresos"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormEntradaPresos" ADD CONSTRAINT "FormEntradaPresos_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
