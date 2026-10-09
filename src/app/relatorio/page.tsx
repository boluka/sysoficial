"use client";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  SavePlus,
  SquarePen,
  StickyNotes,
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
import {
  ObjArmamento,
  ObjFormArmamento,
  ObjFormRecebimento,
} from "@/app/types/form";
import DialogDate from "../components/dialog/DialogDate";
import fetchData from "./services";
import DialogSave from "../components/dialog/DialogSave";

export default function Report() {
  const dialogInfo = useRef<HTMLDialogElement>(null);
  const dialogSave = useRef<HTMLDialogElement>(null);

  const [dialogArmamentoActive, setDialogArmamentoActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nickname, setNickname] = useState("");
  const searchParams = useSearchParams();

  const [showCalendar, setShowCalendar] = useState(false);

  const [dateCalendar, setDateCalendar] = useState<Date | undefined>(undefined);

  const [cacheFormRecebimento, setCacheFormRecebimento] =
    useState<SucessAuth | null>(null);

  const [cacheFormArmamento, setCacheFormArmamento] =
    useState<SucessAuth | null>(null);

  const [itemActive, setItemActive] = useState({
    aba: "1- Recebimento",
    API: "/api/auth/form-recebimento",
    obj: {},
    cache: setCacheFormRecebimento,
  });
  const [progress, setProgress] = useState(false);

  const [showDialogAnimation, setShowDialogAnimation] = useState(false);

  const [dialogInfoMsg, setDialogInfoMsg] = useState<dialogMsg>(
    "Buscando dados de hoje...",
  );

  const [lockFecth, setLockFecth] = useState(false);

  const router = useRouter();

  const timeout = useRef<NodeJS.Timeout | null>(null);
  let dateCurrent = useRef<String | null>(null);

  async function showMsgFetchData(date: Date) {
    if (showDialogAnimation) {
      if (timeout.current) {
        clearTimeout(timeout.current);
        setShowDialogAnimation(false);
        dialogInfo.current?.close();
      }
    }
    setDialogInfoMsg("Buscando dados de hoje...");
    if (!dialogInfo.current?.hasAttribute("show")) {
      dialogInfo.current?.show();
    }
    setShowDialogAnimation(true);

    let dateStr = date.toLocaleString("pt-BR").split(",")[0];
    fetchData(date.toISOString().split("T")[0], itemActive.API).then((e) => {
      if (e?.sucess) {
        setDialogInfoMsg("Dados encontrados com sucesso!");
        dateCurrent.current = dateStr;
        console.log(e);
        itemActive.cache(e);
      } else {
        setDialogInfoMsg(e?.error as dialogMsg);
        itemActive.cache(null);
        dateCurrent.current = null;
      }
      timeout.current = setTimeout(() => {
        setShowDialogAnimation(false);
      }, 2000);
    });
  }

  //Lógica ao setar uma nova data:
  useEffect(() => {
    (async () => {
      if (dateCalendar) showMsgFetchData(dateCalendar);
    })();
  }, [dateCalendar]);

  //Lógica ao mudar de aba:
  useEffect(() => {
    (async () => {
      showMsgFetchData(new Date());
    })();
  }, [itemActive]);

  useEffect(() => {
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

  const handleRegister = async () => {
    let object;
    if (itemActive.obj) {
      object = {
        date: dateCalendar ?? new Date(),
        data: { ...itemActive.obj },
      };
    }
    console.log(itemActive.obj)

    try {const result = await fetch(itemActive.API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
    
      result.json().then((e) => {
        if (e.sucess) {
          dialogSave.current?.showModal();
          setTimeout(() => {
            dialogSave.current?.close();
          }, 2000);
        }
      });
    } catch (error) {
      console.log(error)
    }
  };

  function renderForm() {
    switch (itemActive.aba) {
      case "1- Recebimento":
        return (
          <FormRecebimento
            onSave={(data: ObjFormRecebimento) => {
              itemActive.obj = data;
            }}
            cacheData={cacheFormRecebimento}
          />
        );
      case "1.1- Armamento":
        return (
          <FormArmamento
            onSave={(data: ObjFormArmamento) => {
              itemActive.obj = data;
            }}
          />
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
    {
      aba: "1- Recebimento",
      API: "/api/auth/form-recebimento",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "1.1- Armamento",
      API: "/api/auth/form-armamento",
      obj: {},
      cache: setCacheFormArmamento,
    },
    {
      aba: "2- Equipe",
      API: "/api/auth/form-equipe",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "3- Trocas / HE",
      API: "/api/auth/form-trocas-he",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "05- 11 Expediente",
      API: "/api/auth/form-expediente",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "12- Revezamento",
      API: "/api/auth/form-revezamento",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "13-14 Rotina Diária",
      API: "/api/auth/form-rotina-diaria",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "15- Entrada/Saída de Presos",
      API: "/api/auth/form-entrada-presos",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "16- Mudança de cela/Pedido Seguro",
      API: "/api/auth/form-mudanca-cela",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "17- Escolta de Presos",
      API: "/api/auth/form-escolta-preso",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "18 - SIGO",
      API: "/api/auth/form-sigo",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "19 - Inclusão/Retorno",
      API: "/api/auth/form-inclusao-retorno",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "20 - Dados Finais",
      API: "/api/auth/form-dados-finais",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "21 - Assinatura",
      API: "/api/auth/form-assinatura",
      obj: {},
      cache: setCacheFormRecebimento,
    },
    {
      aba: "22 - Encerramento",
      API: "/api/auth/form-encerramento",
      obj: {},
      cache: setCacheFormRecebimento,
    },
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
            className="flex items-center justify-center gap-1 text-cinza-escuro text-sm font-bold w-15 rounded-[5px] bg-amarelo-claro p-1 shadow-black shadow-[1px_1px_4px] cursor-pointer hover:text-amarelo-claro hover:bg-cinza-maisescuro transition-all"
            onClick={logout}
          >
            <p>Sair</p>
            <RefreshCcw
              className={`w-4 animate-spin ${!progress && "hidden"}`}
            />
          </div>
        </div>
      </nav>

      <div className="flex flex-col gap-3 flex-1 items-center justify-center">
        {dateCurrent.current && (
          <div className="text-center text-gray-500 pointer-events-none">
            <p>Esses dados são relativos à data de {dateCurrent.current} </p>
          </div>
        )}
        {renderForm()}
        <button title="Salva o formulário">
          <SavePlus
            className="p-3 w-16 h-16 fixed right-5 bottom-5 rounded-lg text-cinza-escuro bg-amarelo-claro hover:bg-cinza-maisescuro hover:text-amarelo-claro cursor-pointer hover:w-17 hover:h-17 transition-all"
            onClick={handleRegister}
          />
        </button>
        <button title="Gera o relatório em PDF">
          <StickyNotes className="p-3 w-16 h-16 fixed right-5 bottom-25 rounded-lg text-cinza-escuro bg-amarelo-claro hover:bg-cinza-maisescuro hover:text-amarelo-claro cursor-pointer hover:w-17 hover:h-17 transition-all" />
        </button>
        <button
          title="Selecione uma data para visualizar os dados"
          onClick={(e) => {
            if (showCalendar) {
              setShowCalendar(false);
            } else {
              setShowCalendar(true);
            }
          }}
        >
          <Calendar className="p-3 w-16 h-16 fixed right-5 bottom-45 rounded-lg text-cinza-escuro bg-amarelo-claro hover:bg-cinza-maisescuro hover:text-amarelo-claro cursor-pointer hover:w-17 hover:h-17 transition-all" />
        </button>
      </div>
      <DialogDate
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        setDate={setDateCalendar}
        date={dateCalendar}
      />
      <DialogInfo
        mensagem={dialogInfoMsg}
        ref={dialogInfo}
        show={showDialogAnimation}
      />
      <DialogSave ref={dialogSave} />
    </main>
  );
}
