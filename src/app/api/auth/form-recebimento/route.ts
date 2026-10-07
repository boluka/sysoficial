import { prisma } from "@/app/api/prisma-adapter";
import { SucessAuth } from "@/app/types/auth";
import { NextResponse } from "next/server";
import { dialogMsg } from "@/app/components/dialog/DialogInfo";
import { ObjFormRecebimento } from "@/app/types/form";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = searchParams.get("data");

    if (data) {
      const relatorioDia = await prisma.relatorioDoDia.findUnique({
        where: { data },
        include: {
          formRecebimento: true,
        },
      });
      if (!relatorioDia || !relatorioDia.formRecebimento) {
        return NextResponse.json({
          sucess: false,
          error: "Relatório do dia não encontrado" as dialogMsg,
        } as SucessAuth);
      }
      return NextResponse.json(
        { sucess: true, payload: relatorioDia } as SucessAuth,
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        sucess: false,
        error: "Erro ao buscar o relatório do dia" as dialogMsg,
      } as SucessAuth,
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { date, data } = (await request.json()) as {
      date: string;
      data: ObjFormRecebimento;
    };
    const dateFormat = date.split("T")[0];
    const relatorioDia = await prisma.relatorioDoDia.upsert({
      where: { data: dateFormat },
      update: {},
      create: { data: dateFormat },
    });
    console.log(relatorioDia)
    await prisma.formRecebimento.upsert({
      where: {relatorioId: relatorioDia.id},
      update: {...data},
      create: {relatorioId: relatorioDia.id, ...data}
      
    });

    return NextResponse.json(
      {
        sucess: true,
        message: "Formulário de Recebimento atualizado com sucesso",
      } as SucessAuth,
      { status: 201 },
    );

  } catch (error) {
    return NextResponse.json(
      {
        sucess: false,
        error: "Erro ao submeter o formulário de Recebimento",
      } as SucessAuth,
      { status: 500 },
    );
  }
}
