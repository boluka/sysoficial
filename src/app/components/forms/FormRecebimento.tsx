"use client";

import { useEffect, useRef, useState } from "react";
import DateComponent from "../date/date";
import styles from "./styles-forms.module.css";
import SelectComponent from "../select/Select";
import InputComponentForm from "../input/InputComponentForm";
import TextAreaComponent from "../textarea/TextAreaComponent";

export default function Forms({ children }: { children: string }) {
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
      className="flex flex-col gap-3 text-white bg-[#b9b9b9] min-w-120 w-1/2 max-w-180 mb-10 rounded-2xl self-center shadow-[0_0_40px_#00000081] p-5"
    >
      <h2 className="text-center text-black font-bold mb-2">{children}</h2>
      <div className={`${styles["style-div"]} flex justify-center`}>
        <p>Relatório das ocorrências no dia: </p>
        <DateComponent setDate={setDate} />
      </div>
      <div className="flex justify-around gap-2 bg-cinza-escuro p-2 rounded-[5px]">
        <div className="flex gap-2">
          <p>Do dia:</p>
          <DateComponent setDate={setDate} />
        </div>
        <div className="flex gap-2">
          <p>Para o dia:</p>
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
        com o efetivo carcerário de:
      </div>
      <div
        className={`${styles["style-div"]} flex justify-center  items-center text-sm   gap-3! `}
      >
        <p>Efetivo carcerário: </p>
        <InputComponentForm type="number" width="auto" />

        <p>Trânsito: </p>
        <InputComponentForm type="number" width="autendo" />
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
            width="full"
            height="15"
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
            width="full"
            height="15"
            value={situationTwo}
            setSituacao={setSituationTwo}
            ref={textAreaTwo}
          />
        </div>
      </div>
      <div className={`${styles["style-div"]} flex flex-col items-end text-sm`}>
        <div>
          <p className="text-amarelo-claro text-base">Munição: </p>
          <InputComponentForm width="w-30" type="number" />
          <p className="text-amarelo-claro text-base mt-2">Carregadores: </p>
          <div className="text-[13px] flex flex-col gap-1">
            <p>De 15 para Pistola: </p>
            <InputComponentForm width="w-30" type="number" />
            <p>De 15 para Carabina: </p>
            <InputComponentForm width="w-30" type="number" />
            <p>De 30 para Carabina: </p>
            <InputComponentForm width="w-30" type="number" />
        </div>
        </div>
      </div>
    </form>
  );
}
