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
  id: number
  num: string
  tipo: string
}


export interface ObjArmamento {
  num: string
  tipo: string
  calibre: string
}