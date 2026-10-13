-- CreateTable
CREATE TABLE "FormEquipe" (
    "id" SERIAL NOT NULL,
    "chefeEquipe" TEXT NOT NULL,
    "auxChefe" TEXT NOT NULL,
    "portariaPrinc" TEXT NOT NULL,
    "auxPort1" TEXT,
    "auxPort2" TEXT,
    "passarelaPrinc" TEXT,
    "escolaPadaria" TEXT,
    "trabalhoCrina" TEXT,
    "responsavelPv1" TEXT NOT NULL,
    "corredorPv1" JSONB,
    "responsavelPv2" TEXT NOT NULL,
    "corredorPv2" JSONB,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormEquipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormEquipe_relatorioId_key" ON "FormEquipe"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormEquipe" ADD CONSTRAINT "FormEquipe_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
