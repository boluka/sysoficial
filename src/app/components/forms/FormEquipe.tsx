"use client";
import { useEffect, useState } from "react";
import SelectComponent from "../select/Select";
import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import { Person } from "@/generated/prisma";
import { ObjFormEquipe } from "@/app/types/form";
import { SucessAuth } from "@/app/types/auth";
import { ComboboxBasic } from "../shadcn/combobox/ComboboxBasic";

export default function FormEquipe({
  person,
  onSave,
  cacheData,
}: {
  person: Person[] | undefined;
  onSave: (data: ObjFormEquipe) => void;
  cacheData: SucessAuth<ObjFormEquipe> | null;
}) {
  const [textArea, setTextArea] = useState("");
  const [chefeEquipe, setChefeEquipe] = useState("");
  const [auxEquipe, setAuxEquipe] = useState("");
  const [portPrincipal, setPortPrincipal] = useState("");
  const [auxPort1, setAuxPort1] = useState("");
  const [auxPort2, setAuxPort2] = useState("");
  const [passPrincipal, setPassPrincipal] = useState("");
  const [escolaPadaria, setEscolaPadaria] = useState("");
  const [crina, setCrina] = useState("");
  const [resposPv1, setResposPv1] = useState("");
  const [corredorPv1, setCorredorPv1] = useState({
    person1: "",
    person2: "",
    person3: "",
    person4: "",
  });
  const [resposPv2, setResposPv2] = useState("");
  const [corredorPv2, setCorredorPv2] = useState({
    person1: "",
    person2: "",
    person3: "",
  });

  useEffect(() => {
    if (cacheData?.sucess) {
      if (cacheData.payload) {
        const {
          chefeEquipe,
          auxChefe,
          portariaPrinc,
          auxPort1,
          auxPort2,
          passarelaPrinc,
          escolaPadaria,
          trabalhoCrina,
          responsavelPv1,
          corredorPv1,
          responsavelPv2,
          corredorPv2,
          demaisAux,
        } = cacheData.payload;
        setChefeEquipe(chefeEquipe);
        setAuxEquipe(auxChefe);
        setPortPrincipal(portariaPrinc);
        setAuxPort1(auxPort1 ? auxPort1 : "");
        setAuxPort2(auxPort2 ? auxPort2 : "");
        setPassPrincipal(passarelaPrinc ? passarelaPrinc : "");
        setEscolaPadaria(escolaPadaria ? escolaPadaria : "");
        setCrina(trabalhoCrina ? trabalhoCrina : "");
        if (corredorPv1) {
          setCorredorPv1(JSON.parse(corredorPv1.toString()));
        }
        if (corredorPv2) {
          setCorredorPv2(JSON.parse(corredorPv2.toString()));
        }
        setResposPv1(responsavelPv1);
        setResposPv2(responsavelPv2);
        setTextArea(demaisAux ? demaisAux : "");
      }
    } else {
      setChefeEquipe("");
      setAuxEquipe("");
      setPortPrincipal("");
      setAuxPort1("");
      setAuxPort2("");
      setPassPrincipal("");
      setEscolaPadaria("");
      setCrina("");
      setResposPv1("");
      setCorredorPv1({ person1: "", person2: "", person3: "", person4: "" });
      setCorredorPv2({ person1: "", person2: "", person3: "" });
      setResposPv2("");
      setTextArea("");
    }
  }, [cacheData]);

  onSave({
    chefeEquipe: chefeEquipe,
    auxChefe: auxEquipe,
    portariaPrinc: portPrincipal,
    auxPort1: auxPort1,
    auxPort2: auxPort2,
    passarelaPrinc: passPrincipal,
    escolaPadaria: escolaPadaria,
    trabalhoCrina: crina,
    responsavelPv1: resposPv1,
    corredorPv1: JSON.stringify(corredorPv1),
    responsavelPv2: resposPv2,
    corredorPv2: JSON.stringify(corredorPv2),
    demaisAux: textArea,
  });

  return (
    <FormDefault>
      <h1 className="text-center bg-cinza-escuro rounded-[5px] text-[1.3em] font-bold text-amarelo-claro">
        Equipe Plantonista
      </h1>
      <div className="flex gap-2">
        <section
          className={`${styles["style-div"]} flex flex-col gap-4! w-full`}
        >
          <fieldset className="flex flex-col gap-2 border border-amarelo-claro rounded-[5px] p-2">
            <legend className="text-amarelo-claro text-center">
              Oficial do Dia:
            </legend>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Chefe de Equipe: </p>
              <ComboboxBasic
                items={person ?? []}
                value={chefeEquipe}
                onChange={(e) => {
                  setChefeEquipe(e ?? "");
                }}
                styles="w-40"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-[0.8em]">Aux. Chefe-Equipe: </p>
              <ComboboxBasic
                items={person ?? []}
                value={auxEquipe}
                onChange={(e) => {
                  setAuxEquipe(e ?? "");
                }}
                styles="w-40"
              />
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-2 border border-amarelo-claro rounded-[5px] p-2">
            <legend className="text-amarelo-claro text-center">
              Portaria:{" "}
            </legend>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Portaria Principal: </p>
              <ComboboxBasic
                items={person ?? []}
                value={portPrincipal}
                onChange={(e) => {
                  setPortPrincipal(e ?? "");
                }}
                styles="w-40"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Auxiliar Portaria 1:</p>
              <ComboboxBasic
                items={person ?? []}
                value={auxPort1}
                onChange={(e) => {
                  setAuxPort1(e ?? "");
                }}
                styles="w-40"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Auxiliar Portaria 2:</p>
              <ComboboxBasic
                items={person ?? []}
                value={auxPort2}
                onChange={(e) => {
                  setAuxPort2(e ?? "");
                }}
                styles="w-40"
              />
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-2 border border-amarelo-claro rounded-[5px] p-2">
            <legend className="text-amarelo-claro text-center">
              Trabalhos:
            </legend>
            <div className="flex items-center justify-end gap-2">
              <p className="text-[0.8em]">Passarela Principal:</p>
              <ComboboxBasic
                items={person ?? []}
                value={passPrincipal}
                onChange={(e) => {
                  setPassPrincipal(e ?? "");
                }}
                styles="w-40"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Escola Padaria:</p>
              <ComboboxBasic
                items={person ?? []}
                value={escolaPadaria}
                onChange={(e) => {
                  setEscolaPadaria(e ?? "");
                }}
                styles="w-40"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Trabalho/Crina:</p>
              <ComboboxBasic
                items={person ?? []}
                value={crina}
                onChange={(e) => {
                  setCrina(e ?? "");
                }}
                styles="w-40"
              />
            </div>
          </fieldset>
        </section>
        <section className={`${styles["style-div"]} flex flex-col w-full`}>
          <fieldset className="flex flex-col gap-3 border border-amarelo-claro rounded-[5px] p-2">
            <legend className="text-amarelo-claro text-center">
              Pavilhão 1:
            </legend>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Responsável PV1:</p>
              <ComboboxBasic
                items={person ?? []}
                value={resposPv1}
                onChange={(e) => {
                  setResposPv1(e ?? "");
                }}
                styles="w-40"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV1:</p>
              <ComboboxBasic
                items={person ?? []}
                value={corredorPv1.person1}
                onChange={(e) => {
                  setCorredorPv1((prev) => ({
                    ...prev,
                    person1: e ?? "",
                  }));
                }}
                styles="w-40"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV1:</p>
              <ComboboxBasic
                items={person ?? []}
                value={corredorPv1.person2}
                onChange={(e) => {
                  setCorredorPv1((prev) => ({
                    ...prev,
                    person2: e ?? "",
                  }));
                }}
                styles="w-40"
              />
              
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV1:</p>
              <ComboboxBasic
                items={person ?? []}
                value={corredorPv1.person3}
                onChange={(e) => {
                  setCorredorPv1((prev) => ({
                    ...prev,
                    person3: e ?? "",
                  }));
                }}
                styles="w-40"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV1:</p>
              <ComboboxBasic
                items={person ?? []}
                value={corredorPv1.person4}
                onChange={(e) => {
                  setCorredorPv1((prev) => ({
                    ...prev,
                    person4: e ?? "",
                  }));
                }}
                styles="w-40"
              />
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-3 border border-amarelo-claro rounded-[5px] p-2">
            <legend className="text-amarelo-claro text-center">
              Pavilhão 2:
            </legend>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Responsável PV2:</p>
              <ComboboxBasic
                items={person ?? []}
                value={resposPv2}
                onChange={(e) => {
                  setResposPv2(e ?? "");
                }}
                styles="w-40"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV2:</p>
              <ComboboxBasic
                items={person ?? []}
                value={corredorPv2.person1}
                onChange={(e) => {
                  setCorredorPv2((prev) => ({
                    ...prev,
                    person1: e ?? "",
                  }));
                }}
                styles="w-40"
              />
              </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV2:</p>
              <ComboboxBasic
                items={person ?? []}
                value={corredorPv2.person2}
                onChange={(e) => {
                  setCorredorPv2((prev) => ({
                    ...prev,
                    person2: e ?? "",
                  }));
                }}
                styles="w-40"
              />
              
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV2:</p>
              <ComboboxBasic
                items={person ?? []}
                value={corredorPv2.person3}
                onChange={(e) => {
                  setCorredorPv2((prev) => ({
                    ...prev,
                    person3: e ?? "",
                  }));
                }}
                styles="w-40"
              />
            </div>
          </fieldset>
        </section>
      </div>
      <div className={`${styles["style-div"]}`}>
        <p className="text-amarelo-claro mb-1">Demais auxiliares:</p>
        <TextAreaComponent
          width="w-full"
          height="h-10"
          setTextArea={setTextArea}
          value={textArea}
        />
      </div>
    </FormDefault>
  );
}
