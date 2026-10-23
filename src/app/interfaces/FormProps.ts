import { Person } from "@/generated/prisma";
import { ObjFormEquipe } from "../types/form";
import { SucessAuth } from "../types/auth";

export interface FormProps<T> {
      person?: Person[] | undefined;
      onSave: (data: T) => void;
      cacheData: SucessAuth<T> | null;
}