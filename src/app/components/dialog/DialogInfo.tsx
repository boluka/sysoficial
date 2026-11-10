"use client";
import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";

export type dialogMsg =
  | "Buscando dados de hoje..."
  | "Formulário do dia não encontrado"
  | "Erro ao buscar o relatório do dia"
  | "Dados encontrados com sucesso!"
  | "Relatório do dia não encontrado"
  | "Salvando dados..."
  | "Dados salvos com sucesso!"
  | "Ocorreu um erro ao salvar"

// 1. Configuração estática fora do componente (evita recriação na memória)
const DIALOG_CONFIG: Record<
  dialogMsg,
  { text: string; border: string; icon: React.ReactNode }
> = {
  "Buscando dados de hoje...": {
    text: "text-yellow-500",
    border: "border-l-yellow-500",
    icon: <LoaderCircle className="animate-spin w-5 h-6 text-yellow-400" />,
  },
  "Salvando dados...": {
    text: "text-yellow-500",
    border: "border-l-yellow-500",
    icon: <LoaderCircle className="animate-spin w-5 h-6 text-yellow-400" />,
  },
  "Formulário do dia não encontrado": {
    text: "text-yellow-500",
    border: "border-l-yellow-500",
    icon: <CircleX className="w-5 h-6 text-yellow-500" />,
  },
  "Relatório do dia não encontrado": {
    text: "text-yellow-500",
    border: "border-l-yellow-500",
    icon: <CircleX className="w-5 h-6 text-yellow-500" />,
  },
  "Erro ao buscar o relatório do dia": {
    text: "text-red-500",
    border: "border-l-red-500",
    icon: <CircleX className="w-5 h-6 text-red-500" />,
  },
  "Ocorreu um erro ao salvar": {
    text: "text-red-500",
    border: "border-l-red-500",
    icon: <CircleX className="w-5 h-6 text-red-500" />,
  },
  "Dados encontrados com sucesso!": {
    text: "text-[#35ff2e]",
    border: "border-l-[#35ff2e]",
    icon: <CircleCheck className="w-5 h-6 text-[#35ff2e]" />,
  },
    "Dados salvos com sucesso!": {
    text: "text-[#35ff2e]",
    border: "border-l-[#35ff2e]",
    icon: <CircleCheck className="w-5 h-6 text-[#35ff2e]" />,
  }
};

export default function DialogInfo({
  mensagem,
  ref,
  show,
}: {
  mensagem: dialogMsg;
  ref?: React.Ref<HTMLDialogElement>;
  show?: boolean;
}) {
  // 2. Busca direta dos estilos e ícone com base na mensagem atual
  const config = DIALOG_CONFIG[mensagem];

  return (
    <dialog
      className={`bg-black border border-zinc-600 border-l-3 ${config && config.border} shadow-[5px_5px_15px_#171717] rounded-[5px] text-gray-300 fixed top-[87%] p-5 ounded-[5px] outline-none duration-500 transition-all ${show ? "opacity-100 left-5" : "opacity-0 -left-10"}`}
      ref={ref}
    >
      <div className="flex gap-2 items-center justify-center">
        {config && config.icon}
        <p className={`${config && config.text} text-[0.9em] transition-all duration-500`}>{mensagem}</p>
      </div>
    </dialog>
  );
}
