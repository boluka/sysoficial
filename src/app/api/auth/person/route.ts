import { prisma } from "@/app/api/prisma-adapter";
import { dialogMsg } from "@/app/components/dialog/DialogInfo";
import { SucessAuth } from "@/app/types/auth";
import {
  PrismaClientKnownRequestError
} from "@/generated/prisma/runtime/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const data = await prisma.person.findMany();
    if (data.length > 0)
      return NextResponse.json({ sucess: true, payload: data } as SucessAuth, {
        status: 200,
      });
    else
      return NextResponse.json(
        { sucess: false, error: "Não há dados na tabela Person" } as SucessAuth,
        { status: 404 },
      );
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error.code);
    }
    return NextResponse.json({ sucess: false, error: error } as SucessAuth, {
      status: 500,
    });
  }
}
