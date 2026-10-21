import { prisma } from "@/app/api/prisma-adapter";
import { dialogMsg } from "@/app/components/dialog/DialogInfo";
import { SucessAuth } from "@/app/types/auth";
import { FormTrocaHe } from "@/generated/prisma";
import { PrismaClientKnownRequestError } from "@/generated/prisma/runtime/client";
import { NextResponse } from "next/server";

function handlePrismaError(error: PrismaClientKnownRequestError): string {
  switch (error.code) {
    case "P2002":
      return "Já existe um registro com estes dados únicos no sistema.";
    case "P2025":
      return "Operação falhou: Registro requerido não foi encontrado.";
    default:
      return "Erro de consistência de dados no banco.";
  }
}

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
    const returnData = await prisma.formTrocaHe.findUnique({
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
    console.log("Erro crítico no GET /api/form-troca-he", error);

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          sucess: false,
          error: handlePrismaError(error),
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
      data: FormTrocaHe;
    };
    const dateFormat = date.split("T")[0];
    const { id, relatorioId, ...dataForm } = data;
    const relatorioDia = await prisma.relatorioDoDia.upsert({
      where: { data: dateFormat },
      update: {},
      create: { data: dateFormat },
    });
    await prisma.formTrocaHe.upsert({
      where: { relatorioId: relatorioDia.id },
      update: { ...dataForm },
      create: {
        ...dataForm,
        relatorioId: relatorioDia.id,
      },
    });
    return NextResponse.json(
      {
        sucess: true,
        message: "Formulário de armamento salvo com sucesso",
      } as SucessAuth,
      { status: 201 },
    );
  } catch (error) {
    console.log("Erro crítico no POST /api/form-troca-he:", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          sucess: false,
          error: handlePrismaError(error),
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
