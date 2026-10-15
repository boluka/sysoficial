"use client";
import { useEffect, useState } from "react";
import SelectComponent from "../select/Select";
import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import { Person } from "@/generated/prisma";
import { ObjFormEquipe } from "@/app/types/form";

export default function FormEquipe({
  person, onSave
}: {
  person: Person[] | undefined, onSave: (data: ObjFormEquipe) => void;
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
  const [corredorPv1, setCorredorPv1] = useState({person1: "", person2: "", person3: "", person4: ""})
  const [resposPv2, setResposPv2] = useState("");
  const [corredorPv2, setCorredorPv2] = useState({person1: "", person2: "", person3: ""})

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
    demaisAux: textArea
  })

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
              Oficial do Dia:{" "}
            </legend>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Chefe de Equipe: </p>
              <SelectComponent
                width="w-[50%]"
                value={chefeEquipe}
                onChange={(e: any) => {
                  setChefeEquipe(e.target.value);
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-[0.8em]">Aux. Chefe-Equipe: </p>
              <SelectComponent
                width="w-[50%]"
                value={auxEquipe}
                onChange={(e: any) => {
                  setAuxEquipe(e.target.value);
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-2 border border-amarelo-claro rounded-[5px] py-2">
            <legend className="text-amarelo-claro text-center">
              Portaria:{" "}
            </legend>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Portaria Principal: </p>
              <SelectComponent
                width="w-[50%]"
                value={portPrincipal}
                onChange={(e: any) => {
                  setPortPrincipal(e.target.value);
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Auxiliar Portaria 1:</p>
             <SelectComponent
                width="w-[50%]"
                value={auxPort1}
                onChange={(e: any) => {
                  setAuxPort1(e.target.value);
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Auxiliar Portaria 2:</p>
              <SelectComponent
                width="w-[50%]"
                value={auxPort2}
                onChange={(e: any) => {
                  setAuxPort2(e.target.value);
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-2 border border-amarelo-claro rounded-[5px] py-2">
            <legend className="text-amarelo-claro text-center">
              Trabalhos:
            </legend>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Passarela Principal:</p>
             <SelectComponent
                width="w-[50%]"
                value={passPrincipal}
                onChange={(e: any) => {
                  setPassPrincipal(e.target.value);
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Escola Padaria:</p>
              <SelectComponent
                width="w-[50%]"
                value={escolaPadaria}
                onChange={(e: any) => {
                  setEscolaPadaria(e.target.value);
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Trabalho/Crina:</p>
             <SelectComponent
                width="w-[50%]"
                value={crina}
                onChange={(e: any) => {
                  setCrina(e.target.value);
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
          </fieldset>
        </section>
        <section className={`${styles["style-div"]} flex flex-col w-full`}>
          <fieldset className="flex flex-col gap-3 border border-amarelo-claro rounded-[5px] py-2">
            <legend className="text-amarelo-claro text-center">
              Pavilhão 1:
            </legend>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Responsável PV1:</p>
              <SelectComponent
                width="w-[50%]"
                value={resposPv1}
                onChange={(e: any) => {
                  setResposPv1(e.target.value);
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV1:</p>
              <SelectComponent
                width="w-[50%]"
                value={corredorPv1.person1}
                onChange={(e: any) => {
                  setCorredorPv1((prev) => ({...prev, person1: e.target.value }));
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV1:</p>
              <SelectComponent
                width="w-[50%]"
                value={corredorPv1.person2}
                onChange={(e: any) => {
                  setCorredorPv1((prev) => ({...prev, person2: e.target.value }));
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV1:</p>
              <SelectComponent
                width="w-[50%]"
                value={corredorPv1.person3}
                onChange={(e: any) => {
                  setCorredorPv1((prev) => ({...prev, person3: e.target.value }));
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV1:</p>
              <SelectComponent
                width="w-[50%]"
                value={corredorPv1.person4}
                onChange={(e: any) => {
                  setCorredorPv1((prev) => ({...prev, person4: e.target.value }));
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-3 border border-amarelo-claro rounded-[5px] py-2">
            <legend className="text-amarelo-claro text-center">
              Pavilhão 2:
            </legend>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Responsável PV2:</p>
              <SelectComponent
                width="w-[50%]"
                value={resposPv2}
                onChange={(e: any) => {
                  setResposPv2(e.target.value);
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV2:</p>
              <SelectComponent
                width="w-[50%]"
                value={corredorPv2.person1}
                onChange={(e: any) => {
                  setCorredorPv2((prev) => ({...prev, person1: e.target.value }));
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV2:</p>
             <SelectComponent
                width="w-[50%]"
                value={corredorPv2.person2}
                onChange={(e: any) => {
                  setCorredorPv2((prev) => ({...prev, person2: e.target.value }));
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="text-sm">Corredor PV2:</p>
             <SelectComponent
                width="w-[50%]"
                value={corredorPv2.person3}
                onChange={(e: any) => {
                  setCorredorPv2((prev) => ({...prev, person3: e.target.value }));
                }}
              >
                <option className="disabled hidden" value=""></option>
                {person &&
                  person.map((e) => {
                    return (
                      <option
                        className="bg-cinza-escuro text-amarelo-claro"
                        key={e.id}
                        value={e.name}
                      >
                        {e.name}
                      </option>
                    );
                  })}
              </SelectComponent>
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
