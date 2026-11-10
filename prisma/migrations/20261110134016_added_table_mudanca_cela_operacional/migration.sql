-- CreateTable
CREATE TABLE "MudancaCelaOperacional" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "origem" JSONB NOT NULL,
    "destino" JSONB NOT NULL,

    CONSTRAINT "MudancaCelaOperacional_pkey" PRIMARY KEY ("id")
);
