"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
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
  cacheData,
}: {
  children?: ReactNode;
  onSave: (obj: ObjFormRecebimento) => void;
  cacheData: SucessAuth | null;
}) {
  const [date, setDate] = useState("");
  const optionsSituation = ["Completo e sem alterações", "Incompleto"];
  const [textArea, setTextArea] = useState("");
  const [textAreaTwo, setTextAreaTwo] = useState("");

  const [plantao, setPlantao] = useState("");
  const [chefeReceb, setChefeReceb] = useState("");
  const [chefeEntrega, setChefeEntrega] = useState("");
  const [chefeAuxiliar, setChefeAuxiliar] = useState("");
  const [efetivoCarc, setEfetivoCarc] = useState(0);
  const [transitoCarc, setTransitoCarc] = useState(0);
  const [mat_carga, setMat_carga] = useState<situation>(
    "Completo e sem alterações",
  );
  const [mat_belico, setMat_belico] = useState<situation>(
    "Completo e sem alterações",
  );

  const el = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (cacheData) {
      if (cacheData.sucess) {
        const {
          plantao,
          chefeReceb,
          chefeEntrega,
          chefeAuxiliar,
          efetivoCarc,
          transitoCarc,
          mat_carga,
          mat_belico,
        } = cacheData.payload?.formRecebimento;
        setPlantao(plantao);
        setChefeReceb(chefeReceb);
        setChefeEntrega(chefeEntrega);
        setChefeAuxiliar(chefeAuxiliar);
        setEfetivoCarc(efetivoCarc);
        setTransitoCarc(transitoCarc);
        if (mat_carga != "Completo e sem alterações") {
          const valorSeparate = (mat_carga as string).split(":");
          setMat_carga(valorSeparate[0].trim() as situation);
          setTextArea(valorSeparate[1].trim());
        } else {
          setMat_carga(mat_carga);
          setTextArea('');
        }
        if (mat_belico != "Completo e sem alterações") {
          const valorSeparate = (mat_belico as string).split(":");
          setMat_belico(valorSeparate[0].trim() as situation);
          setTextAreaTwo(valorSeparate[1].trim());
        } else {
          setMat_belico(mat_belico);
          setTextAreaTwo('');
        }
      }
    } else {
      setPlantao("");
      setChefeReceb("");
      setChefeEntrega("");
      setChefeAuxiliar("");
      setEfetivoCarc(0);
      setTransitoCarc(0);
      setMat_carga("Completo e sem alterações");
      setMat_belico("Completo e sem alterações");
      setTextArea('')
      setTextAreaTwo('')
    }
  }, [cacheData]);

  onSave({
    plantao: plantao,
    chefeReceb: chefeReceb,
    chefeEntrega: chefeEntrega,
    chefeAuxiliar: chefeAuxiliar,
    efetivoCarc: efetivoCarc,
    transitoCarc: transitoCarc,
    mat_carga:
      mat_carga != "Completo e sem alterações"
        ? `Incompleto: ${textArea}`
        : mat_carga,
    mat_belico:
      mat_belico != "Completo e sem alterações"
        ? `Incompleto: ${textAreaTwo}`
        : mat_belico,
  });

  const handler = (e: any) => {
    setMat_carga(e.target.value);
  };
  const handlerTwo = (e: any) => {
    setMat_belico(e.target.value);
  };

  // useEffect(() => {
  //   if (textArea.current) {
  //     if (textArea.current.value != "Completo e sem alterações") {
  //       textArea.current.value = "";
  //     }
  //   }
  // }, [mat_carga]);
  // useEffect(() => {
  //   if (textAreaTwo.current) {
  //     if (textAreaTwo.current.value != "Completo e sem alterações") {
  //       textAreaTwo.current.value = "";
  //     }
  //   }
  // }, [mat_belico]);

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
        <SelectComponent
          value={chefeReceb}
          width="w-[30%]"
          onChange={(e: any) => {
            setChefeReceb(e.target.value);
          }}
          styles="mx-1"
        >
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
        <SelectComponent
          value={chefeEntrega}
          width="w-[30%]"
          onChange={(e: any) => {
            setChefeEntrega(e.target.value);
          }}
          styles="mx-1"
        >
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
        <SelectComponent
          value={chefeAuxiliar}
          width="w-[30%]"
          onChange={(e: any) => {
            setChefeAuxiliar(e.target.value);
          }}
          styles="mx-1"
        >
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
          value={efetivoCarc}
          type="number"
          width="w-[15%]"
          height="h-5"
          styles="mx-1"
          onChange={(e: any) => setEfetivoCarc(parseInt(e.target.value))}
        />
        e em trânsito de
        <InputComponentForm
          value={transitoCarc}
          type="number"
          width="w-[15%]"
          height="h-5"
          styles="mx-1"
          onChange={(e: any) => setTransitoCarc(parseInt(e.target.value))}
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
      {children}
    </FormDefault>
  );
}
