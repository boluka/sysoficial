-- CreateTable
CREATE TABLE "FormInclusaoRetorno" (
    "id" SERIAL NOT NULL,
    "inclusao" TEXT,
    "retorno" TEXT,
    "exclusao" TEXT,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormInclusaoRetorno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormInclusaoRetorno_relatorioId_key" ON "FormInclusaoRetorno"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormInclusaoRetorno" ADD CONSTRAINT "FormInclusaoRetorno_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
