/*
  Warnings:

  - The primary key for the `FormArmamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `calibre` on the `FormArmamento` table. All the data in the column will be lost.
  - You are about to drop the column `num` on the `FormArmamento` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `FormArmamento` table. All the data in the column will be lost.
  - Added the required column `armamento` to the `FormArmamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeracao` to the `FormArmamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FormArmamento_num_key";

-- AlterTable
ALTER TABLE "FormArmamento" DROP CONSTRAINT "FormArmamento_pkey",
DROP COLUMN "calibre",
DROP COLUMN "num",
DROP COLUMN "tipo",
ADD COLUMN     "armamento" TEXT NOT NULL,
ADD COLUMN     "numeracao" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Armamento" (
    "id" SERIAL NOT NULL,
    "num" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "calibre" TEXT NOT NULL,

    CONSTRAINT "Armamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Armamento_num_key" ON "Armamento"("num");
