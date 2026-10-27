-- CreateTable
CREATE TABLE "FormRevezamento" (
    "id" SERIAL NOT NULL,
    "primeiro_turno" JSONB,
    "segundo_turno" JSONB,
    "terceiro_turno" JSONB,
    "quarto_turno" JSONB,

    CONSTRAINT "FormRevezamento_pkey" PRIMARY KEY ("id")
);
