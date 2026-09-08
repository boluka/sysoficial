"use client";

import { useEffect, useRef, useState } from "react";
import DateComponent from "../date/date";
import styles from "./styles-forms.module.css";
import SelectComponent from "../select/Select";
import InputComponentForm from "../input/InputComponentForm";
import TextAreaComponent from "../textarea/TextAreaComponent";
import { SavePlus } from "lucide-react";

export default function Forms({ children }: { children?: string }) {
  const [date, setDate] = useState("");
  const optionsSituation = ["Completo e sem alterações", "Incompleto"];
  const [situation, setSituation] = useState("Completo e sem alterações");
  const [situationTwo, setSituationTwo] = useState("Completo e sem alterações");
  const textArea = useRef<HTMLTextAreaElement>(null);
  const textAreaTwo = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textArea.current) {
      if (textArea.current.value != "Completo e sem alterações") {
        textArea.current.value = "";
      }
    }
  }, [situation]);
  useEffect(() => {
    if (textAreaTwo.current) {
      if (textAreaTwo.current.value != "Completo e sem alterações") {
        textAreaTwo.current.value = "";
      }
    }
  }, [situationTwo]);
  return (
    <form
      action=""
      className="flex flex-col gap-3 text-white bg-[#b9b9b9] min-w-120 w-1/2 max-w-160 mb-10 rounded-2xl self-center shadow-[0_0_40px_#00000081] p-5"
    >
      <h1 className="text-center bg-cinza-escuro text-amarelo-claro text-lg font-bold rounded-[5px]">
        Recebimento
      </h1>
      <div
        className={`${styles["style-div"]} flex justify-center items-center`}
      >
        <p className="text-sm">Relatório das ocorrências no dia: </p>
        <SelectComponent width="w-30">
          {["Plantão A", "Plantão B", "Plantão C", "Plantão D"].map(((e) => {
            return <option key={e} value={e} className={styles['style-opt']}>{e}</option>
          }))}
        </SelectComponent>
      </div>
      <div className="flex justify-around gap-2 bg-cinza-escuro p-2 rounded-[5px]">
        <div className="flex gap-2 items-center">
          <p className="text-sm">Do dia:</p>
          <DateComponent setDate={setDate} />
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm">Para o dia:</p>
          <DateComponent setDate={setDate} />
        </div>
      </div>
      <div className={`${styles["style-div"]} p-4! leading-7 text-sm `}>
        Eu,
        <SelectComponent width="w-30" />
        recebi os serviços do plantão do Instituto Penal de Campo Grande/MS, do
        chefe de equipe
        <SelectComponent width="w-30" />
        ,
        <SelectComponent width="w-30" />
        com o efetivo carcerário de
        <InputComponentForm type="number" width="w-30" height="h-5"/>
        e em trânsito de
        <InputComponentForm type="number" width="w-30" height="h-5" />
      </div>
      <div className={`${styles["style-div"]} text-sm`}>
        <div className="flex items-center justify-center gap-3">
          <p className="w-1/2">Com o Material Carga:</p>
          <SelectComponent width="w-full" situation={setSituation}>
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
            value={situation}
            setSituacao={setSituation}
            ref={textArea}
          />
        </div>
      </div>
      <div className={`${styles["style-div"]} text-sm`}>
        <div className="flex items-center justify-center gap-3">
          <p className="w-1/2">Com o Material Bélico:</p>
          <SelectComponent width="w-full" situation={setSituationTwo}>
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
            value={situationTwo}
            setSituacao={setSituationTwo}
            ref={textAreaTwo}
          />
        </div>
      </div>
     <button>
       <SavePlus className="p-2 w-13 h-13 fixed right-5 bottom-5 rounded-lg text-cinza-escuro bg-amarelo-claro cursor-pointer hover:w-14 hover:h-14 transition-all"/>
     </button>
    </form>
  );
}
