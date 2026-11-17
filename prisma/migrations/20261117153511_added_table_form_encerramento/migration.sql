-- CreateTable
CREATE TABLE "FormEncerramento" (
    "id" SERIAL NOT NULL,
    "chefeRecebe" TEXT NOT NULL,
    "chefeEntrega" TEXT NOT NULL,
    "efetivoCarc" INTEGER NOT NULL,
    "transitoCarc" INTEGER NOT NULL,
    "mat_carga" TEXT NOT NULL,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormEncerramento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormEncerramento_relatorioId_key" ON "FormEncerramento"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormEncerramento" ADD CONSTRAINT "FormEncerramento_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
