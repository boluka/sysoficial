'use client";'
import InputComponentForm from "../input/InputComponentForm";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import SelectComponentForm from "../select/Select";
import { useState } from "react";

export default function FormMudancaCela() {
    const [data, setData] = useState({
        'de': {
            'pav': '',
            'sol': '',
            'cela': '',
        },
        'para': {
            'pav': '',
            'sol': '',
            'cela': '',
        }
    });
  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Mudança de Cela Operacional:
      </h2>
      <section className={`${styles["style-div"]}`}>
        <div className="flex">
          <p>Nome: </p>
          <InputComponentForm type="text" width="w-full" />
        </div>
        <div className="flex justify-between gap-3">
          <fieldset className="flex flex-col grow gap-3 border border-amarelo-claro rounded-[5px] p-2">
            <legend className=" text-amarelo-claro text-center">De:</legend>
            <div className="flex justify-center gap-2">
                <p>PAV:</p>
              <SelectComponentForm type="text" width="w-[80%]">
                {['I', 'II'].map((e) => {
                  return <option className={`${styles['style-opt']}`} key={e} value={e}>{e}</option>;
                })}
              </SelectComponentForm>
            </div>
            <div className="flex justify-center gap-2">
                <p>SOL:</p>
               <SelectComponentForm type="text" width="w-[80%]">
                {['1A', '2A', '3A', '1B', '2B', '3B', 'DISC', 'ALA G'].map((e) => {
                  return <option className={`${styles['style-opt']}`} key={e} value={e}>{e}</option>;
                })}
              </SelectComponentForm>
            </div>
            <div className="flex justify-center gap-2">
                <p>CELA:</p>
              <SelectComponentForm type="text" width="w-[80%]" />
            </div>
          </fieldset>
          <fieldset className="flex flex-col grow gap-3 border border-amarelo-claro rounded-[5px] p-2">
            <legend className=" text-amarelo-claro text-center">Para:</legend>
            <div className="flex justify-center gap-2">
                <p>PAV:</p>
              <SelectComponentForm type="text" width="w-[80%]" />
            </div>
            <div className="flex justify-center gap-2">
                <p>SOL:</p>
              <SelectComponentForm type="text" width="w-[80%]" />
            </div>
            <div className="flex justify-center gap-2">
                <p>CELA:</p>
              <SelectComponentForm type="text" width="w-[80%]" />
            </div>
          </fieldset>
        </div>
      </section>
    </FormDefault>
  );
}
