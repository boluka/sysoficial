import {
  FormArmamento,
  FormAssinatura,
  FormDadosFinais,
  FormEncerramento,
  FormEntradaPresos,
  FormEquipe,
  FormEscoltaNaoRealizada,
  FormEscoltaPresos,
  FormExpediente,
  FormInclusaoRetorno,
  FormMudancaCelaOperacional,
  FormPedidoSeguro,
  FormRecebimento,
  FormRevezamento,
  FormRotinaDiaria,
  FormSaidaPresos,
  FormSigo,
  FormTrocaHe,
} from "@/generated/prisma";
import { InputJsonValue, JsonValue } from "@/generated/prisma/runtime/client";

export interface ObjFormRecebimento {
  plantao: string;
  chefeReceb: string;
  chefeEntrega: string;
  chefeAuxiliar: string;
  efetivoCarc: number;
  transitoCarc: number;
  mat_carga: string;
  mat_belico: string;
}

export interface ObjArmamento {
  id: number;
  num: string;
  tipo: string;
  calibre?: string;
}
export interface ReportPayload {
  payload: {
    formRecebimento?: FormRecebimento;
    formArmamento?: FormArmamento;
    formEquipe?: FormEquipe;
    formTrocaHe?: FormTrocaHe;
    formExpediente?: FormExpediente;
    formRevezamento?: FormRevezamento;
    formRotinaDiaria?: FormRotinaDiaria;
    formEntradaSaida?: FormEntradaPresos;
    formSaidaPresos?: FormSaidaPresos;
    formMudancaCelaOperacional?: FormMudancaCelaOperacional;
    formPedidoSeguro?: FormPedidoSeguro;
    formEscoltaPresos?: FormEscoltaPresos;
    formEscoltaNaoRealizada?: FormEscoltaNaoRealizada;
    formSigo?: FormSigo;
    formInclusaoRetorno?: FormInclusaoRetorno;
    formDadosFinais?: FormDadosFinais;
    formAssinatura?: FormAssinatura;
    formEncerramento?: FormEncerramento;
  };
}
