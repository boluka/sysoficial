import { useEffect, useRef, useState } from "react";
import InputComponentForm from "../input/InputComponentForm";
import SelectComponent from "../select/Select";
import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import { ComboboxBasic } from "../shadcn/combobox/ComboboxBasic";
import { FormProps } from "@/app/interfaces/FormProps";
import { FormEncerramento as ObjFormEncerramento } from "@/generated/prisma";

type Situation = "Completo e sem alterações" | "Incompleto";
const optionsSituation = ["Completo e sem alterações", "Incompleto"];

export default function FormEncerramento({
  onSave,
  cacheData,
  generateData,
  readyData,
  person,
}: FormProps<ObjFormEncerramento>) {
  useEffect(() => {
    if (generateData) {
      onSave({
        id: 0,
        chefeRecebe: chefeRecebe,
        chefeEntrega: chefeEntrega,
        efetivoCarc: parseInt(efetCarcerario),
        transitoCarc: parseInt(transito),
        mat_carga:
          matCarga !== "Completo e sem alterações"
            ? `Incompleto: ${textArea}`
            : matCarga,
        relatorioId: "",
      });
      readyData && readyData(true);
    }
  }, [generateData]);
  useEffect(() => {
    if (cacheData && cacheData.payload) {
      const {
        chefeEntrega,
        chefeRecebe,
        efetivoCarc,
        transitoCarc,
        mat_carga,
      } = cacheData.payload;
      setChefeEntrega(chefeEntrega);
      setChefeRecebe(chefeRecebe);
      setEfetCarcerario(efetivoCarc.toString());
      setTransito(transitoCarc.toString());
      const [matCargaSituation, matCargaTextArea] = mat_carga.split(':');
      setMatCarga(matCargaSituation?.trim() as Situation)
      setTextArea(matCargaTextArea?.trim());
    } else {
      setChefeEntrega("");
      setChefeRecebe("");
      setEfetCarcerario("");
      setTransito("");
      setMatCarga("Completo e sem alterações")
      setTextArea("");
    }
  }, [cacheData]);

  const [textArea, setTextArea] = useState("");
  const [chefeRecebe, setChefeRecebe] = useState("");
  const [chefeEntrega, setChefeEntrega] = useState("");
  const [efetCarcerario, setEfetCarcerario] = useState("");
  const [transito, setTransito] = useState("");
  const [matCarga, setMatCarga] = useState<Situation>(
    "Completo e sem alterações",
  );

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Encerramento:
      </h2>

      <div className={`${styles["style-div"]} text-justify p-3! leading-7  `}>
        Eu,
        <div className="inline-block mx-1">
          <ComboboxBasic
            items={person ?? []}
            value={chefeEntrega}
            onChange={(e: string | null) => setChefeEntrega(e || "")}
          />
        </div>
        encerro o presente relatório e passo os serviços de plantão do Instituto
        Penal de Campo Grande/MS - IPCG, para o
        <div className="inline-block mx-1">
          <ComboboxBasic
            items={person ?? []}
            value={chefeRecebe}
            onChange={(e: string | null) => setChefeRecebe(e || "")}
          />
        </div>
        , com o efetivo carcerário de
        <InputComponentForm
          type="number"
          width="w-[15%]"
          height="h-5"
          styles="mx-2"
          value={efetCarcerario}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEfetCarcerario(e.target.value)
          }
        />
        e em trânsito de
        <InputComponentForm
          type="number"
          width="w-[15%]"
          height="h-5"
          styles="ml-2 mr-1"
          value={transito}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTransito(e.target.value)
          }
        />
        .
      </div>

      <div className={`${styles["style-div"]} text-justify leading-7  `}>
        <div className="flex items-center justify-center gap-3">
          <p className="w-1/2">Com o Material Carga:</p>
          <SelectComponent
            width="w-full"
            value={matCarga}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setMatCarga(e.target.value as Situation)
            }
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
            value={textArea}
            readOnly={matCarga}
            setTextArea={setTextArea}
          />
        </div>
      </div>
    </FormDefault>
  );
}
