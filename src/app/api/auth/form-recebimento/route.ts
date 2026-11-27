import { prisma } from "@/app/api/prisma-adapter";
import { dialogMsg } from "@/app/components/dialog/DialogInfo";
import { SucessAuth } from "@/app/types/auth";
import { FormRecebimento } from "@/generated/prisma";
import { PrismaClientKnownRequestError } from "@/generated/prisma/runtime/client";
import { NextResponse } from "next/server";
import prismaError from "../../PrismaError";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dataParam = searchParams.get("date");

    if (!dataParam) {
      return NextResponse.json(
        {
          sucess: false,
          error: "A data é obrigatória para a busca",
        },
        { status: 400 },
      );
    }
    const data = dataParam.split("T")[0];
    const relatorioDia = await prisma.relatorioDoDia.upsert({
      where: { data },
      update: {},
      create: { data },
    });
    const returnData = await prisma.formRecebimento.findUnique({
      where: { relatorioId: relatorioDia.id },
    });
    if (!returnData) {
      return NextResponse.json(
        {
          sucess: false,
          error: "Relatório do dia não encontrado" as dialogMsg,
        } as SucessAuth,
        { status: 404 },
      );
    }
    return NextResponse.json(
      { sucess: true, payload: returnData } as SucessAuth,
      { status: 200 },
    );
  } catch (error) {
    console.log("Erro crítico no GET /api/form-recebimento", error);

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          sucess: false,
          error: prismaError(error),
        } as SucessAuth,
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        sucess: false,
        error: "Erro interno de servidor" as dialogMsg,
      } as SucessAuth,
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || !body.date || !body.data) {
      return NextResponse.json(
        {
          sucess: false,
          error: "Dados ou data de envio inválidos!",
        } as SucessAuth,
        { status: 400 },
      );
    }
    const { date, data } = body as {
      date: string;
      data: FormRecebimento;
    };
    const dateFormat = date.split("T")[0];

    const { id, relatorioId, ...resData } = data;
    const relatorioDia = await prisma.relatorioDoDia.upsert({
      where: { data: dateFormat },
      update: {},
      create: { data: dateFormat },
    });
    await prisma.formRecebimento.upsert({
      where: { relatorioId: relatorioDia.id },
      update: { ...resData },
      create: {
        ...resData,
        relatorioId: relatorioDia.id,
      },
    });
    return NextResponse.json(
      {
        sucess: true,
        message: "Formulário salvo com sucesso",
      } as SucessAuth,
      { status: 201 },
    );
  } catch (error) {
    console.log("Erro crítico no POST /api/form-recebimento", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          sucess: false,
          error: prismaError(error),
        } as SucessAuth,
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        sucess: false,
        error: "Erro interno de servidor" as dialogMsg,
      } as SucessAuth,
      { status: 500 },
    );
  }
}
