-- CreateTable
CREATE TABLE "FormTrocaHe" (
    "id" SERIAL NOT NULL,
    "substituto" TEXT,
    "substituido" TEXT,
    "data_entrada" TEXT,
    "horario_entrada" TEXT,
    "data_saida" TEXT,
    "horario_saida" TEXT,
    "servidor_he" TEXT,
    "inicio_he" TEXT,
    "termino_he" TEXT,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormTrocaHe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormTrocaHe_relatorioId_key" ON "FormTrocaHe"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormTrocaHe" ADD CONSTRAINT "FormTrocaHe_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
