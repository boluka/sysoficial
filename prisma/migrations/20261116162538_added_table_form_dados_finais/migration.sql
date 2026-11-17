-- CreateTable
CREATE TABLE "FormDadosFinais" (
    "id" SERIAL NOT NULL,
    "mandado_intimacao" TEXT,
    "carta_precatoria" TEXT,
    "informacoes" TEXT,
    "atividades_laborais" TEXT,
    "documentos_presos" TEXT,
    "repasse_documentos" TEXT,
    "guarda_externa" TEXT,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormDadosFinais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormDadosFinais_relatorioId_key" ON "FormDadosFinais"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormDadosFinais" ADD CONSTRAINT "FormDadosFinais_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
