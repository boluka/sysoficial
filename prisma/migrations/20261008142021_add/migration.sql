-- CreateTable
CREATE TABLE "FormArmamento" (
    "id" SERIAL NOT NULL,
    "num" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "calibre" TEXT NOT NULL,

    CONSTRAINT "FormArmamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormArmamento_num_key" ON "FormArmamento"("num");
