"use client";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  SavePlus,
  SquarePen,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import FormRecebimento from "@/app/components/forms/FormRecebimento";
import FormArmamento from "../components/forms/FormArmamento";
import FormEquipe from "../components/forms/FormEquipe";
import FormTrocasHe from "../components/forms/FormTrocasHe";
import FormExpediente from "../components/forms/FormExpediente";
import FormRevezamento from "../components/forms/FormRevezamento";
import FormRotinaDiaria from "../components/forms/FormRotinaDiaria";
import FormEntradaPresos from "../components/forms/FormEntradaSaidaPresos";
import FormMudancaCela from "../components/forms/FormMudancaCela";
import FormEscoltaPreso from "../components/forms/FormEscoltaPreso";
import FormSigo from "../components/forms/FormSigo";
import FormInclusaoRetorno from "../components/forms/FormInclusaoRetorno";
import FormDadosFinanis from "../components/forms/FormDadosFinais";
import FormEncerramento from "../components/forms/FormEncerramento";
import FormAssinatura from "../components/forms/FormAssinatura";
import { useRouter } from "next/navigation";
import { SucessAuth } from "../types/auth";
import DialogInfo, { dialogMsg } from "../components/dialog/DialogInfo";

export default function Report() {
  const dialogInfo = useRef<HTMLDialogElement>(null);
  const [dialogArmamentoActive, setDialogArmamentoActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nickname, setNickname] = useState("");
  const searchParams = useSearchParams();
  const [itemActive, setItemActive] = useState({
    aba: "1- Recebimento",
    API: "/api/auth/form-recebimento",
  });
  const [progress, setProgress] = useState(false);

  const [showDialog, setShowDialog] = useState(false);

  const router = useRouter();

  const [dialogInfoMsg, setDialogInfoMsg] = useState<dialogMsg>("Buscando dados de hoje...");


  const [cacheFormRecebimento, setCacheFormRecebimento] =
    useState<SucessAuth | null>(null);

  // useEffect(() => {
  //   if (!dialogArmamentoActive) {
  //     setItemActive({
  //       aba: "1- Recebimento",
  //       API: "/api/auth/form-recebimento",
  //     });
  //   }
  // }, [dialogArmamentoActive]);

  useEffect(() => {
    dialogInfo.current?.close()
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

  useEffect(() => {
    dialogInfo.current?.show();
    setShowDialog(true);
    async function fecthData(): Promise<SucessAuth | null> {
      try {
        const result = await fetch(itemActive.API);
        const data = (await result.json()) as SucessAuth;
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    }
    switch (itemActive.aba) {
      
      case "1- Recebimento":
        if (!cacheFormRecebimento) {
          fecthData().then((e) => {
            if(e?.sucess){

              setDialogInfoMsg("Dados encontrados com sucesso!");
              setCacheFormRecebimento(e);
            } else {
              setDialogInfoMsg("Relatório do dia não encontrado");
              
              setTimeout(() => {
                setShowDialog(false)
                setTimeout(() => {
                dialogInfo.current?.close();}, 5000)
              }, 5000);
            }
            
          });
        }
        break;
      case "1.1- Armamento":
        if (!cacheFormRecebimento) {
          dialogInfo.current?.show();
          fecthData().then((e) => {
            setCacheFormRecebimento(e);
          });
        }
      default:
        null;
    }
  }, [itemActive]);

  function renderForm() {
    switch (itemActive.aba) {
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
        return <FormTrocasHe />;

      case "05- 11 Expediente":
        return <FormExpediente />;

      case "12- Revezamento":
        return <FormRevezamento />;
      case "13-14 Rotina Diária":
        return <FormRotinaDiaria />;
      case "15- Entrada/Saída de Presos":
        return <FormEntradaPresos />;
      case "16- Mudança de cela/Pedido Seguro":
        return <FormMudancaCela />;
      case "17- Escolta de Presos":
        return <FormEscoltaPreso />;
      case "18 - SIGO":
        return <FormSigo />;
      case "19 - Inclusão/Retorno":
        return <FormInclusaoRetorno />;
      case "20 - Dados Finais":
        return <FormDadosFinanis />;
      case "21 - Assinatura":
        return <FormAssinatura />;
      case "22 - Encerramento":
        return <FormEncerramento />;
      default:
        return null;
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
    { aba: "1- Recebimento", API: "/api/auth/form-recebimento" },
    { aba: "1.1- Armamento", API: "/api/auth/form-armamento" },
    { aba: "2- Equipe", API: "/api/auth/form-equipe" },
    { aba: "3- Trocas / HE", API: "/api/auth/form-trocas-he" },
    { aba: "05- 11 Expediente", API: "/api/auth/form-expediente" },
    { aba: "12- Revezamento", API: "/api/auth/form-revezamento" },
    { aba: "13-14 Rotina Diária", API: "/api/auth/form-rotina-diaria" },
    {
      aba: "15- Entrada/Saída de Presos",
      API: "/api/auth/form-entrada-presos",
    },
    {
      aba: "16- Mudança de cela/Pedido Seguro",
      API: "/api/auth/form-mudanca-cela",
    },
    { aba: "17- Escolta de Presos", API: "/api/auth/form-escolta-preso" },
    { aba: "18 - SIGO", API: "/api/auth/form-sigo" },
    { aba: "19 - Inclusão/Retorno", API: "/api/auth/form-inclusao-retorno" },
    { aba: "20 - Dados Finais", API: "/api/auth/form-dados-finais" },
    { aba: "21 - Assinatura", API: "/api/auth/form-assinatura" },
    { aba: "22 - Encerramento", API: "/api/auth/form-encerramento" },
  ];
  const logout = async () => {
    setProgress(true);
    const result = await fetch("/api/auth/logout", {
      method: "POST",
    });
    const data = (await result.json()) as SucessAuth;
    if (data.sucess) {
      router.push("/");
    }
  };
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
              const active = itemActive.aba === e.aba;
              return (
                <div
                  key={e.aba}
                  className={`${active ? "bg-amarelo-claro text-cinza-escuro font-bold " : "bg-cinza-escuro text-amarelo-claro"} p-3 my-1 rounded-[5px] text-sm cursor-pointer shadow-black shadow-[1px_1px_4px] whitespace-nowrap shrink-0 `}
                  onClick={() => setItemActive(e)}
                >
                  {e.aba}
                </div>
              );
            })}
          </div>
          <button onClick={moveRight} className="cursor-pointer shrink-0">
            <ChevronRight className="text-amarelo-claro w-8 h-8" />
          </button>
        </div>
        <div className="flex gap-5 items-center text-amarelo-claro shrink-0 mr-1">
          <p>Bem-vindo {nickname} !</p>
          <div
            className="flex items-center justify-center gap-1 text-cinza-escuro text-sm font-bold w-15 rounded-[5px] bg-amarelo-claro p-1 shadow-black shadow-[1px_1px_4px] cursor-pointer hover:text-amarelo-claro hover:bg-cinza-maisescuro"
            onClick={logout}
          >
            <p>Sair</p>
            <RefreshCcw
              className={`w-4 animate-spin ${!progress && "hidden"}`}
            />
          </div>
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
      <DialogInfo mensagem={dialogInfoMsg} ref={dialogInfo} show={showDialog} />
      
    </main>
  );
}
