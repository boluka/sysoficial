-- CreateTable
CREATE TABLE "FormEntradaSaida" (
    "id" SERIAL NOT NULL,
    "entrada_presos" JSONB,
    "saida_presos" JSONB,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormEntradaSaida_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormEntradaSaida_relatorioId_key" ON "FormEntradaSaida"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormEntradaSaida" ADD CONSTRAINT "FormEntradaSaida_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
