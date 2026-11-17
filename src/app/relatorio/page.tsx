// src/app/relatorio/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import Report from "./ReportClient";

export default async function RelatorioPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  let nickname = "Servidor";

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      console.log(payload)
      nickname = payload.name as string;
    } catch {
      redirect("/");
    }
  }
  return <Report initialNickname={nickname} />;
}
