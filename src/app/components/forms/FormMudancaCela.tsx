'use client";';
import InputComponentForm from "../input/InputComponentForm";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import SelectComponentForm from "../select/Select";
import { useEffect, useState } from "react";

interface Setores {
  pav: string;
  sol: string;
  cela: string;
}

interface FormMudancaState {
  1: {de: Setores, para: Setores};
  2: {de: Setores, para: Setores}
}

export default function FormMudancaCela() {
  const [data, setData] = useState<FormMudancaState>({
    "1": {
      de: {
        pav: "",
        sol: "",
        cela: "",
      },
      para: {
        pav: "",
        sol: "",
        cela: "",
      }
    },
    "2": {
      de: {
        pav: "",
        sol: "",
        cela: "",
      },
      para: {
        pav: "",
        sol: "",
        cela: "",
      }
    },
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    const [numero, bloco , campo] = name.split(".");

    const blocoValido = bloco as keyof FormMudancaState;

    setData((prev) => ({
      ...prev,
      [numero]: {
        ...prev[blocoValido],
        [bloco] : {
          ...prev[blocoValido]
        } 
      },
    }));
  };
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
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                onChange={handleChange}
                name="1.de.pav"
              >
                {["", "I", "II"].map((e) => {
                  return (
                    <option
                      className={`${styles["style-opt"]}`}
                      key={e}
                      value={e}
                    >
                      {e === "" ? "Selecione uma opção..." : e}
                    </option>
                  );
                })}
              </SelectComponentForm>
            </div>
            <div className="flex justify-center gap-2">
              <p>SOL:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                onChange={handleChange}
                name="de.sol"
              >
                {["", "1A", "2A", "3A", "1B", "2B", "3B", "DISC", "ALA G"].map(
                  (e) => {
                    return (
                      <option
                        className={`${styles["style-opt"]}`}
                        key={e}
                        value={e}
                      >
                        {e === "" ? "Selecione uma opção..." : e}
                      </option>
                    );
                  },
                )}
              </SelectComponentForm>
            </div>
            <div className="flex justify-center gap-2">
              <p>CELA:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                onChange={handleChange}
                name="de.cela"
              >
                {["", "1", "2", "3", "4", "5", "6"].map((e) => {
                  return (
                    <option
                      className={`${styles["style-opt"]}`}
                      key={e}
                      value={e}
                    >
                      {e === "" ? "Selecione uma opção..." : e}
                    </option>
                  );
                })}
              </SelectComponentForm>
            </div>
          </fieldset>
          <fieldset className="flex flex-col grow gap-3 border border-amarelo-claro rounded-[5px] p-2">
            <legend className=" text-amarelo-claro text-center">Para:</legend>
            <div className="flex justify-center gap-2">
              <p>PAV:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                onChange={handleChange}
                name="para.pav"
              >
                {["", "I", "II"].map((e) => {
                  return (
                    <option
                      className={`${styles["style-opt"]}`}
                      key={e}
                      value={e}
                    >
                      {e === "" ? "Selecione uma opção..." : e}
                    </option>
                  );
                })}
              </SelectComponentForm>
            </div>
            <div className="flex justify-center gap-2">
              <p>SOL:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                onChange={handleChange}
                name="para.sol"
              >
                {["", "1A", "2A", "3A", "1B", "2B", "3B", "DISC", "ALA G"].map(
                  (e) => {
                    return (
                      <option
                        className={`${styles["style-opt"]}`}
                        key={e}
                        value={e}
                      >
                        {e === "" ? "Selecione uma opção..." : e}
                      </option>
                    );
                  },
                )}
              </SelectComponentForm>
            </div>
            <div className="flex justify-center gap-2">
              <p>CELA:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                onChange={handleChange}
                name="para.cela"
              >
                {["", "1", "2", "3", "4", "5", "6"].map((e) => {
                  return (
                    <option
                      className={`${styles["style-opt"]}`}
                      key={e}
                      value={e}
                    >
                      {e === "" ? "Selecione uma opção..." : e}
                    </option>
                  );
                })}
              </SelectComponentForm>
            </div>
          </fieldset>
        </div>
      </section>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Pedido de Seguro:
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
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                onChange={handleChange}
                name="de.pav"
              >
                {["", "I", "II"].map((e) => {
                  return (
                    <option
                      className={`${styles["style-opt"]}`}
                      key={e}
                      value={e}
                    >
                      {e === "" ? "Selecione uma opção..." : e}
                    </option>
                  );
                })}
              </SelectComponentForm>
            </div>
            <div className="flex justify-center gap-2">
              <p>SOL:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                onChange={handleChange}
                name="de.sol"
              >
                {["", "1A", "2A", "3A", "1B", "2B", "3B", "DISC", "ALA G"].map(
                  (e) => {
                    return (
                      <option
                        className={`${styles["style-opt"]}`}
                        key={e}
                        value={e}
                      >
                        {e === "" ? "Selecione uma opção..." : e}
                      </option>
                    );
                  },
                )}
              </SelectComponentForm>
            </div>
            <div className="flex justify-center gap-2">
              <p>CELA:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                onChange={handleChange}
                name="de.cela"
              >
                {["", "1", "2", "3", "4", "5", "6"].map((e) => {
                  return (
                    <option
                      className={`${styles["style-opt"]}`}
                      key={e}
                      value={e}
                    >
                      {e === "" ? "Selecione uma opção..." : e}
                    </option>
                  );
                })}
              </SelectComponentForm>
            </div>
          </fieldset>
          <fieldset className="flex flex-col grow gap-3 border border-amarelo-claro rounded-[5px] p-2">
            <legend className=" text-amarelo-claro text-center">Para:</legend>
            <div className="flex justify-center gap-2">
              <p>PAV:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                onChange={handleChange}
                name="para.pav"
              >
                {["", "I", "II"].map((e) => {
                  return (
                    <option
                      className={`${styles["style-opt"]}`}
                      key={e}
                      value={e}
                    >
                      {e === "" ? "Selecione uma opção..." : e}
                    </option>
                  );
                })}
              </SelectComponentForm>
            </div>
            <div className="flex justify-center gap-2">
              <p>SOL:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                onChange={handleChange}
                name="para.sol"
              >
                {["", "1A", "2A", "3A", "1B", "2B", "3B", "DISC", "ALA G"].map(
                  (e) => {
                    return (
                      <option
                        className={`${styles["style-opt"]}`}
                        key={e}
                        value={e}
                      >
                        {e === "" ? "Selecione uma opção..." : e}
                      </option>
                    );
                  },
                )}
              </SelectComponentForm>
            </div>
            <div className="flex justify-center gap-2">
              <p>CELA:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                onChange={handleChange}
                name="para.cela"
              >
                {["", "1", "2", "3", "4", "5", "6"].map((e) => {
                  return (
                    <option
                      className={`${styles["style-opt"]}`}
                      key={e}
                      value={e}
                    >
                      {e === "" ? "Selecione uma opção..." : e}
                    </option>
                  );
                })}
              </SelectComponentForm>
            </div>
          </fieldset>
        </div>
      </section>
    </FormDefault>
  );
}
