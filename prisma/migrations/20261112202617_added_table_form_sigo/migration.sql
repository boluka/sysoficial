-- CreateTable
CREATE TABLE "FormSigo" (
    "id" SERIAL NOT NULL,
    "sigo" TEXT,
    "prisao_domiciliar" TEXT,
    "vistoria_cela" TEXT,
    "comunicados" TEXT,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormSigo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormSigo_relatorioId_key" ON "FormSigo"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormSigo" ADD CONSTRAINT "FormSigo_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
