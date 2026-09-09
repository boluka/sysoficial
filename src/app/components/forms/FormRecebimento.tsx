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
  const dialogArmamento = useRef<HTMLDialogElement>(null);

  if(children){
      dialogArmamento.current?.showModal();
  }

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
      <dialog ref={dialogArmamento} className={`opacity-100 scale-100 duration-300 ease-out transition-[all,display] allow-discrete
                   
                   /* 2. ESTADO INICIAL (Quando nasce/Abre) */
                   starting:opacity-0 starting:scale-95
                   
                   /* 3. ESTADO DO BACKDROP (Fundo Escuro) */
                   backdrop:bg-black/50 backdrop:transition-[all,display] backdrop:duration-600 backdrop:allow-discrete
                   backdrop:opacity-100
                   
                   /* 4. ESTADO INICIAL DO BACKDROP */
                   backdrop:starting:opacity-0 outline-0 rounded-2xl bg-cinza-maisclaro fixed inset-0  m-auto shadow-xl`}>
            <div className="flex flex-col gap-3 text-white bg-[#b9b9b9] min-w-120  rounded-2xl self-center shadow-[0_0_40px_#00000081] p-5">

        <div
        className={`${styles["style-div"]} flex p-4! rounded-b-2xl!  justify-between flex-row-reverse`}
      >
        <div className="flex flex-col text-sm">
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
        <div
          className={`${styles["style-div"]} p-3! flex flex-col w-[75%] items-start border roudend-[5px] border-amarelo-escuro`}
        >
          <div className="flex w-full">
            <p>Armamento: </p>
            <SelectComponent width="min-w-40 w-1/2"></SelectComponent>
            <button
              className="bg-amarelo-claro py-1 px-3 rounded-[5px] text-sm text-black font-bold cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              Inserir
            </button>
          </div>
          <div className="flex w-full">
            <p>Numeração: </p>
            <SelectComponent width="min-w-40 w-1/2"></SelectComponent>
          </div>
          <table className={`${styles['style-table']} w-full text-center  border p-2 border-collapse border-spacing-3`}>
            <thead>
              <tr className="bg-cinza-maisescuro text-cinza-maisclaro ">
                <th className="border border-black text-amarelo-claro p-2">Arma</th>
                <th className="border border-black text-amarelo-claro p-2">Numeração</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-cinza-maisclaro border border-black text-cinza-escuro">Valor1</td>
                <td className="bg-cinza-maisclaro border border-black text-cinza-escuro">Valor2</td>
              </tr>
              <tr>
                <td className="bg-white text-black border border-black">Valor 3</td>
                <td className="bg-white text-black border border-black">Valor 4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

      </dialog>
    </form>
  );
}
