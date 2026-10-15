import { prisma } from "@/app/api/prisma-adapter";
import { dialogMsg } from "@/app/components/dialog/DialogInfo";
import { SucessAuth } from "@/app/types/auth";
import { ObjFormEquipe } from "@/app/types/form";
import { PrismaClientKnownRequestError } from "@/generated/prisma/runtime/client";
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
      const returnData = await prisma.formEquipe.findUnique({
        where: { relatorioId: relatorioDia.id },
      });
      if (returnData) {
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
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          sucess: false,
          error: error.message as dialogMsg,
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
    const { date, data } = (await request.json()) as {
      date: string;
      data: ObjFormEquipe;
    };
    const dateFormat = date.split("T")[0];
    if (data) {
      const relatorioDia = await prisma.relatorioDoDia.upsert({
        where: { data: dateFormat },
        update: {},
        create: { data: dateFormat },
      });
      await prisma.formEquipe.upsert({
        where: { relatorioId: relatorioDia.id },
        update: { ...data },
        create: {
          ...data,
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
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          sucess: false,
          error: error.message as dialogMsg,
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
