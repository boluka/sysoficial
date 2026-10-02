"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import DateComponent from "../date/date";
import styles from "./styles-forms.module.css";
import SelectComponent from "../select/Select";
import InputComponentForm from "../input/InputComponentForm";
import TextAreaComponent, { situation } from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import { ObjFormRecebimento } from "@/app/types/form";
import { SucessAuth } from "@/app/types/auth";

export default function Forms({
  children,
  onSave,
  cacheData
}: {
  children?: ReactNode;
  onSave: (obj: ObjFormRecebimento) => void;
  cacheData: SucessAuth | null;

}) {
  const [date, setDate] = useState("");
  const optionsSituation = ["Completo e sem alterações", "Incompleto"];
  const textArea = useRef<HTMLTextAreaElement>(null);
  const textAreaTwo = useRef<HTMLTextAreaElement>(null);

  const [plantao, setPlantao] = useState("");
  const [chefeReceb, setChefeReceb] = useState("");
  const [chefeEntrega, setChefeEntrega] = useState("");
  const [chefeAuxiliar, setChefeAuxiliar] = useState("");
  const [efetivoCarc, setEfetivoCarc] = useState(0);
  const [transitoCarc, setTransitoCarc] = useState(0);
  const [mat_carga, setMat_carga] = useState<situation>("Completo e sem alterações");
  const [mat_belico, setMat_belico] = useState<situation>("Completo e sem alterações");

  const el = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if(cacheData){
      if(cacheData.sucess){
          const {plantao} = cacheData.payload?.formRecebimento
          
          setPlantao(plantao)
      }
    }
  }, [cacheData])

  onSave({
    plantao: plantao,
    chefeReceb: chefeReceb,
    chefeEntrega: chefeEntrega,
    chefeAuxiliar: chefeAuxiliar,
    efetivoCarc: efetivoCarc,
    transitoCarc: transitoCarc,
    mat_carga: mat_carga != 'Completo e sem alterações' ? `Incompleto: ${mat_carga}`: mat_carga ,
    mat_belico: mat_belico != 'Completo e sem alterações' ? `Incompleto: ${mat_belico}`: mat_belico
  });

  const handler = (e: any) => {
    
    setMat_carga(e.target.value);
  };
  const handlerTwo = (e: any) => {
    setMat_belico(e.target.value);
  };

  useEffect(() => {
    if (textArea.current) {
      if (textArea.current.value != "Completo e sem alterações") {
        textArea.current.value = "";
      }
    }
  }, [mat_carga]);
  useEffect(() => {
    if (textAreaTwo.current) {
      if (textAreaTwo.current.value != "Completo e sem alterações") {
        textAreaTwo.current.value = "";
      }
    }
  }, [mat_belico]);

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
      {/* <div className="flex justify-around gap-2 bg-cinza-escuro p-2 rounded-[5px]">
        <div className="flex gap-2 items-center">
          <p className="">Do dia:</p>
          <DateComponent setDate={setDate} />
        </div>
        <div className="flex gap-2 items-center">
          <p className="">Para o dia:</p>
          <DateComponent setDate={setDate} />
        </div>
      </div> */}
      <div className={`${styles["style-div"]} text-justify p-3! leading-7  `}>
        Eu,
        <SelectComponent width="w-[30%]" onChange={(e:any) => {setChefeReceb(e.target.value)}} styles="mx-1">
          {["", "Ana", "Hugo", "Sarate", "Saulo"].map((e) => {
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
        recebi os serviços do plantão do Instituto Penal de Campo Grande/MS, do
        chefe de equipe
        <SelectComponent width="w-[30%]" onChange={(e:any) => {setChefeEntrega(e.target.value)}} styles="mx-1">
          {["", "Ana", "Hugo", "Sarate", "Saulo"].map((e) => {
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
        ,
        <SelectComponent width="w-[30%]" onChange={(e:any) => {setChefeAuxiliar(e.target.value)}} styles="mx-1">
          {["", "Ana", "Hugo", "Sarate", "Saulo"].map((e) => {
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
        com o efetivo carcerário de
        <InputComponentForm
          type="number"
          width="w-[15%]"
          height="h-5"
          styles="mx-1"
          onChange={(e:any) => setEfetivoCarc(parseInt(e.target.value))}
        />
        e em trânsito de
        <InputComponentForm
          type="number"
          width="w-[15%]"
          height="h-5"
          styles="mx-1"
          onChange={(e:any) => setTransitoCarc(parseInt(e.target.value))}
        />
        .
      </div>
      <div className={`${styles["style-div"]} `}>
        <div className="flex items-center justify-center gap-3">
          <p className="w-1/2">Com o Material Carga:</p>
          <SelectComponent width="w-full" onChange={handler}>
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
            value={mat_carga}
            setSituacao={setMat_carga}
            ref={textArea}
          />
        </div>
      </div>
      <div className={`${styles["style-div"]}`}>
        <div className="flex items-center justify-center gap-3">
          <p className="w-1/2 text-base">Com o Material Bélico:</p>
          <SelectComponent width="w-full" onChange={handlerTwo}>
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
            value={mat_belico}
            setSituacao={setMat_belico}
            ref={textAreaTwo}
          />
        </div>
      </div>
      {children}
    </FormDefault>
  );
}
