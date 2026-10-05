import { SucessAuth } from "../types/auth";

export default async function fetchData(
  data: string,
  API: string,
): Promise<SucessAuth | null> {
  try {
    const params = new URLSearchParams({
        data
    })
    const result = fetch(`${API}?${params.toString()}`);
    const response = await result;
    return (await response.json()) as SucessAuth;
  } catch (error) {
    console.log("Error fetching data:", error);
    return null;
  }
}
