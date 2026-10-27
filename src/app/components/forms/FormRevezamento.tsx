"use client";
import { FormProps } from "@/app/interfaces/FormProps";
import SelectComponent from "../select/Select";
import CheckBox from "../shadcn/checkbox/CheckBox";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import {
  Hours,
  FormRevezamento as ObjFormRevezamento,
} from "@/generated/prisma";
import { useEffect, useState } from "react";
import { ComboboxBasic } from "../shadcn/combobox/ComboboxBasic";

interface Turno {
  horario: string;
  pavilhaoUm: string;
  pavilhaoDois: string;
  monitoramento: string;
  ronda: string;
  rondaAlternadaMonitor: boolean;
}
export default function FormRevezamento({
  cacheData,
  onSave,
  person,
  hours,
}: FormProps<ObjFormRevezamento> & { hours: Hours[] }) {
  const gerarObjTurnoVazio = (): Turno => {
    return {
      horario: "",
      pavilhaoUm: "",
      pavilhaoDois: "",
      monitoramento: "",
      ronda: "",
      rondaAlternadaMonitor: false,
    };
  };
  const [primeiroTurno, setPrimeiroTurno] =
    useState<Turno>(gerarObjTurnoVazio());
  const [segundoTurno, setSegundoTurno] = useState<Turno>(gerarObjTurnoVazio());
  const [terceiroTurno, setTerceiroTurno] =
    useState<Turno>(gerarObjTurnoVazio());
  const [quartoTurno, setQuartoTurno] = useState<Turno>(gerarObjTurnoVazio());
  onSave({
    id: 0,
    relatorioId: "",
    primeiro_turno: JSON.stringify(primeiroTurno),
    segundo_turno: JSON.stringify(segundoTurno),
    terceiro_turno: JSON.stringify(terceiroTurno),
    quarto_turno: JSON.stringify(quartoTurno),
  });
  useEffect(() => {
    if (cacheData?.payload) {
      const { primeiro_turno, segundo_turno, terceiro_turno, quarto_turno } =
        cacheData.payload;
      setPrimeiroTurno(JSON.parse(primeiro_turno?.toString() ?? ""));
      setSegundoTurno(JSON.parse(segundo_turno?.toString() ?? ""));
      setTerceiroTurno(JSON.parse(terceiro_turno?.toString() ?? ""));
      setQuartoTurno(JSON.parse(quarto_turno?.toString() ?? ""));
    } else {
      setPrimeiroTurno(gerarObjTurnoVazio());
      setSegundoTurno(gerarObjTurnoVazio());
      setTerceiroTurno(gerarObjTurnoVazio());
      setQuartoTurno(gerarObjTurnoVazio());
    }
  }, [cacheData]);
  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Revezamento Noturno:
      </h2>
      <section
        className={`${styles["style-div"]}   grid grid-cols-2 grid-rows-2`}
      >
        <fieldset className="flex flex-col gap-3 border border-amarelo-claro rounded-[5px] p-2">
          <legend className=" text-amarelo-claro text-center">1º TURNO:</legend>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Horário:</p>
            <SelectComponent
              width="w-full"
              onChange={(e: any) => {
                setPrimeiroTurno((prev) => ({
                  ...prev,
                  horario: e.target.value,
                }));
              }}
              value={primeiroTurno.horario}
            >
              <option value="" className="disabled hidden"></option>
              {hours.map((e, i) => {
                return (
                  <option
                    key={i}
                    className="bg-cinza-escuro text-amarelo-claro"
                  >
                    {e.hour}
                  </option>
                );
              })}
            </SelectComponent>
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão I:</p>
            <ComboboxBasic
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setPrimeiroTurno((prev) => ({ ...prev, pavilhaoUm: str }));
              }}
              value={primeiroTurno.pavilhaoUm}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão II:</p>
            <ComboboxBasic
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setPrimeiroTurno((prev) => ({ ...prev, pavilhaoDois: str }));
              }}
              value={primeiroTurno.pavilhaoDois}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Monitoramento:</p>
            <ComboboxBasic
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setPrimeiroTurno((prev) => ({ ...prev, monitoramento: str }));
              }}
              value={primeiroTurno.monitoramento}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Ronda:</p>
            <ComboboxBasic
              styles="w-full"
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setPrimeiroTurno((prev) => ({ ...prev, ronda: str }));
              }}
              value={primeiroTurno.ronda}
            />
          </div>
          <div className="flex gap-1 flex-row-reverse justify-end items-center">
            <p className=" text-[0.8em] text-amarelo-claro">
              Ronda alternada com monitoramento.
            </p>
            <CheckBox
              onChange={(e) => {
                setPrimeiroTurno((prev) => ({
                  ...prev,
                  rondaAlternadaMonitor: e,
                }));
              }}
              value={primeiroTurno.rondaAlternadaMonitor}
            />
          </div>
        </fieldset>
        <fieldset className="flex flex-col row-start-2 gap-3 border border-amarelo-claro rounded-[5px] p-2">
          <legend className=" text-amarelo-claro text-center">2º TURNO:</legend>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Horário:</p>
            <SelectComponent
              width="w-full"
              onChange={(e: any) => {
                setSegundoTurno((prev) => ({
                  ...prev,
                  horario: e.target.value,
                }));
              }}
              value={segundoTurno.horario}
            >
              <option value="" className="disabled hidden"></option>
              {hours.map((e, i) => {
                return (
                  <option
                    key={i}
                    className="bg-cinza-escuro text-amarelo-claro"
                  >
                    {e.hour}
                  </option>
                );
              })}
            </SelectComponent>
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão I:</p>
            <ComboboxBasic
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setSegundoTurno((prev) => ({ ...prev, pavilhaoUm: str }));
              }}
              value={segundoTurno.pavilhaoUm}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão II:</p>
            <ComboboxBasic
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setSegundoTurno((prev) => ({ ...prev, pavilhaoDois: str }));
              }}
              value={segundoTurno.pavilhaoDois}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Monitoramento:</p>
            <ComboboxBasic
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setSegundoTurno((prev) => ({ ...prev, monitoramento: str }));
              }}
              value={segundoTurno.monitoramento}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Ronda:</p>
            <ComboboxBasic
              styles="w-full"
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setSegundoTurno((prev) => ({ ...prev, ronda: str }));
              }}
              value={segundoTurno.ronda}
            />
          </div>
          <div className="flex gap-1 flex-row-reverse justify-end items-center">
            <p className=" text-[0.8em] text-amarelo-claro">
              Ronda alternada com monitoramento.
            </p>
            <CheckBox
              onChange={(e) => {
                setSegundoTurno((prev) => ({
                  ...prev,
                  rondaAlternadaMonitor: e,
                }));
              }}
              value={segundoTurno.rondaAlternadaMonitor}
            />
          </div>
        </fieldset>
        <fieldset className="flex flex-col  gap-3 border border-amarelo-claro rounded-[5px] p-2">
          <legend className=" text-amarelo-claro text-center">3º TURNO:</legend>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Horário:</p>
            <SelectComponent
              width="w-full"
              onChange={(e: any) => {
                setTerceiroTurno((prev) => ({
                  ...prev,
                  horario: e.target.value,
                }));
              }}
              value={terceiroTurno.horario}
            >
              <option value="" className="disabled hidden"></option>
              {hours.map((e, i) => {
                return (
                  <option
                    key={i}
                    className="bg-cinza-escuro text-amarelo-claro"
                  >
                    {e.hour}
                  </option>
                );
              })}
            </SelectComponent>
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão I:</p>
            <ComboboxBasic
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setTerceiroTurno((prev) => ({ ...prev, pavilhaoUm: str }));
              }}
              value={terceiroTurno.pavilhaoUm}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão II:</p>
            <ComboboxBasic
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setTerceiroTurno((prev) => ({ ...prev, pavilhaoDois: str }));
              }}
              value={terceiroTurno.pavilhaoDois}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Monitoramento:</p>
            <ComboboxBasic
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setTerceiroTurno((prev) => ({ ...prev, monitoramento: str }));
              }}
              value={terceiroTurno.monitoramento}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Ronda:</p>
            <ComboboxBasic
              styles="w-full"
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setTerceiroTurno((prev) => ({ ...prev, ronda: str }));
              }}
              value={terceiroTurno.ronda}
            />
          </div>
          <div className="flex gap-1 flex-row-reverse justify-end items-center">
            <p className=" text-[0.8em]  text-amarelo-claro">
              Ronda alternada com monitoramento.
            </p>
            <CheckBox
              onChange={(e) => {
                setTerceiroTurno((prev) => ({
                  ...prev,
                  rondaAlternadaMonitor: e,
                }));
              }}
              value={terceiroTurno.rondaAlternadaMonitor}
            />
          </div>
        </fieldset>
        <fieldset className="flex flex-col row-start-2 gap-3 border border-amarelo-claro rounded-[5px] p-2">
          <legend className=" text-amarelo-claro text-center">4º TURNO:</legend>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Horário:</p>
            <SelectComponent
              width="w-full"
              onChange={(e: any) => {
                setQuartoTurno((prev) => ({
                  ...prev,
                  horario: e.target.value,
                }));
              }}
              value={quartoTurno.horario}
            >
              <option value="" className="disabled hidden"></option>
              {hours.map((e, i) => {
                return (
                  <option
                    key={i}
                    className="bg-cinza-escuro text-amarelo-claro"
                  >
                    {e.hour}
                  </option>
                );
              })}
            </SelectComponent>
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão I:</p>
            <ComboboxBasic
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setQuartoTurno((prev) => ({ ...prev, pavilhaoUm: str }));
              }}
              value={quartoTurno.pavilhaoUm}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão II:</p>
            <ComboboxBasic
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setQuartoTurno((prev) => ({ ...prev, pavilhaoDois: str }));
              }}
              value={quartoTurno.pavilhaoDois}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Monitoramento:</p>
            <ComboboxBasic
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setQuartoTurno((prev) => ({ ...prev, monitoramento: str }));
              }}
              value={quartoTurno.monitoramento}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Ronda:</p>
            <ComboboxBasic
              styles="w-full"
              items={person ?? []}
              onChange={(e) => {
                const str = e ?? "";
                setQuartoTurno((prev) => ({ ...prev, ronda: str }));
              }}
              value={quartoTurno.ronda}
            />
          </div>
          <div className="flex gap-1 flex-row-reverse justify-end items-center">
            <p className=" text-[0.8em] text-amarelo-claro">
              Ronda alternada com monitoramento.
            </p>
            <CheckBox
              onChange={(e) => {
                setQuartoTurno((prev) => ({
                  ...prev,
                  rondaAlternadaMonitor: e,
                }));
              }}
              value={quartoTurno.rondaAlternadaMonitor}
            />
          </div>
        </fieldset>
      </section>
    </FormDefault>
  );
}
