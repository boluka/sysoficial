"use client";
import { Suspense, useEffect, useState } from "react";
import Report from "../components/report/Report";
import dynamic from "next/dynamic";
import { useReportExport } from "@/hooks/useReportExport";
import { useSearchParams } from "next/navigation";
import { FormAssinatura } from "@/generated/prisma";
import { ReportPayload } from "../types/form";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Carregando PDF...</p>,
  },
);

const reportContent = () => {
  const { fetchDataReport } = useReportExport();
  const [data, setData] = useState<ReportPayload>();
  const [loading, setLoading] = useState(true);
  const useSearch = useSearchParams();
  const date = useSearch.get("date");
  
  useEffect(() => {
    if (!date) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const dataReport = await fetchDataReport(date);
        if (dataReport.sucess) {
          setData({
            payload: {
              formAssinatura: dataReport.payload.formAssinatura,
            },
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [useSearch]);
  if (loading) return <p >Buscando dados do relatório...</p>;
  if (!data) return <p>Nenhum dado encontrado para a data informada.</p>;

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Report payload={data.payload} />
    </PDFViewer>
  );
};
export default function Page() {
  return reportContent();
}
