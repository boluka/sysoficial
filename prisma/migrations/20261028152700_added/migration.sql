-- CreateTable
CREATE TABLE "FormRotinaDiaria" (
    "id" SERIAL NOT NULL,
    "rotina" TEXT,
    "pavilhao_um" TEXT,
    "pavilhao_dois" TEXT,
    "alimentacao" TEXT,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormRotinaDiaria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormRotinaDiaria_relatorioId_key" ON "FormRotinaDiaria"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormRotinaDiaria" ADD CONSTRAINT "FormRotinaDiaria_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
