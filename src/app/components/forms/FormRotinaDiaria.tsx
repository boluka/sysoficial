'use client';
import { useState } from "react";
import InputComponentForm from "../input/InputComponentForm";
import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";

export default function FormRotinaDiaria() {

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Rotina Diária e Alimentação
      </h2>
      <section className={`${styles["style-div"]}`}> 
        <div>
            <p className="text-amarelo-claro">Rotina: </p>
            <TextAreaComponent width="w-full" height="h-15" />
        </div>
        <div>
            <p className="text-amarelo-claro">Pavilhão I: </p>
            <TextAreaComponent width="w-full" height="h-20" />
        </div>
        <div>
            <p className="text-amarelo-claro">Pavilhão II: </p>
            <TextAreaComponent width="w-full" height="h-20" />
        </div>
        <div>
            <p className="text-amarelo-claro">Alimentação: </p>
            <TextAreaComponent width="w-full" height="h-10"/> 
        </div>
        <div className="flex">
            <InputComponentForm type="checkbox"/>
            <p className="text-sm">Sem alteração no campo alimentação</p>
        </div>
      </section>
    </FormDefault>
  );
}
