"use client";
import { cache, useEffect, useState } from "react";
import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import { FormSigo as ObjFormSigo } from "@/generated/prisma";
import { FormProps } from "@/app/interfaces/FormProps";

export default function FormSigo({
  onSave,
  cacheData,
  readyData,
  generateData,
}: FormProps<ObjFormSigo>) {
  const [sigo, setSigo] = useState("");
  const [prisaoDomiciliar, setPrisaoDomiciliar] = useState("");
  const [vistoriaEmCela, setVistoriaEmCela] = useState("");
  const [comunicados, setComunicados] = useState("");

  useEffect(() => {
    if (generateData) {
      onSave({
        id: 0,
        sigo: sigo.trim() || null,
        prisao_domiciliar: prisaoDomiciliar.trim() || null,
        vistoria_cela: vistoriaEmCela.trim() || null,
        comunicados: comunicados.trim() || null,
        relatorioId: "",
      });
      readyData && readyData(true);
    }
  }, [generateData]);
  useEffect(() => {
    if (cacheData && cacheData.payload) {
      const { sigo, vistoria_cela, comunicados, prisao_domiciliar } =
        cacheData.payload;
      setSigo(sigo || "");
      setPrisaoDomiciliar(prisao_domiciliar || "");
      setVistoriaEmCela(vistoria_cela || "");
      setComunicados(comunicados || "");
    } else {
      console.log('teste')
      setSigo("");
      setPrisaoDomiciliar("");
      setVistoriaEmCela("");
      setComunicados("");
    }
  }, [cacheData]);

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Dados adicionais do SIGO:
      </h2>
      <section className={`${styles["style-div"]} `}>
        <div>
          <p className="text-amarelo-claro">SIGO:</p>
          <div className="flex items-center  gap-2">
            <TextAreaComponent
              width="w-full"
              height="h-15"
              value={sigo}
              setTextArea={(e) => {
                setSigo(e);
              }}
            />
          </div>
        </div>
        <div>
          <p className="text-amarelo-claro">Prisão Domiciliar:</p>
          <div className="flex items-center  gap-2">
            <TextAreaComponent
              width="w-full"
              height="h-15"
              value={prisaoDomiciliar}
              setTextArea={(e) => {
                setPrisaoDomiciliar(e);
              }}
            />
          </div>
        </div>
        <div>
          <p className="text-amarelo-claro">Vistoria em cela:</p>
          <div className="flex items-center  gap-2">
            <TextAreaComponent
              width="w-full"
              height="h-15"
              value={vistoriaEmCela}
              setTextArea={(e) => {
                setVistoriaEmCela(e);
              }}
            />
          </div>
        </div>
        <div>
          <p className="text-amarelo-claro">Comunicados:</p>
          <div className="flex items-center  gap-2">
            <TextAreaComponent
              width="w-full"
              height="h-15"
              value={comunicados}
              setTextArea={(e) => {
                setComunicados(e);
              }}
            />
          </div>
        </div>
      </section>
    </FormDefault>
  );
}
