-- CreateTable
CREATE TABLE "FormExpediente" (
    "id" SERIAL NOT NULL,
    "pessoas_expediente" JSONB NOT NULL,
    "pessoa_falta" TEXT,
    "pessoa_atraso" TEXT,
    "atraso_de" TEXT,
    "atraso_ate" TEXT,
    "pessoa_ferias" TEXT,
    "retorno_ferias" TEXT,
    "pessoa_atestado" TEXT,
    "atestado_dias" TEXT,
    "retorno_atestado" TEXT,
    "observacoes" TEXT,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormExpediente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormExpediente_relatorioId_key" ON "FormExpediente"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormExpediente" ADD CONSTRAINT "FormExpediente_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
