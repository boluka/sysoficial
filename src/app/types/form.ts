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
export interface ObjFormArmamento {
  armamento: InputJsonValue
  municao: number
  qtPistola: number
  qtCarabinaQuinze: number
  qtCarabinaTrinta: number
}
export interface ObjFormEquipe {
  id: number
  chefeEquipe: string 
  auxChefe: String
  portariaPrinc: String
  auxPort1?: String
  auxPort2?: String
  passarelaPrinc?: String
  escolaPadaria?: String
  trabalhoCrina?: String
  responsavelPv1: String
  corredorPv1?: String
  responsavelPv2: String
  corredorPv2?: String
}



export interface ObjArmamento {
  id:number
  num: string
  tipo: string
  calibre?: string
}