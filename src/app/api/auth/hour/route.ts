import { prisma } from "@/app/api/prisma-adapter";
import { SucessAuth } from "@/app/types/auth";

export async function GET(request: Request) {
  try {
    const result = await prisma.hours.findMany();
    if (result.length > 0) {
      return Response.json({ sucess: true, payload: result } as SucessAuth, {
        status: 200,
      });
    } else {
      return Response.json(
        {
          sucess: false,
          message: "Não existem horários cadastrados",
        } as SucessAuth,
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Erro ao consultar os horários", error);
    return Response.json(
      { sucess: false, message: "Erro ao consultar os horários" } as SucessAuth,
      { status: 500 },
    );
  }
}
