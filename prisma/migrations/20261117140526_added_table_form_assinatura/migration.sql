-- CreateTable
CREATE TABLE "FormAssinatura" (
    "id" SERIAL NOT NULL,
    "entrega_nome" TEXT NOT NULL,
    "entrega_data" TEXT NOT NULL,
    "entrega_matricula" TEXT NOT NULL,
    "recebe_nome" TEXT NOT NULL,
    "recebe_data" TEXT NOT NULL,
    "recebe_matricula" TEXT NOT NULL,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormAssinatura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormAssinatura_relatorioId_key" ON "FormAssinatura"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormAssinatura" ADD CONSTRAINT "FormAssinatura_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
