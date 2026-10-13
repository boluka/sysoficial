import { Person } from "@/generated/prisma";
import { SucessAuth } from "../types/auth";

export default async function fetchData(
  date: string,
  API: string,
): Promise<SucessAuth | null> {
  try {
    const params = new URLSearchParams({
      date,
    });
    const result = fetch(`${API}?${params.toString()}`);
    const response = await result;
    return (await response.json()) as SucessAuth;
  } catch (error) {
    console.log("Error fetching data:", error);
    return null;
  }
}
export async function fetchPerson(): Promise<Person[] | null> {
  const result = await fetch("/api/auth/person");
  const value = (await result.json()) as SucessAuth;
  if (value.sucess) {
    return value.payload;
  }
  return null
}
