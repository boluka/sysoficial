import { Hours, Person } from "@/generated/prisma";
import { SucessAuth } from "../types/auth";

export default async function fetchData(
  date: string,
  API: string,
): Promise<SucessAuth | null> {
  try {
    const params = new URLSearchParams({
      date,
    });
    const response = await fetch(`${API}?${params.toString()}`);
    if (!response.ok) {
      const dataError = await response.json().catch(() => null);
      return {
        message: "Erro fatal",
        sucess: false,
        error:
          dataError.error ||
          `Servidor respondeu com status: ${response.status}`,
      };
    }
    return (await response.json()) as SucessAuth;
  } catch (error) {
    console.log("Error fetching data:", error);
    return { message: "Erro fatal", sucess: false };
  }
}
export async function fetchPerson(): Promise<Person[] | null> {
  const result = await fetch("/api/auth/person");
  const value = (await result.json()) as SucessAuth;
  if (value.sucess) {
    return value.payload;
  }
  return null;
}

export async function fetchHorarios(): Promise<Hours[] | null> {
  try {
    const response = await fetch("/api/auth/hour");
    if (!response.ok) {
      return null;
    }
    const data = await response.json().catch(() => null);
    if(data.sucess){
      return data.payload;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar dados", error)
    return null;
  }
}
