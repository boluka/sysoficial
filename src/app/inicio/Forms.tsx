"use client";

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  SavePlus,
  StickyNotes,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ElementType,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

// Componentes de Formulário
import FormRecebimento from "@/app/components/forms/FormRecebimento";
import FormArmamento from "../components/forms/FormArmamento";
import FormEquipe from "../components/forms/FormEquipe";
import FormTrocasHe from "../components/forms/FormTrocasHe";
import FormExpediente from "../components/forms/FormExpediente";
import FormRevezamento from "../components/forms/FormRevezamento";
import FormRotinaDiaria from "../components/forms/FormRotinaDiaria";
import FormEntradaPresos from "../components/forms/FormEntradaPresos";
import FormaSaidaPresos from "../components/forms/FormSaidaPresos";
import FormMudancaCela from "../components/forms/FormMudancaCela";
import FormPedidoSeguro from "../components/forms/FormPedidoSeguro";
import FormEscoltaPreso from "../components/forms/FormEscoltaPreso";
import FormEscoltaNRealizada from "../components/forms/FormEscoltaNaoRealizada";
import FormSigo from "../components/forms/FormSigo";
import FormInclusaoRetorno from "../components/forms/FormInclusaoRetorno";
import FormDadosFinais from "../components/forms/FormDadosFinais";
import FormAssinatura from "../components/forms/FormAssinatura";
import FormEncerramento from "../components/forms/FormEncerramento";

// Dialogs, Hooks, Services e Tipos
import DialogInfo, { dialogMsg } from "../components/dialog/DialogInfo";
import DialogDate from "../components/dialog/DialogDate";
import DialogSave from "../components/dialog/DialogSave";
import { MenuBar } from "../components/shadcn/menubar/MenuBar";
import { fetchHorarios, fetchPerson } from "./services";
import { useFetchData } from "@/hooks/useFetchData";
import { useSaveData } from "@/hooks/useSaveData";
import { SucessAuth } from "../types/auth";
import { Hours, Person } from "@/generated/prisma";
import { useReportTab } from "@/hooks/useReportTab";

// 1. Configuração centralizada: substitui o array elementLi E o switch gigante
interface FormConfigItem {
  label: string;
  api: string;
  component: ElementType;
  usesCacheProp?: boolean; // Caso algum form espere "cache" em vez de "cacheData"
}

export const FORMS_CONFIG: Record<string, FormConfigItem> = {
  recebimento: {
    label: "Recebimento",
    api: "/api/auth/form-recebimento",
    component: FormRecebimento,
  },
  armamento: {
    label: "Armamento",
    api: "/api/auth/form-armamento",
    component: FormArmamento,
  },
  equipe: {
    label: "Equipe",
    api: "/api/auth/form-equipe",
    component: FormEquipe,
  },
  "trocas-he": {
    label: "Trocas / HE",
    api: "/api/auth/form-trocas-he",
    component: FormTrocasHe,
    usesCacheProp: true,
  },
  expediente: {
    label: "Expediente",
    api: "/api/auth/form-expediente",
    component: FormExpediente,
  },
  revezamento: {
    label: "Revezamento",
    api: "/api/auth/form-revezamento",
    component: FormRevezamento,
  },
  "rotina-diaria": {
    label: "Rotina Diária",
    api: "/api/auth/form-rotina-diaria",
    component: FormRotinaDiaria,
  },
  "entrada-presos": {
    label: "Entrada Presos",
    api: "/api/auth/form-entrada-presos",
    component: FormEntradaPresos,
  },
  "saida-presos": {
    label: "Saída Presos",
    api: "/api/auth/form-saida-presos",
    component: FormaSaidaPresos,
  },
  "mudanca-cela": {
    label: "Mudança Cela Operacional",
    api: "/api/auth/form-mudanca-cela",
    component: FormMudancaCela,
  },
  "pedido-seguro": {
    label: "Pedido Seguro",
    api: "/api/auth/form-pedido-seguro",
    component: FormPedidoSeguro,
  },
  "escolta-preso": {
    label: "Escolta de Presos",
    api: "/api/auth/form-escolta-preso",
    component: FormEscoltaPreso,
  },
  "escolta-nao-realizada": {
    label: "Escolta não realizada",
    api: "/api/auth/form-escolta-nao-realizada",
    component: FormEscoltaNRealizada,
  },
  sigo: {
    label: "SIGO",
    api: "/api/auth/form-sigo",
    component: FormSigo,
  },
  "inclusao-retorno": {
    label: "Inclusão/Retorno",
    api: "/api/auth/form-inclusao-retorno",
    component: FormInclusaoRetorno,
  },
  "dados-finais": {
    label: "Dados Finais",
    api: "/api/auth/form-dados-finais",
    component: FormDadosFinais,
  },
  assinatura: {
    label: "Assinatura",
    api: "/api/auth/form-assinatura",
    component: FormAssinatura,
  },
  encerramento: {
    label: "Encerramento",
    api: "/api/auth/form-encerramento",
    component: FormEncerramento,
  },
};

type FormKey = keyof typeof FORMS_CONFIG;
const FORM_KEYS = Object.keys(FORMS_CONFIG) as FormKey[];

const formatarDataBr = (data: Date): string => {
  return data.toLocaleDateString("pt-BR");
};

export default function Initial({
  initialNickname,
}: {
  initialNickname: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Refs de controle
  const dialogInfo = useRef<HTMLDialogElement>(null);
  const dialogSave = useRef<HTMLDialogElement>(null);
  const dateCurrent = useRef<string | null>(null);
  const formPayloadRef = useRef({}); // Substitui mutação direta em itemActive.obj
  const dateDialogRef = useRef<HTMLDialogElement>(null);

  // Estados gerais
  const [dialogInfoMsg, setDialogInfoMsg] = useState<dialogMsg>(
    "Buscando dados de hoje...",
  );
  const [showDialogAnimation, setShowDialogAnimation] = useState(false);
  const [generateDataForm, setGenerateDataForm] = useState(false);
  const [formDataReady, setFormDataReady] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateCalendar, setDateCalendar] = useState<Date | undefined>(
  );

  const [progress, setProgress] = useState(false);

  // Dados carregados da API
  const [person, setPerson] = useState<Person[]>([]);
  const [hours, setHours] = useState<Hours[]>([]);
  const [nickname, setNickname] = useState("");

  // 2. Estado único para todos os caches (substitui 18 useStates)
  const [caches, setCaches] = useState<Record<string, SucessAuth | null>>({});

  const { activeTab: activeKey, setActiveTab } = useReportTab();
  const currentConfig = FORMS_CONFIG[activeKey];

  const currentIndex = FORM_KEYS.indexOf(activeKey);
  const prevTab: FormKey | null =
    currentIndex != undefined ? FORM_KEYS[currentIndex - 1] : null;
  const nextTab: FormKey | null =
    currentIndex != undefined ? FORM_KEYS[currentIndex + 1] : null;
  // Hooks customizados
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

  useEffect(() => {
    const savedDate = localStorage.getItem("date");
    if (savedDate) {
      const parsedDate = new Date(savedDate);
      if (!isNaN(parsedDate.getTime())) {
        setDateCalendar(parsedDate);
        return;
      }
    }

    setDateCalendar(new Date());
  }, []);

  // Busca dados ao mudar a data ou a aba ativa
  useEffect(() => {
    if (!dateCalendar) return;
    localStorage.setItem("date", dateCalendar.toISOString());

    const activeItemAdapter = {
      aba: currentConfig.label,
      API: currentConfig.api,
      obj: formPayloadRef.current,
      cache: (val: SetStateAction<SucessAuth | null>) => {
        setCaches((prev) => {
          const currentTabCache = prev[activeKey] ?? null;
          const nextValue =
            typeof val === "function" ? val(currentTabCache) : val;

          return { ...prev, [activeKey]: nextValue };
        });
      },
    };

    showMsgFetchData(
      dateCalendar,
      activeItemAdapter,
      dialogInfo.current,
      dateCurrent,
    );
  }, [dateCalendar, activeKey]);

  // Carregamento inicial (Servidores, Horários e Nome do Usuário)
  useEffect(() => {
    async function loadInitialData() {
      const [personData, hoursData] = await Promise.all([
        fetchPerson(),
        fetchHorarios(),
      ]);

      if (personData) setPerson(personData);
      if (hoursData) setHours(hoursData);
    }

    loadInitialData();

    const userFromUrl = searchParams.get("nome");
    if (userFromUrl) {
      localStorage.setItem("nome", userFromUrl);
      setNickname(userFromUrl);
    } else {
      const savedName = localStorage.getItem("nome");
      if (savedName) setNickname(savedName);
    }
  }, [searchParams]);

  // Envia os dados quando o formulário sinalizar que está pronto
  useEffect(() => {
    if (!formDataReady) return;

    postData(formPayloadRef.current, currentConfig.api, dialogInfo.current);
  }, [formDataReady]);

  const handleLogout = async () => {
    setProgress(true);
    try {
      const result = await fetch("/api/auth/logout", { method: "POST" });
      const data = (await result.json()) as SucessAuth;
      if (data.sucess) router.push("/");
    } finally {
      setProgress(false);
    }
  };

  useEffect(() => {
    if (showCalendar) {
      dateDialogRef && dateDialogRef.current?.focus();
    }
  }, [showCalendar]);

  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    setGenerateDataForm(true);
  };

  const handleNextForm = (e: React.MouseEvent) => {
    if (nextTab) setActiveTab(nextTab);
  };
  const handlePrevForm = (e: React.MouseEvent) => {
    if (prevTab) setActiveTab(prevTab);
  };
  const generatePDF = (e: React.MouseEvent) => {
    const params = new URLSearchParams(searchParams.toString());
    if (dateCalendar) {
      params.set("date", dateCalendar.toISOString().split("T")[0]);
      router.push(`/relatorio?${params.toString()}`);
    }
  };

  // 4. Renderização dinâmica sem Switch Case
  const ActiveFormComponent = currentConfig.component;
  const currentCache = caches[activeKey] ?? null;

  return (
    <main className="flex flex-col bg-linear-to-b from-cinza-maisescuro  to-cinza-escuro min-h-screen w-full ">
      <nav className="flex justify-between items-center bg-cinza-escuro p-2 gap-4">
        <MenuBar></MenuBar>
        <div className="flex gap-5 items-center text-amarelo-claro shrink-0 mr-1">
          <p>Bem-vindo {initialNickname} !</p>
          <div
            className="flex items-center justify-center gap-1 text-cinza-escuro text-sm font-bold w-15 rounded-[5px] bg-amarelo-claro p-1 shadow-black shadow-[1px_1px_4px] cursor-pointer hover:text-amarelo-claro hover:bg-cinza-maisescuro transition-all"
            onClick={handleLogout}
          >
            <p>Sair</p>
            <RefreshCcw
              className={`w-4 animate-spin ${!progress && "hidden"}`}
            />
          </div>
        </div>
      </nav>

      <div className="flex flex-col flex-1 items-center justify-center max-2xl:my-10">
        {dateCalendar && (
          <div className="text-center text-sm text-gray-300 px-2 py-1 pointer-events-none bg-cinza-maisescuro ring-1 ring-gray-500/70 my-1 rounded-[5px]">
            <p>{`Data: ${formatarDataBr(dateCalendar)}`} </p>
          </div>
        )}
        {
          <ActiveFormComponent
            onSave={(data: any) => {
              formPayloadRef.current = data;
            }}
            cacheData={currentCache}
            person={person}
            hours={hours}
            generateData={generateDataForm}
            readyData={setFormDataReady}
          ></ActiveFormComponent>
        }
        <section className="flex justify-center gap-3 min-w-120 w-1/2 max-w-180 bg-cinza-maisescuro rounded-b-2xl">
          <button
            className="flex text-white px-2 py-1  bg-cinza-maisescuro ring-1 ring-gray-500/70 my-1 rounded-[5px] hover:text-amarelo-claro transition-colors duration-100 cursor-pointer "
            onClick={handlePrevForm}
          >
            <ChevronLeft />
            <span>Anterior</span>
          </button>
          <button
            className="flex text-white px-2 py-1  bg-cinza-maisescuro ring-1 ring-gray-500/70 my-1 rounded-[5px] hover:text-amarelo-claro transition-colors duration-100 cursor-pointer "
            onClick={handleNextForm}
          >
            <span>Próximo</span>
            <ChevronRight />
          </button>
        </section>
        <button title="Salva o formulário">
          <SavePlus
            className="p-3 w-16 h-16 fixed right-5 bottom-5 rounded-lg text-cinza-escuro bg-amarelo-claro hover:bg-cinza-maisescuro hover:text-amarelo-claro cursor-pointer hover:w-17 hover:h-17 transition-all"
            onClick={handleRegister}
          />
        </button>
        <button title="Gera o relatório em PDF" onClick={generatePDF}>
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
        ref={dateDialogRef}
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
