import { SucessAuth } from "@/app/types/auth";

export async function fetchDataReport(date: string): Promise<SucessAuth> {
  
  try {
    const data = await fetch(
      `/api/auth/generate-pdf?date=${date}`,
    );
    if (data.ok) {
      return await data.json().catch(() => null);
    }
    return { sucess: false, message: `Ocorreu um erro ao exportar os dados` };
  } catch (error) {
    console.log(error);
    return {
      sucess: false,
      message: `Ocorreu um erro ao exportar os dados: ${error}`,
    };
  }
}
export function useReportExport() {
    return {fetchDataReport}
}
