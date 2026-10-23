/*
  Warnings:

  - The `atestado_dias` column on the `FormExpediente` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FormExpediente" DROP COLUMN "atestado_dias",
ADD COLUMN     "atestado_dias" INTEGER;
