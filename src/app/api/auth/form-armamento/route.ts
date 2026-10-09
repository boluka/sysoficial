import { prisma } from "@/app/api/prisma-adapter";
import { dialogMsg } from "@/app/components/dialog/DialogInfo";
import { SucessAuth } from "@/app/types/auth";
import { ObjFormArmamento } from "@/app/types/form";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = searchParams.get("date")?.split("T")[0];
    if (data) {
      const relatorioDia = await prisma.relatorioDoDia.upsert({
        where: { data },
        update: {},
        create: { data },
      });
      const returnData = await prisma.formArmamento.findMany({
        where: { relatorioId: relatorioDia.id },
      });
      if (returnData.length != 0) {
        return NextResponse.json(
          { sucess: true, payload: returnData } as SucessAuth,
          { status: 200 },
        );
      } else {
        return NextResponse.json(
          {
            sucess: false,
            error: "Relatório do dia não encontrado" as dialogMsg,
          } as SucessAuth,
          { status: 404 },
        );
      }
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
      data: ObjFormArmamento;
    };
    const dateFormat = date.split("T")[0];
    if (data) {
      const relatorioDia = await prisma.relatorioDoDia.upsert({
        where: { data: dateFormat },
        update: {},
        create: { data: dateFormat },
      });
      await prisma.formArmamento.upsert({
        where: { relatorioId: relatorioDia.id },
        update: {},
        create: {
          ...data,
          relatorioId: relatorioDia.id,
        },
      });
    }
    return NextResponse.json(
      {
        sucess: true,
        message: "Formulário de armamento salvo com sucesso",
      } as SucessAuth,
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        sucess: false,
        error: "Erro interno de servidor" as dialogMsg,
      } as SucessAuth,
      { status: 500 },
    );
  }
}
