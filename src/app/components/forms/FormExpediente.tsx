"use client";
import { useEffect, useState } from "react";
import DateComponent from "../date/date";
import InputComponentForm from "../input/InputComponentForm";
import SelectComponent from "../select/Select";
import TextAreaComponent from "../textarea/TextAreaComponent";
import TimeComponent from "../time/TimeComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import {
  FormExpediente as ObjFormExpediente,
  Person,
} from "@/generated/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComboboxBasic } from "../shadcn/combobox/ComboboxBasic";
import { FormProps } from "@/app/interfaces/FormProps";

export default function FormExpediente({
  person,
  cacheData,
  onSave,
}: FormProps<ObjFormExpediente>) {

  const [linhaSelecionada, setLinhaSelecionada] = useState<number | null>(null);
  // const [falta, setFalta] = useState<Person>({ id: 0, name: "" });
  const [verifyString, setVerifyString] = useState(true);
  const [pessoaExpediente, setPessoaExpediente] = useState<string | null>(null);
  const [pessoaFalta, setPessoaFalta] = useState<string | null>(null);
  const [pessoaAtraso, setPessoaAtraso] = useState<string | null>(null);
  const [atrasoHorarioDe, setAtrasoHorarioDe] = useState<string>("");
  const [atrasoHorarioAte, setAtrasoHorarioAte] = useState<string>("");
  const [pessoaFerias, setPessoaFerias] = useState<string | null>(null);
  const [feriasDataAte, setFeriasDataAte] = useState("");
  const [pessoaRetornoFerias, setPessoaRetornoFerias] = useState<string | null>(
    null,
  );
  const [pessoaAtestado, setPessoaAtestado] = useState<string | null>(null);
  const [atestadoDias, setAtestadoDias] = useState<string>("");
  const [pessoaRetornoAtestado, setPessoaRetornoAtestado] = useState<
    string | null
  >(null);
  const [observacoes, setObservacoes] = useState<string>("");
  const [pessoaExpedienteTable, setPessoaExpedienteTable] = useState<string[]>([
    "--",
    "--",
  ]);

  useEffect(() => {
    if (cacheData) {
      if (cacheData.payload) {
        const {
          pessoa_falta,
          pessoa_atraso,
          atraso_horario_de,
          atraso_horario_ate,
          pessoa_ferias,
          ferias_ate,
          retorno_ferias,
          pessoa_atestado,
          atestado_dias,
          retorno_atestado,
          observacoes,
          pessoas_expediente,
        } = cacheData.payload;
        setPessoaFalta(pessoa_falta);
        setPessoaAtraso(pessoa_atraso);
        setAtrasoHorarioDe(atraso_horario_de ?? "");
        setAtrasoHorarioAte(atraso_horario_ate ?? "");
        setPessoaFerias(pessoa_ferias);
        setFeriasDataAte(ferias_ate ?? "");
        setPessoaRetornoFerias(retorno_ferias);
        setPessoaAtestado(pessoa_atestado);
        setObservacoes(observacoes ?? "")
        setAtestadoDias(String(atestado_dias) ?? "");
        setPessoaRetornoAtestado(retorno_atestado);
        if (pessoas_expediente) {
          //verificar '--' para liberar o verifyString
          //Verificar porque as inserções estão sobrescrevendo a tabela
          const parseJson = JSON.parse(pessoas_expediente.toString());
          if ((parseJson as string).includes("--") && verifyString == false) {
            setVerifyString(true);
          } else {
            setVerifyString(false);
          }
          setPessoaExpedienteTable(parseJson.split(","));
        }
      }
    } else {
      setPessoaFalta(null);
      setPessoaAtraso(null);
      setAtrasoHorarioDe("");
      setAtrasoHorarioAte("");
      setPessoaFerias(null);
      setFeriasDataAte("");
      setPessoaRetornoFerias(null);
      setPessoaAtestado(null);
      setAtestadoDias("");
      setPessoaRetornoAtestado(null);
      setObservacoes("")
      setPessoaExpedienteTable(['--', '--']);
      if(!verifyString) setVerifyString(true);
    }
  }, [cacheData]);
  onSave({
    id: 0,
    pessoa_falta: pessoaFalta,
    pessoa_atraso: pessoaAtraso,
    atraso_horario_de: atrasoHorarioDe.length > 0 ? atrasoHorarioDe : null,
    atraso_horario_ate: atrasoHorarioAte.length > 0 ? atrasoHorarioDe : null,
    pessoa_ferias: pessoaFerias,
    ferias_ate: feriasDataAte.length > 0 ? atrasoHorarioDe : null,
    retorno_ferias: pessoaRetornoFerias,
    pessoa_atestado: pessoaAtestado,
    atestado_dias: atestadoDias ? Number(atestadoDias) : null,
    retorno_atestado: pessoaRetornoAtestado,
    observacoes: observacoes.length > 0 ? observacoes : null,
    pessoas_expediente: JSON.stringify(pessoaExpedienteTable?.toString()),
    relatorioId: "",
  });
  const comboboxBasicPerson = (
    changeState: [
      onChange: (person: string | null) => void,
      value: string | null,
    ],
    styles: string = "w-full",
  ) => {
    const [onChange, value] = changeState;
    return (
      <ComboboxBasic
        items={person ?? []}
        value={value}
        onChange={(e) => {
          onChange(e ?? null);
        }}
        styles={styles}
      />
    );
  };

  const handlerInsertTable = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pessoaExpediente) {
      if (verifyString) {
        pessoaExpedienteTable.pop();
        if (
          !pessoaExpedienteTable.find((e) => {
            return e === "--";
          })
        ) {
          setVerifyString(false);
        }
      }
      setPessoaExpedienteTable((prev) => [pessoaExpediente, ...prev]);
    }
  };
  const handlerDeleteTable = (e: React.MouseEvent) => {
    e.preventDefault();
    if (linhaSelecionada === null) {
      return;
    }
    setPessoaExpedienteTable((prev) => {
      const novaLista = prev.filter((_, i) => i !== linhaSelecionada);
      if (novaLista.length === 0) {
        setVerifyString(true);
        return ["--", "--"];
      }
      return novaLista;
    });
    setLinhaSelecionada(null);
  };
  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Expediente:
      </h2>
      <section
        className={`${styles["style-div"]} flex justify-between items-center `}
      >
        <section className="flex flex-col gap-3 max-h-50">
          {comboboxBasicPerson([setPessoaExpediente, pessoaExpediente])}
          <button
            className="bg-amarelo-claro py-1 px-3 rounded-[5px] text-sm text-black font-bold cursor-pointer hover:bg-cinza-maisescuro hover:text-amarelo-claro transition-all duration-200"
            onClick={handlerInsertTable}
          >
            Inserir
          </button>
          <button
            className="bg-amarelo-claro py-1 px-3 rounded-[5px] text-sm text-black font-bold cursor-pointer hover:bg-cinza-maisescuro hover:text-amarelo-claro transition-all duration-200"
            onClick={handlerDeleteTable}
          >
            Excluir
          </button>
        </section>
        <section className="flex max-h-50 border rounded-[5px] border-amarelo-claro w-full">
          <Table className="">
            {/* <TableCaption></TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-full text-amarelo-claro">
                  Servidores presentes no expediente:
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pessoaExpedienteTable.map((servidor, i) => {
                const isSelect = i == linhaSelecionada;
                return (
                  <TableRow
                    key={i}
                    className={` ${isSelect && "bg-cinza-maisclaro!"}`}
                    onClick={() => servidor !== "--" && setLinhaSelecionada(i)}
                  >
                    <TableCell className="font-medium">{servidor}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </section>
      </section>
      <section className={`${styles["style-div"]} p-4! flex flex-col`}>
        <div className="flex w-full gap-2 items-center justify-end">
          <p className=" text-amarelo-claro">Falta:</p>
          {comboboxBasicPerson([setPessoaFalta, pessoaFalta])}
        </div>
        <div className="flex w-full items-center gap-2 justify-center">
          <p className=" text-amarelo-claro">Atraso:</p>
          {comboboxBasicPerson([setPessoaAtraso, pessoaAtraso], "w-2/3")}
          <p>De:</p>
          <TimeComponent
            onChange={setAtrasoHorarioDe}
            value={atrasoHorarioDe}
          />
          <p>Até</p>
          <TimeComponent
            onChange={setAtrasoHorarioAte}
            value={atrasoHorarioAte}
          />
        </div>
        <div className="flex w-full gap-2 items-center justify-around ">
          <p className=" text-amarelo-claro">Férias:</p>
          {comboboxBasicPerson([setPessoaFerias, pessoaFerias])}
          <div className="flex gap-2">
            <p>Até: </p>
            <DateComponent setDate={setFeriasDataAte} value={feriasDataAte} />
          </div>
        </div>
        <div className="flex w-full gap-2 items-center justify-end ">
          <p className=" min-w-fit text-amarelo-claro">Retorno de férias:</p>
          {comboboxBasicPerson([setPessoaRetornoFerias, pessoaRetornoFerias])}
        </div>
        <div className="flex w-full gap-2 items-center justify-end  ">
          <p className="text-amarelo-claro">Atestado:</p>
          {comboboxBasicPerson([setPessoaAtestado, pessoaAtestado], "w-2/3")}
          <p>De:</p>
          <InputComponentForm
            type="number"
            width="w-[10%]"
            height="h-full"
            onChange={(e: any) => {
              setAtestadoDias(e.target.value);
            }}
            value={atestadoDias}
          />
          <p>dias.</p>
        </div>
        <div className="flex w-full gap-2 items-center justify-end ">
          <p className="min-w-fit text-amarelo-claro">Retorno de atestado:</p>
          {comboboxBasicPerson([
            setPessoaRetornoAtestado,
            pessoaRetornoAtestado,
          ])}
        </div>
        <div>
          <p className="text-amarelo-claro text-left">Observações:</p>
          <TextAreaComponent width="w-full" height="h-20" setTextArea={setObservacoes} value={observacoes}/>
        </div>
      </section>
    </FormDefault>
  );
}
