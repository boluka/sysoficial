'use client'
import { useEffect, useState } from "react";
import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import { FormProps } from "@/app/interfaces/FormProps";
import { FormInclusaoRetorno as ObjFormInclusaoRetorno } from "@/generated/prisma";

const gerarComponentes = (
  nome: string,
  [valor, funcao]: [string, (e: string) => void],
  key: number,
) => {
  return (
    <div key={key} className="flex items-center gap-2">
      <p className="whitespace-nowrap text-amarelo-claro">{nome}</p>
      <TextAreaComponent
        height="h-15"
        width="w-full"
        value={valor}
        setTextArea={funcao}
      />
    </div>
  );
};

export default function FormInclusaoRetorno({
  onSave,
  cacheData,
  readyData,
  generateData,
}: FormProps<ObjFormInclusaoRetorno>) {
  const [inclusao, setInclusao] = useState("");
  const [retorno, setRetorno] = useState("");
  const [exclusao, setExclusao] = useState("");

  useEffect(() => {
    if (generateData) {
      onSave({
        id: 0,
        inclusao: inclusao || null,
        exclusao: exclusao || null,
        retorno: retorno || null,
        relatorioId: "",
      });
      readyData && readyData(true);
    }
  }, [generateData]);
  useEffect(() => {
    if (cacheData && cacheData.payload) {
      const { inclusao, exclusao, retorno } = cacheData.payload;
      setInclusao(inclusao || "");
      setExclusao(exclusao || "");
      setRetorno(retorno || "");
    } else {
      setInclusao("");
      setExclusao("");
      setRetorno("");
    }
  }, [cacheData]);

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro  text-[1.3em] font-bold">
        Inclusão, retorno e exclusão de presos em trânsito
      </h2>
      <section className={`${styles["style-div"]} flex flex-col`}>
        {[
          {
            nome: "Inclusão: ",
            arr: [inclusao, setInclusao] as [string, (e: string) => void],
          },
          {
            nome: "Retorno: ",
            arr: [retorno, setRetorno] as [string, (e: string) => void],
          },
          {
            nome: "Exclusão: ",
            arr: [exclusao, setExclusao] as [string, (e: string) => void],
          },
        ].map((e, i) => {
          return gerarComponentes(e.nome, e.arr, i);
        })}
      </section>
    </FormDefault>
  );
}
