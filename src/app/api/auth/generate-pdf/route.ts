import { prisma } from "@/app/api/prisma-adapter";
import { SucessAuth } from "@/app/types/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get("date");

  if (!data) {
    return NextResponse.json(
      {
        sucess: false,
        error: "A data é obrigatória para a busca",
      },
      { status: 400 },
    );
  }
  try {
    const payload = await prisma.relatorioDoDia.findUnique({
      where: {
        data,
      },
      include: {
        formArmamento: true,
        formAssinatura: true,
        formTrocaHe: true,
        formSigo: true,
        formSaidaPresos: true,
        formRotinaDiaria: true,
        formRevezamento: true,
        formRecebimento: true,
        formPedidoSeguro: true,
        formMudancaCelaOperacional: true,
        formInclusaoRetorno: true,
        formExpediente: true,
        formEscoltaPresos: true,
        formEscoltaNaoRealizada: true,
        formEquipe: true,
        formEntradaSaida: true,
        formEncerramento: true,
        formDadosFinais: true,
      },
    });
    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: "Nenhum relatório encontrado para esta data",
        },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        sucess: true,
        payload,
      } as SucessAuth,
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao buscar relatório:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno ao buscar os dados do relatório",
      },
      { status: 500 },
    );
  }
}
