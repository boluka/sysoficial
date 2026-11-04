-- CreateTable
CREATE TABLE "FormSaidaPresos" (
    "id" SERIAL NOT NULL,
    "presos" JSONB NOT NULL,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormSaidaPresos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormSaidaPresos_relatorioId_key" ON "FormSaidaPresos"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormSaidaPresos" ADD CONSTRAINT "FormSaidaPresos_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
