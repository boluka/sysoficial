"use client";
import { Calendar, ChevronLeft, ChevronRight, SavePlus, SquarePen } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import FormRecebimento from "@/app/components/forms/FormRecebimento";
import FormArmamento from "../components/forms/FormArmamento";
import FormEquipe from "../components/forms/FormEquipe";
import FormTrocasHe from "../components/forms/FormTrocasHe";
import FormExpediente from "../components/forms/FormExpediente";

export default function Report() {
  /**
   * Não esquecer de corrigir o uso de tokens com a biblioteca correta
   */
  const refDialogArmamento = useRef<HTMLDialogElement>(null);
  const [dialogArmamentoActive, setDialogArmamentoActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nickname, setNickname] = useState("");
  const searchParams = useSearchParams();
  const [itemActive, setItemActive] = useState("1- Recebimento");

  useEffect(() => {
    if (!dialogArmamentoActive) {
      setItemActive("1- Recebimento");
    }
  }, [dialogArmamentoActive]);

  useEffect(() => {
    // dialogTop.current?.showModal();
    const user = searchParams.get("nome");
    if (user) {
      localStorage.setItem("nome", user);
      setNickname(user);
    } else {
      const name = localStorage.getItem("nome");
      if (name) {
        setNickname(name);
      }
    }
  }, []);

  function renderForm() {
    switch (itemActive) {
      case "1- Recebimento":
        return <FormRecebimento />;
      case "1.1- Armamento":
        return (
          <FormRecebimento>
            <FormArmamento state={setDialogArmamentoActive}></FormArmamento>
          </FormRecebimento>
        );
      case "2- Equipe":
        return <FormEquipe />;
     
      case "3- Trocas / HE":
        return <FormTrocasHe/>;
      
        default:
        return <FormExpediente/>
    }
  }

  function moveLeft() {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  }
  function moveRight() {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  }

  const elementLi = [
    "1- Recebimento",
    "1.1- Armamento",
    "2- Equipe",
    "3- Trocas / HE",
    "05- 11 Expediente",
    "12- Revezamento",
    "13-14 Rotina Diária",
    "15- Entrada de Presos",
    "16- Saída de Presos",
    "17- Mudança de cela",
  ];
  return (
    <main className="flex flex-col bg-linear-to-b from-cinza-maisescuro  to-cinza-escuro min-h-screen w-full ">
      <nav className="flex  justify-between items-center bg-cinza-escuro p-1 gap-4">
        <div className="flex items-center min-w-75 gap-2 w-1/2">
          <button onClick={moveLeft} className="cursor-pointer shrink-0">
            <ChevronLeft className="text-amarelo-claro w-8 h-8" />
          </button>
          <div
            ref={containerRef}
            className="flex overflow-x-auto scroll-smooth scrollbar-none w-full  px-2  gap-3 items-center "
          >
            {elementLi.map((e) => {
              const active = itemActive === e;
              return (
                <div
                  key={e}
                  className={`${active ? "bg-amarelo-claro text-cinza-escuro font-bold " : "bg-cinza-escuro text-amarelo-claro"} p-3 my-1 rounded-[5px] text-sm cursor-pointer shadow-black shadow-[1px_1px_4px] whitespace-nowrap shrink-0 `}
                  onClick={() => setItemActive(e)}
                >
                  {e}
                </div>
              );
            })}
          </div>
          <button onClick={moveRight} className="cursor-pointer shrink-0">
            <ChevronRight className="text-amarelo-claro w-8 h-8" />
          </button>
        </div>
        <div className="text-amarelo-claro shrink-0">
          Bem-vindo {nickname} !
        </div>
      </nav>
      <div className="flex flex-1 items-center justify-center">
      {renderForm()}
      <button>
        <SavePlus className="p-3 w-16 h-16 fixed right-5 bottom-5 rounded-lg text-cinza-escuro bg-amarelo-claro hover:bg-amarelo-escuro cursor-pointer hover:w-17 hover:h-17 transition-all" />
      </button>
      <button>
          <SquarePen className="p-3 w-16 h-16 fixed right-5 bottom-25 rounded-lg text-cinza-escuro bg-amarelo-claro hover:bg-amarelo-escuro cursor-pointer hover:w-17 hover:h-17 transition-all" />
      </button>
       <button>
          <Calendar className="p-3 w-16 h-16 fixed right-5 bottom-45 rounded-lg text-cinza-escuro bg-amarelo-claro hover:bg-amarelo-escuro cursor-pointer hover:w-17 hover:h-17 transition-all" />
      </button>
      </div>
    </main>
  );
}
