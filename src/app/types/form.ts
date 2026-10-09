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



export interface ObjArmamento {
  id:number
  num: string
  tipo: string
  calibre?: string
}