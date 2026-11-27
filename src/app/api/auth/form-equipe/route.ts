import { prisma } from "@/app/api/prisma-adapter";
import { dialogMsg } from "@/app/components/dialog/DialogInfo";
import { SucessAuth } from "@/app/types/auth";
import { FormEquipe } from "@/generated/prisma";
import {
  InputJsonValue,
  PrismaClientKnownRequestError,
} from "@/generated/prisma/runtime/client";
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
    const returnData = await prisma.formEquipe.findUnique({
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
    console.log("Erro crítico no GET /api/form-equipe", error);

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
      data: FormEquipe;
    };
    const dateFormat = date.split("T")[0];

    const { id, relatorioId, corredorPv1, corredorPv2, ...resData } = data;
    const relatorioDia = await prisma.relatorioDoDia.upsert({
      where: { data: dateFormat },
      update: {},
      create: { data: dateFormat },
    });
    await prisma.formEquipe.upsert({
      where: { relatorioId: relatorioDia.id },
      update: {
        corredorPv1: corredorPv1 as InputJsonValue,
        corredorPv2: corredorPv2 as InputJsonValue,
        ...resData,
      },
      create: {
        corredorPv1: corredorPv1 as InputJsonValue,
        corredorPv2: corredorPv2 as InputJsonValue,
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
    console.log("Erro crítico no POST /api/form-equipe", error);
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
