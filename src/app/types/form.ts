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
  id?: number
  chefeEquipe: string 
  auxChefe: string
  portariaPrinc: string
  auxPort1?: string
  auxPort2?: string
  passarelaPrinc?: string
  escolaPadaria?: string
  trabalhoCrina?: string
  responsavelPv1: string
  corredorPv1?: InputJsonValue
  responsavelPv2: string
  corredorPv2?: InputJsonValue
  demaisAux?: string
}



export interface ObjArmamento {
  id:number
  num: string
  tipo: string
  calibre?: string
}