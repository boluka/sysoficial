/*
  Warnings:

  - You are about to drop the column `numeracao` on the `FormArmamento` table. All the data in the column will be lost.
  - Added the required column `municao` to the `FormArmamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtCarabinaQuinze` to the `FormArmamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtCarabinaTrinta` to the `FormArmamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtPistola` to the `FormArmamento` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `armamento` on the `FormArmamento` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FormArmamento" DROP COLUMN "numeracao",
ADD COLUMN     "municao" INTEGER NOT NULL,
ADD COLUMN     "qtCarabinaQuinze" INTEGER NOT NULL,
ADD COLUMN     "qtCarabinaTrinta" INTEGER NOT NULL,
ADD COLUMN     "qtPistola" INTEGER NOT NULL,
DROP COLUMN "armamento",
ADD COLUMN     "armamento" JSONB NOT NULL;
