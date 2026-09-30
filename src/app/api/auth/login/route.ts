import { NextResponse } from "next/server";
import { prisma } from "@/app/api/prisma-adapter";
import { compare } from "bcrypt-ts";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { hashSync } from "bcrypt-ts";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
  try {
    const totalUsers = await prisma.usuario.count();

    if (totalUsers === 0) {
      const hashPadrao = hashSync("sysadmin26", 10);
      await prisma.usuario.create({
        data: {
          user: "admin",
          password: hashPadrao,
          role: "ADMIN",
          phone: "00000000000",
        },
      });
    }
    const { user, password } = await request.json();
    const userLogin = await prisma.usuario.findUnique({
      where: {
        user: user,
      },
    });
    if (!userLogin) {
      return NextResponse.json(
        { erro: "Usuário e/ou senha incorreto!" },
        { status: 401 },
      );
    }
    const passwordMatch = await compare(password, userLogin.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { erro: "Usuário e/ou senha incorreto!" },
        { status: 401 },
      );
    }
    const { id, email } = userLogin;
    const payload = { id, email };

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 2,
      path: "/",
    });

    return NextResponse.json({
      sucess: true,
      status: 200,
      ...payload,
    });
  } catch (error) {
    return NextResponse.json(
      { erro: "Erro interno de servidor" },
      { status: 500 },
    );
  }
}
