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
import { useEffect, useMemo, useRef, useState } from "react";
import { FormProps } from "@/app/interfaces/FormProps";
import { FormEntradaPresos as ObjFormEntradaPresos } from "@/generated/prisma";

interface FormatoTabelaEntrada {
  nome: string;
  documento: string;
  procedencia: string;
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
        onChange={(e: any) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default function FormEntradaPresos({
  cacheData,
  onSave,
  generateData,
  readyData,
}: FormProps<ObjFormEntradaPresos>) {
  const [nomeEntradaPreso, setNomeEntradaPreso] = useState("");
  const [documentoEntradaPreso, setDocumentoEntradaPreso] = useState("");
  const [procedenciaEntradaPreso, setProcedenciaEntradaPreso] = useState("");
  const [autorizadoEntradaPreso, setAutorizadoEntradaPreso] = useState("");
  const [linhaSelecionada, setLinhaSelecionada] = useState({});
  const valorCampoVazio = useRef(5);

  useEffect(() => {
    if (generateData) {
      onSave({
        id: 0,
        relatorioId: "",
        presos: JSON.stringify(limparCamposVazios()),
      });
      if (readyData) {
        readyData(true);
      }
    }
  }, [generateData]);

  useEffect(() => {
    if (cacheData && cacheData.payload) {
      const { presos } = cacheData.payload;
      if (presos) {
        setTabelaEntradaPresos(JSON.parse(presos.toString()));
      }
    } else {
      setTabelaEntradaPresos(gerarCamposVazios(valorCampoVazio.current));
    }
  }, [cacheData]);

  const limparCamposVazios = (): FormatoTabelaEntrada[] => {
    const arr = [...tabelaEntradaPresos];
    return arr.filter((_) => {
      return _.nome !== "--";
    });
  };

  const camposEntradaPresos = useMemo(
    () => [
      { nome: "Nome:", value: nomeEntradaPreso, onchange: setNomeEntradaPreso },
      {
        nome: "Documento:",
        value: documentoEntradaPreso,
        onchange: setDocumentoEntradaPreso,
      },
      {
        nome: "Procedência:",
        value: procedenciaEntradaPreso,
        onchange: setProcedenciaEntradaPreso,
      },
      {
        nome: "Autorizado:",
        value: autorizadoEntradaPreso,
        onchange: setAutorizadoEntradaPreso,
      },
    ],
    [
      nomeEntradaPreso,
      documentoEntradaPreso,
      procedenciaEntradaPreso,
      autorizadoEntradaPreso,
    ],
  );

  const limparCampos = () => {
    setNomeEntradaPreso("");
    setDocumentoEntradaPreso("");
    setProcedenciaEntradaPreso("");
    setAutorizadoEntradaPreso("");
  };

  const gerarCamposVazios = (i: number): FormatoTabelaEntrada[] => {
    const arr = [];
    for (let v = 1; v <= i; v++) {
      arr.push({
        nome: "--",
        documento: "--",
        procedencia: "--",
        autorizado: "--",
      });
    }
    return arr;
  };

  const [tabelaEntradaPresos, setTabelaEntradaPresos] = useState<
    FormatoTabelaEntrada[]
  >(gerarCamposVazios(valorCampoVazio.current));

  const handlerInserir = (e: any) => {
    e.preventDefault();
    setTabelaEntradaPresos((prev) => {
      let arr = [...prev];
      let elemento = arr[0];
      if (elemento && elemento.autorizado == "--") {
        arr.shift();
      }
      return [
        ...arr,
        {
          nome: nomeEntradaPreso,
          documento: documentoEntradaPreso,
          procedencia: procedenciaEntradaPreso,
          autorizado: autorizadoEntradaPreso,
        },
      ];
    });
    limparCampos();
  };
  const handlerDeletar = (e: any) => {
    e.preventDefault();
    if (!("nome" in linhaSelecionada)) {
      return;
    }
    setTabelaEntradaPresos((prev) => {
      let arr = [...prev];
      if (arr.length <= 1) {
        return gerarCamposVazios(valorCampoVazio.current);
      }

      return arr.filter((_) => _ !== linhaSelecionada);
    });
    setLinhaSelecionada({});
  };

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Entrada de Presos:
      </h2>
      <section
        className={`${styles["style-div"]} flex flex-col gap-2 text-amarelo-claro`}
      >
        <section className="flex max-h-70 border rounded-[5px] border-cinza-maisclaro w-full">
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
                  Procedência:
                </TableHead>
                <TableHead className="text-amarelo-claro">
                  Autorizado:
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tabelaEntradaPresos.map((e, i) => {
                const linha = linhaSelecionada === e;
                return (
                  <TableRow
                    key={i}
                    onClick={() => setLinhaSelecionada(e)}
                    className={`${linha && "bg-cinza-maisclaro"} cursor-pointer`}
                  >
                    <TableCell>{e.nome}</TableCell>
                    <TableCell>{e.documento}</TableCell>
                    <TableCell>{e.procedencia}</TableCell>
                    <TableCell>{e.autorizado}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </section>
        <div className="flex gap-2 items-stretch">
          <button
            className="bg-amarelo-claro py-1 px-3 rounded-[5px] w-full text-sm text-black font-bold cursor-pointer hover:bg-cinza-maisescuro hover:text-amarelo-claro transition-all duration-200"
            onClick={handlerInserir}
          >
            Inserir
          </button>
          <button
            className="bg-amarelo-claro py-1 px-3 rounded-[5px] w-full text-sm text-black font-bold cursor-pointer hover:bg-cinza-maisescuro hover:text-amarelo-claro transition-all duration-200"
            onClick={handlerDeletar}
          >
            Excluir
          </button>
        </div>
        {camposEntradaPresos.map((e) => {
          return gerarInputComponentForm(e.nome, [e.value, e.onchange]);
        })}
      </section>
    </FormDefault>
  );
}
