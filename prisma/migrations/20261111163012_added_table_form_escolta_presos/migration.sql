-- CreateTable
CREATE TABLE "FormEscoltaPresos" (
    "id" SERIAL NOT NULL,
    "presos" JSONB NOT NULL,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormEscoltaPresos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormEscoltaPresos_relatorioId_key" ON "FormEscoltaPresos"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormEscoltaPresos" ADD CONSTRAINT "FormEscoltaPresos_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
