-- CreateTable
CREATE TABLE "FormPedidoSeguro" (
    "id" SERIAL NOT NULL,
    "presos" JSONB NOT NULL,
    "relatorioId" TEXT NOT NULL,

    CONSTRAINT "FormPedidoSeguro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormPedidoSeguro_relatorioId_key" ON "FormPedidoSeguro"("relatorioId");

-- AddForeignKey
ALTER TABLE "FormPedidoSeguro" ADD CONSTRAINT "FormPedidoSeguro_relatorioId_fkey" FOREIGN KEY ("relatorioId") REFERENCES "RelatorioDoDia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
