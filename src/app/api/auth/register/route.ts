import { prisma } from "@/app/api/prisma-adapter";
import { SucessAuth } from "@/app/types/auth";
import { Prisma } from "@/generated/prisma";
import { hashSync } from "bcrypt-ts";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { user, password, role, email, phone } = await request.json();
  const hash = hashSync(password, 10);
  try {
    if (!user || !password) {
      return NextResponse.json(
        { sucess: false, error: "Campos obrigatórios ausentes!" } as SucessAuth,
        { status: 400 },
      );
    }

    const userCreate = await prisma.usuario.create({
      data: {
        user,
        password: hash,
        role,
        email,
        phone,
      },
    });
    return NextResponse.json({ sucess: true } as SucessAuth, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            sucess: false,
            error: "Este nome de usuário já está em uso!",
          } as SucessAuth,
          { status: 400 },
        );
      }
    }
    return NextResponse.json(
      {
        sucess: false,
        error: "Erro de servidor!",
      } as SucessAuth,
      { status: 500 },
    );
  }
}
