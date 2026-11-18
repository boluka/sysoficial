"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FORMS_CONFIG } from "@/app/relatorio/ReportClient"; // Ajuste o caminho se mover o FORMS_CONFIG

export type FormKey = keyof typeof FORMS_CONFIG;

export function useReportTab(defaultTab: FormKey = "recebimento") {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawTab = searchParams.get("tab") as FormKey | null;
  const activeTab: FormKey =
    rawTab && FORMS_CONFIG[rawTab] ? rawTab : defaultTab;

  const setActiveTab = (newTab: FormKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return { activeTab, setActiveTab };
}
