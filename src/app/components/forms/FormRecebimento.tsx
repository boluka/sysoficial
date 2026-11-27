"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./styles-forms.module.css";
import SelectComponent from "../select/Select";
import InputComponentForm from "../input/InputComponentForm";
import TextAreaComponent, { situation } from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import { SucessAuth } from "@/app/types/auth";
import { ComboboxBasic } from "../shadcn/combobox/ComboboxBasic";
import {
  FormRecebimento as ObjFormRecebimento,
  Person,
} from "@/generated/prisma";
import { FormProps } from "@/app/interfaces/FormProps";

export default function FormRecebimento({
  onSave,
  cacheData,
  readyData,
  generateData,
  person,
}: FormProps<ObjFormRecebimento>) {
  const [date, setDate] = useState("");
  const optionsSituation = ["Completo e sem alterações", "Incompleto"];
  const [textArea, setTextArea] = useState("");
  const [textAreaTwo, setTextAreaTwo] = useState("");

  const [plantao, setPlantao] = useState("");
  const [chefeReceb, setChefeReceb] = useState("");
  const [chefeEntrega, setChefeEntrega] = useState("");
  const [chefeAuxiliar, setChefeAuxiliar] = useState("");
  const [efetivoCarc, setEfetivoCarc] = useState("");
  const [transitoCarc, setTransitoCarc] = useState("");
  const [mat_carga, setMat_carga] = useState<situation>(
    "Completo e sem alterações",
  );
  const [mat_belico, setMat_belico] = useState<situation>(
    "Completo e sem alterações",
  );

  useEffect(() => {
    if (generateData) {
      onSave({
        id: "",
        relatorioId: "",
        plantao: plantao,
        chefeReceb: chefeReceb,
        chefeEntrega: chefeEntrega,
        chefeAuxiliar: chefeAuxiliar,
        efetivoCarc: parseInt(efetivoCarc),
        transitoCarc: parseInt(transitoCarc),
        mat_carga:
          mat_carga != "Completo e sem alterações"
            ? `Incompleto: ${textArea}`
            : mat_carga,
        mat_belico:
          mat_belico != "Completo e sem alterações"
            ? `Incompleto: ${textAreaTwo}`
            : mat_belico,
      });
      readyData && readyData(true);
    }
  }, [generateData]);

  useEffect(() => {
    if (cacheData && cacheData.payload) {
      const {
        plantao,
        chefeReceb,
        chefeEntrega,
        chefeAuxiliar,
        efetivoCarc,
        transitoCarc,
        mat_carga,
        mat_belico,
      } = cacheData.payload;
      setPlantao(plantao);
      setChefeReceb(chefeReceb);
      setChefeEntrega(chefeEntrega);
      setChefeAuxiliar(chefeAuxiliar);
      setEfetivoCarc(efetivoCarc.toString());
      setTransitoCarc(transitoCarc.toString());
      if (mat_carga != "Completo e sem alterações") {
        const valorSeparate = (mat_carga as string).split(":");
        setMat_carga(valorSeparate[0].trim() as situation);
        setTextArea(valorSeparate[1].trim());
      } else {
        setMat_carga(mat_carga);
        setTextArea("");
      }
      if (mat_belico != "Completo e sem alterações") {
        const valorSeparate = (mat_belico as string).split(":");
        setMat_belico(valorSeparate[0].trim() as situation);
        setTextAreaTwo(valorSeparate[1].trim());
      } else {
        setMat_belico(mat_belico);
        setTextAreaTwo("");
      }
    } else {
      setPlantao("");
      setChefeReceb("");
      setChefeEntrega("");
      setChefeAuxiliar("");
      setEfetivoCarc("0");
      setTransitoCarc("0");
      setMat_carga("Completo e sem alterações");
      setMat_belico("Completo e sem alterações");
      setTextArea("");
      setTextAreaTwo("");
    }
  }, [cacheData]);

  const handler = (e: any) => {
    setMat_carga(e.target.value);
  };
  const handlerTwo = (e: any) => {
    setMat_belico(e.target.value);
  };
  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro text-amarelo-claro text-[1.3em] font-bold rounded-[5px]">
        Recebimento
      </h2>
      <div
        className={`${styles["style-div"]} flex justify-center items-center`}
      >
        <p className="">Relatório das ocorrências no: </p>
        <SelectComponent
          value={plantao}
          width="w-30"
          onChange={(e: any) => setPlantao(e.target.value)}
        >
          {["", "Plantão A", "Plantão B", "Plantão C", "Plantão D"].map((e) => {
            return (
              <option
                key={e}
                value={e}
                className={`${styles["style-opt"]} ${e === "" && "disabled hidden"}`}
              >
                {e}
              </option>
            );
          })}
        </SelectComponent>
      </div>
      <div className={`${styles["style-div"]} text-justify p-3! leading-7 `}>
        Eu,
        <div className="inline-block mx-1">
          <ComboboxBasic
            items={person ?? []}
            value={chefeReceb}
            onChange={(e) => {
              setChefeReceb(e ?? "");
            }}
            styles="w-50"
          />
        </div>
        recebi os serviços do plantão do Instituto Penal de Campo Grande/MS, do
        chefe de equipe
        <div className="inline-block mx-1">
          <ComboboxBasic
            items={person ?? []}
            value={chefeEntrega}
            onChange={(e) => {
              setChefeEntrega(e ?? "");
            }}
            styles="w-40"
          />
        </div>
        ,
        <div className="inline-block mx-1">
          <ComboboxBasic
            items={person ?? []}
            value={chefeAuxiliar}
            onChange={(e) => {
              setChefeAuxiliar(e ?? "");
            }}
            styles="w-40"
          />
        </div>
        com o efetivo carcerário de
        <InputComponentForm
          value={efetivoCarc}
          type="number"
          width="w-[15%]"
          height="h-5"
          styles="mx-2"
          onChange={(e: any) => setEfetivoCarc(e.target.value)}
        />
        e em trânsito de
        <InputComponentForm
          value={transitoCarc}
          type="number"
          width="w-[15%]"
          height="h-5"
          styles="mx-2"
          onChange={(e: any) => setTransitoCarc(e.target.value)}
        />
        .
      </div>
      <div className={`${styles["style-div"]} `}>
        <div className="flex items-center justify-center gap-3">
          <p className="w-1/2">Com o Material Carga:</p>
          <SelectComponent value={mat_carga} width="w-full" onChange={handler}>
            {optionsSituation.map((e, index) => {
              return (
                <option key={index} value={e} className="bg-cinza-escuro">
                  {e}
                </option>
              );
            })}
          </SelectComponent>
        </div>
        <div className="flex flex-col justify-left items-left gap-1">
          <p className="text-[13px] text-cinza-maisclaro">
            Incompleto ou com alterações:{" "}
          </p>
          <TextAreaComponent
            width="w-full"
            height="h-25"
            value={textArea}
            readOnly={mat_carga}
            setTextArea={setTextArea}
          />
        </div>
      </div>
      <div className={`${styles["style-div"]}`}>
        <div className="flex items-center justify-center gap-3">
          <p className="w-1/2 text-base">Com o Material Bélico:</p>
          <SelectComponent
            value={mat_belico}
            width="w-full"
            onChange={handlerTwo}
          >
            {optionsSituation.map((e, index) => {
              return (
                <option key={index} value={e} className="bg-cinza-escuro">
                  {e}
                </option>
              );
            })}
          </SelectComponent>
        </div>
        <div className="flex flex-col justify-left items-left gap-1">
          <p className="text-[13px] text-cinza-maisclaro">
            Incompleto ou com alterações:{" "}
          </p>
          <TextAreaComponent
            width="w-full"
            height="h-25"
            value={textAreaTwo}
            readOnly={mat_belico}
            setTextArea={setTextAreaTwo}
          />
        </div>
      </div>
    </FormDefault>
  );
}
