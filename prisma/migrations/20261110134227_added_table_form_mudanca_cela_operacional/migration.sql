/*
  Warnings:

  - You are about to drop the `MudancaCelaOperacional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MudancaCelaOperacional";

-- CreateTable
CREATE TABLE "FormMudancaCelaOperacional" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "origem" JSONB NOT NULL,
    "destino" JSONB NOT NULL,

    CONSTRAINT "FormMudancaCelaOperacional_pkey" PRIMARY KEY ("id")
);
