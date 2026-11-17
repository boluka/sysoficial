import { useEffect, useState } from "react";
import DateComponent from "../date/date";
import InputComponentForm from "../input/InputComponentForm";
import { ComboboxBasic } from "../shadcn/combobox/ComboboxBasic";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import { FormAssinatura as ObjFormAssinatura } from "@/generated/prisma";
import { FormProps } from "@/app/interfaces/FormProps";

export default function FormAssinatura({
  onSave,
  cacheData,
  readyData,
  generateData,
  person,
}: FormProps<ObjFormAssinatura>) {
  const [nomeRecebe, setNomeRecebe] = useState("");
  const [dataRecebe, setDataRecebe] = useState("");
  const [matriculaRecebe, setMatriculaRecebe] = useState("");
  const [nomeEntrega, setNomeEntrega] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [matriculaEntrega, setMatriculaEntrega] = useState("");

  useEffect(() => {
    if (generateData) {
      onSave({
        id: 0,
        entrega_nome: nomeEntrega,
        entrega_data: dataEntrega,
        entrega_matricula: matriculaEntrega,
        recebe_nome: nomeRecebe,
        recebe_data: dataRecebe,
        recebe_matricula: matriculaRecebe,
        relatorioId: "",
      });
      readyData && readyData(true);
    }
  }, [generateData]);

  useEffect(() => {
    if (cacheData && cacheData.payload) {
      const {
        entrega_nome,
        entrega_data,
        entrega_matricula,
        recebe_nome,
        recebe_data,
        recebe_matricula,
      } = cacheData.payload;
      setNomeEntrega(entrega_nome);
      setDataEntrega(entrega_data);
      setMatriculaEntrega(entrega_matricula);
      setNomeRecebe(recebe_nome);
      setDataRecebe(recebe_data);
      setMatriculaRecebe(recebe_matricula);
    } else {
      setNomeEntrega("");
      setDataEntrega("");
      setMatriculaEntrega("");
      setNomeRecebe("");
      setDataRecebe("");
      setMatriculaRecebe("");
    }
  }, [cacheData]);

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Assinatura:
      </h2>
      <section className={`${styles["style-div"]} flex flex-col gap-5! `}>
        <fieldset className="flex flex-col border gap-3 border-amarelo-claro rounded-[5px] p-2">
          <legend className="text-amarelo-claro text-center">
            Quem Entrega:
          </legend>
          <div className="flex gap-2">
            <p>Nome:</p>
            <ComboboxBasic
              styles="w-full"
              items={person ?? []}
              value={nomeEntrega}
              onChange={(e: string | null) => setNomeEntrega(e || "")}
            />
          </div>
          <div className="flex gap-2">
            <p className="whitespace-nowrap">Data:</p>
            <DateComponent
              setDate={(e: string) => setDataEntrega(e)}
              value={dataEntrega}
            />
            <p>Matrícula:</p>
            <InputComponentForm
              type="text"
              width="w-full"
              value={matriculaEntrega}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMatriculaEntrega(e.target.value)
              }
            />
          </div>
        </fieldset>
        <fieldset className="flex flex-col border gap-3 border-amarelo-claro rounded-[5px] p-2">
          <legend className="text-amarelo-claro text-center">
            Quem Recebe:
          </legend>
          <div className="flex gap-2">
            <p>Nome:</p>
            <ComboboxBasic
              styles="w-full"
              items={person ?? []}
              value={nomeRecebe}
              onChange={(e: string | null) => setNomeRecebe(e || "")}
            />
          </div>
          <div className="flex gap-2">
            <p className="whitespace-nowrap">Data:</p>
            <DateComponent
              setDate={(e: string) => setDataRecebe(e)}
              value={dataRecebe}
            />
            <p>Matrícula:</p>
            <InputComponentForm
              type="text"
              width="w-full"
              value={matriculaRecebe}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMatriculaRecebe(e.target.value)
              }
            />
          </div>
        </fieldset>
      </section>
    </FormDefault>
  );
}
