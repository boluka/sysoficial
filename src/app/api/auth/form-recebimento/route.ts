import { prisma } from "@/app/api/prisma-adapter";
import { SucessAuth } from "@/app/types/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const currentDate = new Date().toISOString().split("T")[0];

    const relatorioDia = await prisma.relatorioDoDia.findUnique({
      where: { data: currentDate },
      include: {
        formRecebimento: true,
      },
    });
    if (!relatorioDia || !relatorioDia.formRecebimento) {
      return NextResponse.json({
        sucess: false,
        error: "Relatório do dia não encontrado",
      } as SucessAuth);
    }
    return NextResponse.json(
      { sucess: true, payload: relatorioDia } as SucessAuth,
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        sucess: false,
        error: "Erro ao buscar o relatório do dia",
      } as SucessAuth,
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  const relatorioDia = await prisma.relatorioDoDia.upsert({
    where: { data: currentDate },
    update: {},
    create: { data: currentDate },
  });

  const data = await request.json();
  const {
    plantao,
    chefeReceb,
    chefeEntrega,
    chefeAuxiliar,
    efetivoCarc,
    transitoCarc,
    mat_carga,
    mat_belico,
  } = data;

  const formRecebimento = await prisma.formRecebimento.create({
    data: {
      plantao,
      chefeReceb,
      chefeEntrega,
      chefeAuxiliar,
      efetivoCarc,
      transitoCarc,
      mat_carga,
      mat_belico,
      relatorioId: relatorioDia.id,
    },
  });
  return NextResponse.json({
    message: "Formulário de Recebimento criado com sucesso",
    formRecebimento,
  });
}
