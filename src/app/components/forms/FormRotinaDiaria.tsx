"use client";
import { useEffect, useState } from "react";
import InputComponentForm from "../input/InputComponentForm";
import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import { FormProps } from "@/app/interfaces/FormProps";
import { FormRotinaDiaria as ObjFormRotinaDiaria } from "@/generated/prisma";
import CheckBox from "../shadcn/checkbox/CheckBox";

export default function FormRotinaDiaria({
  cacheData,
  onSave,
  generateData,
  readyData,
}: FormProps<ObjFormRotinaDiaria>) {
  const [rotina, setRotina] = useState("");
  const [pavilhaoUm, setPavilhaUm] = useState("");
  const [pavilhaoDois, setPavilhaoDois] = useState("");
  const [alimentacao, setAlimentacao] = useState("");
  const [alimentacaoIsNull, setAlimentacaoIsNull] = useState(false);

  useEffect(() => {
    if (generateData) {
      onSave({
        id: 0,
        rotina: rotina.trim().length > 0 ? rotina : null,
        pavilhao_um: pavilhaoUm.trim().length > 0 ? pavilhaoUm : null,
        pavilhao_dois: pavilhaoDois.trim().length > 0 ? pavilhaoDois : null,
        alimentacao: !alimentacaoIsNull ? alimentacao : null,
        relatorioId: "",
      });
      if (readyData) {
        readyData(true);
      }
    }
  }, [generateData]);

  useEffect(() => {
    const c = cacheData?.payload;
    if (c) {
      const { rotina, pavilhao_um, pavilhao_dois, alimentacao } = c;
      setRotina(rotina ?? "");
      setPavilhaUm(pavilhao_um ?? "");
      setPavilhaoDois(pavilhao_dois ?? "");
      setAlimentacao(alimentacao ?? "");
      if (!alimentacao) {
        setAlimentacaoIsNull(true);
        return;
      }
      setAlimentacaoIsNull(false);
    } else {
      setRotina("");
      setPavilhaUm("");
      setPavilhaoDois("");
      setAlimentacao("");
      setAlimentacaoIsNull(false);
    }
  }, [cacheData]);

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Rotina Diária e Alimentação
      </h2>
      <section className={`${styles["style-div"]}`}>
        <div>
          <p className="text-amarelo-claro">Rotina: </p>
          <TextAreaComponent
            width="w-full"
            height="h-15"
            value={rotina}
            setTextArea={setRotina}
          />
        </div>
        <div>
          <p className="text-amarelo-claro">Pavilhão I: </p>
          <TextAreaComponent
            width="w-full"
            height="h-20"
            value={pavilhaoUm}
            setTextArea={setPavilhaUm}
          />
        </div>
        <div>
          <p className="text-amarelo-claro">Pavilhão II: </p>
          <TextAreaComponent
            width="w-full"
            height="h-20"
            value={pavilhaoDois}
            setTextArea={setPavilhaoDois}
          />
        </div>
        <div>
          <p className="text-amarelo-claro">Alimentação: </p>
          <TextAreaComponent
            width="w-full"
            height="h-10"
            value={alimentacao}
            setTextArea={setAlimentacao}
          />
        </div>
        <div className="flex gap-1">
          <CheckBox value={alimentacaoIsNull} onChange={setAlimentacaoIsNull} />
          <p className="text-sm">Sem alteração no campo alimentação</p>
        </div>
      </section>
    </FormDefault>
  );
}
