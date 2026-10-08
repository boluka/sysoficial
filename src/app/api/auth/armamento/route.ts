import { prisma } from "@/app/api/prisma-adapter";
import { SucessAuth } from "@/app/types/auth";
import { ObjArmamento } from "@/app/types/form";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let valors: ObjArmamento[] = await prisma.armamento.findMany(
        {orderBy: {
            tipo: 'asc'
        }}
    );
    return NextResponse.json({sucess: true, payload: valors} as SucessAuth, {status:200})
  } catch (error) {
    return NextResponse.json({sucess: false, error: 'Erro interno de servidor'} as SucessAuth, {status: 500})
  }
}
