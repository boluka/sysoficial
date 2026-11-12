"use client";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  SavePlus,
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
  ObjFormArmamento,
  ObjFormEquipe,
  ObjFormRecebimento,
} from "@/app/types/form";
import DialogDate from "../components/dialog/DialogDate";
import { fetchHorarios, fetchPerson } from "./services";
import DialogSave from "../components/dialog/DialogSave";
import {
  FormEntradaPresos as ObjFormEntradaPresos,
  FormTrocaHe,
  Hours,
  Person,
  FormSaidaPresos as ObjFormSaidaPresos,
  FormMudancaCelaOperacional,
  FormPedidoSeguro as ObjFormPedidoSeguro,
  FormEscoltaPresos as ObjFormEscoltaPresos,
  FormSigo as ObjFormSigo,
} from "@/generated/prisma";
import { useFetchData } from "@/hooks/useFetchData";
import FormEntradaPresos from "../components/forms/FormEntradaPresos";
import FormaSaidaPresos from "../components/forms/FormSaidaPresos";
import { useSaveData } from "@/hooks/useSaveData";
import FormPedidoSeguro from "../components/forms/FormPedidoSeguro";
import FormEscoltaNRealizada from "../components/forms/FormEscoltaNaoRealizada";

export default function Report() {
  const dialogInfo = useRef<HTMLDialogElement>(null);
  const dialogSave = useRef<HTMLDialogElement>(null);
  const [dialogInfoMsg, setDialogInfoMsg] = useState<dialogMsg>(
    "Buscando dados de hoje...",
  );
  const [showDialogAnimation, setShowDialogAnimation] = useState(false);

  const [generateDataForm, setGenerateDataForm] = useState<boolean>(false);
  const [formDataReady, setFormDataReady] = useState<boolean>(false);
  const [person, setPerson] = useState<Person[]>();
  const verifyDateActual = new Date().toLocaleString("pt-BR").split(",")[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const [nickname, setNickname] = useState("");
  const searchParams = useSearchParams();
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateCalendar, setDateCalendar] = useState<Date | undefined>(
    new Date(),
  );
  const showMsgFetchData = useFetchData({
    showDialogAnimation,
    setShowDialogAnimation,
    setDialogInfoMsg,
  });
  const postData = useSaveData(
    setGenerateDataForm,
    setFormDataReady,
    dateCalendar,
    { showDialogAnimation, setShowDialogAnimation, setDialogInfoMsg },
  );

  const [cacheFormRecebimento, setCacheFormRecebimento] =
    useState<SucessAuth | null>(null);

  const [cacheFormArmamento, setCacheFormArmamento] =
    useState<SucessAuth | null>(null);

  const [cacheFormEquipe, setCacheFormEquipe] = useState<SucessAuth | null>(
    null,
  );

  const [cacheFormTrocaHe, setCacheFormTrocaHe] = useState<SucessAuth | null>(
    null,
  );

  const [cacheFormExpediente, setCacheFormExpediente] =
    useState<SucessAuth | null>(null);

  const [cacheFormRevezamento, setCacheFormRevezamento] =
    useState<SucessAuth | null>(null);

  const [cacheFormRotinaDiaria, setCacheFormRotinaDiaria] =
    useState<SucessAuth | null>(null);

  const [cacheFormEntradaPresos, setCacheFormEntradaPresos] =
    useState<SucessAuth | null>(null);

  const [cacheFormSaidaPresos, setCacheFormSaidaPresos] =
    useState<SucessAuth | null>(null);

  const [cacheFormPedidoSeguro, setCacheFormPedidoSeguro] =
    useState<SucessAuth | null>(null);

  const [cacheFormMudancaCela, setCacheFormMudancaCela] =
    useState<SucessAuth | null>(null);

  const [cacheFormEscoltaPresos, setCacheFormEscoltaPresos] =
    useState<SucessAuth | null>(null);

  const [cacheFormEscoltaNaoRealizada, setCacheFormEscoltaNaoRealizada] =
    useState<SucessAuth | null>(null);

  const [cacheFormSigo, setCacheFormSigo] =
    useState<SucessAuth | null>(null);

  const [itemActive, setItemActive] = useState({
    aba: "19 - SIGO",
    API: "/api/auth/form-sigo",
    obj: {},
    cache: setCacheFormSigo,
  });
  const [progress, setProgress] = useState(false);
  const [hour, setHour] = useState<Hours[]>([]);

  const router = useRouter();
  let dateCurrent = useRef<string | null>(null);

  //Lógica ao setar uma nova data e Lógica ao mudar de aba:
  useEffect(() => {
    (async () => {
      if (dateCalendar)
        showMsgFetchData(
          dateCalendar,
          itemActive,
          dialogInfo.current,
          dateCurrent,
        );
    })();
  }, [dateCalendar, itemActive]);

  //Ao carregar a página, recebe os servidores cadastrados e os horários de ronda.
  useEffect(() => {
    (async () => {
      const result = await fetchPerson();
      if (result) {
        setPerson(result);
      }
    })();

    (async () => {
      const result = await fetchHorarios();
      console.log(result);
      if (result) {
        setHour(result);
      }
    })();

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

  //Insere os dados dos formulários nas tabelas
  useEffect(() => {
    (async () => {
      if (formDataReady) {
        await postData(itemActive.obj, itemActive.API, dialogInfo.current);
      }
    })();
  }, [formDataReady]);

  const handleRegister = async () => {
    setGenerateDataForm(true);
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
            person={person}
          />
        );
      case "1.1- Armamento":
        return (
          <FormArmamento
            onSave={(data: ObjFormArmamento) => {
              itemActive.obj = data;
            }}
            cacheData={cacheFormArmamento}
          />
        );
      case "2- Equipe":
        return (
          <FormEquipe
            person={person}
            onSave={(data: ObjFormEquipe) => {
              itemActive.obj = data;
            }}
            cacheData={cacheFormEquipe}
          />
        );

      case "3- Trocas / HE":
        return (
          <FormTrocasHe
            person={person}
            onSave={(data: FormTrocaHe) => {
              itemActive.obj = data;
            }}
            cache={cacheFormTrocaHe}
          />
        );

      case "05- 11 Expediente":
        return (
          <FormExpediente
            person={person}
            onSave={(data: {}) => (itemActive.obj = data)}
            cacheData={cacheFormExpediente}
          />
        );
      case "12- Revezamento":
        return (
          <FormRevezamento
            person={person}
            onSave={(data: {}) => {
              itemActive.obj = data;
            }}
            cacheData={cacheFormRevezamento}
            readyData={setFormDataReady}
            generateData={generateDataForm}
            hours={hour}
          />
        );
      case "13-14 Rotina Diária":
        return (
          <FormRotinaDiaria
            onSave={(data: {}) => {
              itemActive.obj = data;
            }}
            cacheData={cacheFormRotinaDiaria}
            generateData={generateDataForm}
            readyData={setFormDataReady}
          />
        );
      case "15- Entrada Presos":
        return (
          <FormEntradaPresos
            onSave={(data: ObjFormEntradaPresos) => {
              itemActive.obj = data;
            }}
            cacheData={cacheFormEntradaPresos}
            generateData={generateDataForm}
            readyData={setFormDataReady}
          />
        );
      case "16- Saída Presos":
        return (
          <FormaSaidaPresos
            onSave={(data: ObjFormSaidaPresos) => {
              itemActive.obj = data;
            }}
            cacheData={cacheFormSaidaPresos}
            generateData={generateDataForm}
            readyData={setFormDataReady}
          />
        );
      case "17- Mudança Cela Operacional":
        return (
          <FormMudancaCela
            onSave={(data: FormMudancaCelaOperacional) => {
              itemActive.obj = data;
            }}
            cacheData={cacheFormMudancaCela}
            generateData={generateDataForm}
            readyData={setFormDataReady}
          />
        );
      case "Pedido Seguro":
        return (
          <FormPedidoSeguro
            onSave={(data: ObjFormPedidoSeguro) => {
              itemActive.obj = data;
            }}
            cacheData={cacheFormPedidoSeguro}
            generateData={generateDataForm}
            readyData={setFormDataReady}
          />
        );

      case "17- Escolta de Presos":
        return (
          <FormEscoltaPreso
            onSave={(data: ObjFormEscoltaPresos) => {
              itemActive.obj = data;
            }}
            cacheData={cacheFormEscoltaPresos}
            generateData={generateDataForm}
            readyData={setFormDataReady}
          />
        );
      case "18- Escolta não realizada":
        return (
          <FormEscoltaNRealizada
            onSave={(data: ObjFormEscoltaPresos) => {
              itemActive.obj = data;
            }}
            cacheData={cacheFormEscoltaNaoRealizada}
            generateData={generateDataForm}
            readyData={setFormDataReady}
          />
        );
      case "19 - SIGO":
        return (
          <FormSigo
            onSave={(data: ObjFormSigo) => {
              itemActive.obj = data;
            }}
            cacheData={cacheFormSigo}
            generateData={generateDataForm}
            readyData={setFormDataReady}
          />
        );
      case "20 - Inclusão/Retorno":
        return <FormInclusaoRetorno />;
      case "21 - Dados Finais":
        return <FormDadosFinanis />;
      case "22 - Assinatura":
        return <FormAssinatura />;
      case "23 - Encerramento":
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

  const elementLi = useRef([
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
      cache: setCacheFormEquipe,
    },
    {
      aba: "3- Trocas / HE",
      API: "/api/auth/form-trocas-he",
      obj: {},
      cache: setCacheFormTrocaHe,
    },
    {
      aba: "05- 11 Expediente",
      API: "/api/auth/form-expediente",
      obj: {},
      cache: setCacheFormExpediente,
    },
    {
      aba: "12- Revezamento",
      API: "/api/auth/form-revezamento",
      obj: {},
      cache: setCacheFormRevezamento,
    },
    {
      aba: "13-14 Rotina Diária",
      API: "/api/auth/form-rotina-diaria",
      obj: {},
      cache: setCacheFormRotinaDiaria,
    },
    {
      aba: "15- Entrada Presos",
      API: "/api/auth/form-entrada-presos",
      obj: {},
      cache: setCacheFormEntradaPresos,
    },
    {
      aba: "16- Saída Presos",
      API: "/api/auth/form-saida-presos",
      obj: {},
      cache: setCacheFormSaidaPresos,
    },
    {
      aba: "17- Mudança Cela Operacional",
      API: "/api/auth/form-mudanca-cela",
      obj: {},
      cache: setCacheFormMudancaCela,
    },
    {
      aba: "Pedido Seguro",
      API: "/api/auth/form-pedido-seguro",
      obj: {},
      cache: setCacheFormPedidoSeguro,
    },
    {
      aba: "17- Escolta de Presos",
      API: "/api/auth/form-escolta-preso",
      obj: {},
      cache: setCacheFormEscoltaPresos,
    },
    {
      aba: "18- Escolta não realizada",
      API: "/api/auth/form-escolta-nao-realizada",
      obj: {},
      cache: setCacheFormEscoltaNaoRealizada,
    },
    {
      aba: "19 - SIGO",
      API: "/api/auth/form-sigo",
      obj: {},
      cache: setCacheFormSigo,
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
  ]);
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
            className="flex overflow-x-auto scroll-smooth scrollbar-none w-full px-2  gap-3 items-center "
          >
            {elementLi.current.map((e) => {
              const active = itemActive.aba === e.aba;
              return (
                <div
                  key={e.aba}
                  className={`${active ? "bg-amarelo-claro text-cinza-escuro font-bold " : "bg-cinza-escuro text-amarelo-claro"} p-3 my-1 rounded-[5px] text-sm cursor-pointer transition-all duration-200 shadow-black shadow-[1px_1px_4px] whitespace-nowrap shrink-0 `}
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
        {/* {dateCurrent.current && (
          <div className="text-center text-gray-500 pointer-events-none">
            <p>
              {`Esses dados são relativos à data de ${dateCurrent?.current == verifyDateActual ? "hoje" : dateCurrent.current}`}{" "}
            </p>
          </div>
        )} */}
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
