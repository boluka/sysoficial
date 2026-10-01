-- CreateTable
CREATE TABLE "RelatorioDoDia" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "RelatorioDoDia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormRecebimento" (
    "id" TEXT NOT NULL,
    "plantao" TEXT NOT NULL,
    "chefeReceb" TEXT NOT NULL,
    "chefeEntrega" TEXT NOT NULL,
    "chefeAuxiliar" TEXT NOT NULL,
    "efetivoCarc" INTEGER NOT NULL,
    "transitoCarc" INTEGER NOT NULL,
    "mat_carga" TEXT NOT NULL,
    "mat_belico" TEXT NOT NULL,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormRecebimento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RelatorioDoDia_data_key" ON "RelatorioDoDia"("data");

-- CreateIndex
CREATE UNIQUE INDEX "FormRecebimento_relatorioId_key" ON "FormRecebimento"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormRecebimento" ADD CONSTRAINT "FormRecebimento_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
