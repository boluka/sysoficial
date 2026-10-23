/*
  Warnings:

  - You are about to drop the column `atraso_ate` on the `FormExpediente` table. All the data in the column will be lost.
  - You are about to drop the column `atraso_de` on the `FormExpediente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FormExpediente" DROP COLUMN "atraso_ate",
DROP COLUMN "atraso_de",
ADD COLUMN     "atraso_horario_ate" TEXT,
ADD COLUMN     "atraso_horario_de" TEXT;
