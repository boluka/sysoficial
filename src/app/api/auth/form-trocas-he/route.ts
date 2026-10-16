import { prisma } from "@/app/api/prisma-adapter";
import { dialogMsg } from "@/app/components/dialog/DialogInfo";
import { SucessAuth } from "@/app/types/auth";
import { FormTrocaHe } from "@/generated/prisma";
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
      const returnData = await prisma.formTrocaHe.findUnique({
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
      data: FormTrocaHe;
    };
    const dateFormat = date.split("T")[0];
    if (data) {
        const {id, relatorioId, ...dataForm} = data
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