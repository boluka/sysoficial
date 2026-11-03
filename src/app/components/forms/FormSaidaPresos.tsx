"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InputComponentForm from "../input/InputComponentForm";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import { useMemo, useRef, useState } from "react";

interface FormatoTabelaSaida {
  nome: string;
  documento: string;
  destino: string;
  autorizado: string;
}
const gerarInputComponentForm = (
    nomeP: string,
    props: [value: string, onChange: (value: string) => void],
  ) => {
    const [value, onChange] = props;
    return (
      <div className="flex gap-2" key={nomeP}>
        <p>{nomeP}</p>
        <InputComponentForm
          type="text"
          width="w-full"
          value={value}
          onChange={(e:any) => {onChange(e.target.value)}}
        />
      </div>
    );
  };

export default function FormaSaidaPresos() {
  const [linhaSelecionada, setLinhaSelecionada] = useState({});

  const [nomeSaidaPreso, setNomeSaidaPreso] = useState("");
  const [documentoSaidaPreso, setDocumentoSaidaPreso] = useState("");
  const [destinoSaidaPreso, setDestinoSaidaPreso] = useState("");
  const [autorizadoSaidaPreso, setAutorizadoSaidaPreso] = useState("");

  const camposSaidaPresos = useMemo(() => [
    { nome: "Nome:", value: nomeSaidaPreso, onchange: setNomeSaidaPreso },
    {
      nome: "Documento:",
      value: documentoSaidaPreso,
      onchange: setDocumentoSaidaPreso,
    },
    {
      nome: "Destino:",
      value: destinoSaidaPreso,
      onchange: setDestinoSaidaPreso,
    },
    {
      nome: "Autorizado:",
      value: autorizadoSaidaPreso,
      onchange: setAutorizadoSaidaPreso,
    },
  ], [nomeSaidaPreso, documentoSaidaPreso, destinoSaidaPreso, autorizadoSaidaPreso]);
  const [tabelaSaidaPresos, setTabelaSaidaPresos] = useState<
    FormatoTabelaSaida[]
  >([]);

  
  const handlerInserir = (e:any) => {
    e.preventDefault();
    setTabelaSaidaPresos((prev) => [
      ...prev,
      {
        nome: nomeSaidaPreso,
        documento: documentoSaidaPreso,
        destino: destinoSaidaPreso,
        autorizado: autorizadoSaidaPreso,
      },
    ]);
    setNomeSaidaPreso("");
    setDocumentoSaidaPreso("");
    setDestinoSaidaPreso("");
    setAutorizadoSaidaPreso("");
  };
  const handlerDeletar = (e:any) => {
    e.preventDefault();
    setTabelaSaidaPresos((prev) => (
      prev.filter((_) => _ !== linhaSelecionada)
    ));
    setLinhaSelecionada({});
  }

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Saída de Presos:
      </h2>
      <section
        className={`${styles["style-div"]} flex flex-col gap-2 text-amarelo-claro`}
      >
        <section className="flex max-h-35 border rounded-[5px] border-cinza-maisclaro w-full">
          <Table className="">
            <TableCaption></TableCaption>
            <TableHeader className="">
              <TableRow>
                <TableHead className="w-1/4 text-amarelo-claro">
                  Nome:
                </TableHead>
                <TableHead className="w-1/4 text-amarelo-claro">
                  Documento:
                </TableHead>
                <TableHead className="w-1/4 text-amarelo-claro">
                  Destino:
                </TableHead>
                <TableHead className="text-amarelo-claro">
                  Autorizado:
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {tabelaSaidaPresos.map((e, i) => {
                  const linha = linhaSelecionada === e
                  return (
                    <TableRow key={i} onClick={() => setLinhaSelecionada(e)} className={`${linha && "bg-cinza-maisclaro" } cursor-pointer`}>
                      <TableCell>{e.nome}</TableCell>
                      <TableCell>{e.documento}</TableCell>
                      <TableCell>{e.destino}</TableCell>
                      <TableCell>{e.autorizado}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </section>
        {camposSaidaPresos.map((e) => {
          return gerarInputComponentForm(e.nome, [e.value, e.onchange]);
        })}
      </section>
    </FormDefault>
  );
}
