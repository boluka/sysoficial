-- CreateTable
CREATE TABLE "FormEscoltaNaoRealizada" (
    "id" SERIAL NOT NULL,
    "presos" JSONB NOT NULL,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormEscoltaNaoRealizada_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormEscoltaNaoRealizada_relatorioId_key" ON "FormEscoltaNaoRealizada"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormEscoltaNaoRealizada" ADD CONSTRAINT "FormEscoltaNaoRealizada_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
