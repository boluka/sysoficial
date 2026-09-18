import { useEffect, useRef, useState } from "react";
import InputComponentForm from "../input/InputComponentForm";
import SelectComponent from "../select/Select";
import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";

export default function FormEncerramento() {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const optionsSituation = ["Completo e sem alterações", "Incompleto"];
  const [situation, setSituation] = useState("Completo e sem alterações");

  const handler = (e: any) => {
    console.log("testeDeAlgo");
    setSituation(e.target.value);
  };

  useEffect(() => {
    if (textArea.current) {
      if (textArea.current.value != "Completo e sem alterações") {
        textArea.current.value = "";
      }
    }
  }, [situation]);

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Encerramento:
      </h2>

        <div className={`${styles["style-div"]} text-justify p-3! leading-7  `}>
          Eu,
          <SelectComponent width="w-[30%]" styles="mx-2" />
          recebi os serviços do plantão do Instituto Penal de Campo Grande/MS,
          do chefe de equipe
          <SelectComponent width="w-[30%]" styles="mx-2" />
          ,
          <SelectComponent width="w-[30%]" styles="mr-2" />
          com o efetivo carcerário de
          <InputComponentForm
            type="number"
            width="w-[15%]"
            height="h-5"
            styles="mx-2"
          />
          e em trânsito de
          <InputComponentForm
            type="number"
            width="w-[15%]"
            height="h-5"
            styles="ml-2 mr-1"
          />
          .
        </div>

        <div className={`${styles["style-div"]} text-justify leading-7  `}>
          
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
              value={situation}
              setSituacao={setSituation}
              ref={textArea}
            />
          </div>
        </div>
    </FormDefault>
  );
}
