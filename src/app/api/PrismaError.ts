import { PrismaClientKnownRequestError } from "@/generated/prisma/runtime/client";

export default function prismaError(error: PrismaClientKnownRequestError): string{
    switch (error.code) {
    case "P2002":
      return "Já existe um registro com estes dados únicos no sistema.";
    case "P2025":
      return "Operação falhou: Registro requerido não foi encontrado.";
    default:
      return "Erro de consistência de dados no banco.";
  }
}