"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"; // Seu import atual do shadcn
import { useReportTab, FormKey } from "@/hooks/useReportTab";
import { FORMS_CONFIG } from "@/app/relatorio/ReportClient";
import { Play } from "lucide-react";

export function MenuBar() {
  const { activeTab, setActiveTab } = useReportTab();

  // Helper para renderizar cada item do menu com destaque na aba ativa
  const renderMenuItem = (key: FormKey) => {
    const isActive = activeTab === key;
    return (
      <MenubarItem
        key={key}
        onClick={() => setActiveTab(key)}
        className={`cursor-pointer ${
          isActive ? "bg-amarelo-claro text-cinza-escuro font-bold" : ""
        }`}
      >
        {FORMS_CONFIG[key].label}
      </MenubarItem>
    );
  };

  return (
    <Menubar className="bg-cinza-escuro border-0 text-amarelo-claro">
      {/* Exemplo agrupando por categorias (ou você pode listar direto) */}
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-base hover:bg-cinza-maisescuro aria-expanded:bg-cinza-maisescuro p-2">
         Início / Plantão
        </MenubarTrigger>

        <MenubarContent className="bg-cinza-escuro  text-white ring-1 ring-gray-500/70">
          {renderMenuItem("recebimento")}
          {renderMenuItem("armamento")}
          {renderMenuItem("equipe")}
         
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-base  hover:bg-cinza-maisescuro aria-expanded:bg-cinza-maisescuro  p-2">
          Rotina
        </MenubarTrigger>
        <MenubarContent className="bg-cinza-escuro  text-white ring-1 ring-gray-500/70">
          {renderMenuItem("revezamento")}
          {renderMenuItem("rotina-diaria")}
           {renderMenuItem("trocas-he")}
          {renderMenuItem("expediente")}
          
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-base  hover:bg-cinza-maisescuro aria-expanded:bg-cinza-maisescuro  p-2">
          Movimentação / Escolta
        </MenubarTrigger>
        <MenubarContent className="bg-cinza-escuro  text-white ring-1 ring-gray-500/70">
          {renderMenuItem("entrada-presos")}
          {renderMenuItem("saida-presos")}
          {renderMenuItem("mudanca-cela")}
          {renderMenuItem("pedido-seguro")}
          {renderMenuItem("escolta-preso")}
          {renderMenuItem("escolta-nao-realizada")}
          {renderMenuItem("inclusao-retorno")}
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-base  hover:bg-cinza-maisescuro aria-expanded:bg-cinza-maisescuro  p-2">
          Finalização
        </MenubarTrigger>
        <MenubarContent className="bg-cinza-escuro  text-white ring-1 ring-gray-500/70">
          {renderMenuItem("sigo")}
          {renderMenuItem("dados-finais")}
          {renderMenuItem("assinatura")}
          {renderMenuItem("encerramento")}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
