import { SucessAuth } from "@/app/types/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookie = await cookies();
    cookie.delete("auth_token");
    return NextResponse.json({ sucess: true } as SucessAuth, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { sucess: false, error: "Erro ao encerrar a sessão!" } as SucessAuth,
      {
        status: 500
      },
    );
  }
}
