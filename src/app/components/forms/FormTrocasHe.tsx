import { FormTrocaHe, Person } from "@/generated/prisma";
import DateComponent from "../date/date";
import SelectComponent from "../select/Select";
import TimeComponent from "../time/TimeComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import { useEffect, useState } from "react";
import { SucessAuth } from "@/app/types/auth";
export default function FormTrocas({
  person,
  onSave,
  cache,
}: {
  person: Person[] | undefined;
  onSave: (data: FormTrocaHe) => void;
  cache: SucessAuth | null;
}) {
  const [substituto, setSubstituto] = useState<string | null>("");
  const [substituido, setSubstituido] = useState<string | null>("");
  const [dataEntrada, setDataEntrada] = useState<string | null>("");
  const [horarioEntrada, setHorarioEntrada] = useState<string | null>("");
  const [dataSaida, setDataSaida] = useState<string | null>("");
  const [horarioSaida, setHorarioSaida] = useState<string | null>("");
  const [servidorHe, setServidorHe] = useState<string | null>("");
  const [inicioHe, setInicioHe] = useState<string | null>("");
  const [terminoHe, setTerminoHe] = useState<string | null>("");

  onSave({
    substituto: substituto,
    substituido: substituido,
    data_entrada: dataEntrada,
    horario_entrada: horarioEntrada,
    data_saida: dataSaida,
    horario_saida: horarioSaida,
    servidor_he: servidorHe,
    inicio_he: inicioHe,
    termino_he: terminoHe,
    relatorioId: "",
    id: 0,
  });
  useEffect(() => {
    if (cache) {
      const data = cache.payload as FormTrocaHe;
      setSubstituido(data.substituido);
      setSubstituto(data.substituto);
      setDataEntrada(data.data_entrada);
      setHorarioEntrada(data.horario_entrada);
      setDataSaida(data.data_saida);
      setHorarioSaida(data.horario_saida);
      setServidorHe(data.servidor_he);
      setInicioHe(data.inicio_he);
      setTerminoHe(data.termino_he);
    } else {
      setSubstituido('');
      setSubstituto('');
      setDataEntrada('');
      setHorarioEntrada('');
      setDataSaida('');
      setHorarioSaida('');
      setServidorHe('');
      setInicioHe('');
      setTerminoHe('');
    }
  }, [cache]);

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Trocas de serviço
      </h2>
      <section className={`${styles["style-div"]} flex flex-col`}>
        <fieldset className="flex w-full gap-2 border border-amarelo-claro rounded-[5px] p-2">
          <legend className="text-amarelo-claro text-center">Servidores</legend>
          <div className="flex w-full gap-2">
            <p>substituto:</p>
            <SelectComponent
              width="w-full"
              value={substituto}
              onChange={(e: any) => {
                setSubstituto(e.target.value);
              }}
            >
              <option className="hidden" value=""></option>
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
          <div className="flex w-full  gap-2">
            <p>Substituído:</p>
            <SelectComponent
              width="w-full"
              value={substituido}
              onChange={(e: any) => {
                setSubstituido(e.target.value);
              }}
            >
              <option className="hidden" value=""></option>
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
        <fieldset className="flex w-full justify-around gap-2 border border-amarelo-claro rounded-[5px] p-2">
          <legend className="text-amarelo-claro text-center">
            Horários e Data
          </legend>
          <div className="flex items-center justify-center gap-2">
            <p>Entrada:</p>
            <DateComponent setDate={setDataEntrada} value={dataEntrada} />
            <TimeComponent onChange={setHorarioEntrada} value={horarioEntrada}/>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>Saída:</p>
            <DateComponent setDate={setDataSaida} value={dataSaida}/>
            <TimeComponent onChange={setHorarioSaida} value={horarioSaida}/>
          </div>
        </fieldset>
      </section>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Hora extra
      </h2>
      <section className={`${styles["style-div"]} flex justify-between `}>
        <div className="flex flex-1 gap-2">
          <p className="">Servidor: </p>
          <SelectComponent
            width="w-full"
            value={servidorHe}
            onChange={(e: any) => {
              setServidorHe(e.target.value);
            }}
          >
            <option className="hidden" value=""></option>
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
        <div className="flex gap-2">
          <p className="">Ínicio: </p>
          <TimeComponent onChange={setInicioHe} value={inicioHe} />
        </div>
        <div className="flex gap-2">
          <p className="">Término: </p>
          <TimeComponent onChange={setTerminoHe} value={terminoHe}/>
        </div>
      </section>
    </FormDefault>
  );
}
