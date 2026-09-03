"use client";

import { useEffect, useRef, useState } from "react";
import DateComponent from "../date/date";
import styles from "./styles-forms.module.css";
import SelectComponent from "../select/Select";
import InputComponentForm from "../input/InputComponentForm";
import TextAreaComponent from "../textarea/TextAreaComponent";

export default function Forms({ children }: { children: string }) {
  const [date, setDate] = useState("00-00-0000");
  const [situation, setSituation] = useState('Completo e sem alterações');
  const textArea = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if(textArea.current){
      if(situation != "Completo e sem alterações")
        textArea.current.value = "";
    }
  }, [situation])
  return (
    <form
      action=""
      className="flex flex-col gap-3 text-white bg-[#b9b9b9] min-w-120 w-1/2 max-w-180 mb-10 h-180 rounded-2xl self-center p-5"
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
        <SelectComponent width='30'/>
        recebi os serviços do plantão do Instituto Penal de Campo Grande/MS, do
        chefe de equipe
        <SelectComponent width='30'/>
        ,
        <SelectComponent width='30'/>
        com o efetivo carcerário de:
      </div>
      <div className={`${styles["style-div"]} flex justify-center  items-center text-sm   gap-3! `}>
        
            <p>Efetivo carcerário: </p>
            <InputComponentForm type="number" width='auto'/>
        
        
            <p>Trânsito: </p>
            <InputComponentForm type="number" width='auto'/>
       
      </div>
      <div className={`${styles['style-div']} text-sm`}>
            <div className="flex items-center justify-center gap-3">
              <p className="w-1/2">Com o Material Carga:</p>
              <SelectComponent width="full" situation={setSituation}>
                  <option value="Completo e sem alterações">Completo e sem alterações</option>
                  <option value="Incompleto">Incompleto</option>
              </SelectComponent>
            </div>
            <div className="flex flex-col justify-left items-left gap-1">
              <p className="text-[13px] text-cinza-maisclaro">Incompleto ou com alterações: </p>
              <TextAreaComponent width="full" height="15" value={situation} setSituacao={setSituation} ref={textArea}/>
            </div>
      </div>
    </form>
  );
}
