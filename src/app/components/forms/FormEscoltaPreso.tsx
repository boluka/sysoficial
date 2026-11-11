"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InputComponentForm from "../input/InputComponentForm";
import SelectComponent from "../select/Select";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import { useEffect, useState } from "react";
import { ComboboxBasic } from "../shadcn/combobox/ComboboxBasic";
import { FormEscoltaPresos as ObjFormEscoltaPresos } from "@/generated/prisma";
import { FormProps } from "@/app/interfaces/FormProps";

interface CamposTabela {
  nome: string;
  documento: string;
  destino: string;
  realizadoPor: string;
}
interface OrgaoOficial {
  id: number;
  name: string;
}

const nomesOficiais = [
  "PM - Polícia Militar",
  "GEP - Grupamento de Escolta Penitenciária",
  "PC - Polícia Civil",
  "COPE - Comando de Operações Penitenciária",
  "PF - Polícia Federal",
  "Corpo de Bombeiros",
  "IPCG",
  "GAFIP",
  "CPAC",
  "SISREG",
];

const orgaosOficiais: OrgaoOficial[] = nomesOficiais.map((nome, index) => ({
  id: index,
  name: nome,
}));

export default function FormEscoltaPreso({
  onSave,
  cacheData,
  readyData,
  generateData,
}: FormProps<ObjFormEscoltaPresos>) {
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [destino, setDestino] = useState("");
  const [realizadoPor, setRealizadoPor] = useState("");
  const [tabelaDados, setTabelaDados] = useState<CamposTabela[]>([]);
  const [linhaSelecionada, setLinhaSelecionada] = useState<CamposTabela | null>(
    null,
  );

  useEffect(() => {
    if (generateData) {
      onSave({
        id: 0,
        presos: JSON.stringify(tabelaDados),
        relatorioId: "",
      });
      readyData && readyData(true);
    }
  }, [generateData]);
  useEffect(() => {
    if (cacheData && cacheData.payload) {
      const { presos } = cacheData.payload;
      if (presos) {
        const presosArray = JSON.parse(presos.toString());
        setTabelaDados(presosArray);
      }
    } else {
      setTabelaDados([]);
    }
  }, [cacheData]);

  const limparCampos = () => {
    setNome("");
    setDocumento("");
    setDestino("");
    setRealizadoPor("");
  };

  const handleInsert = (e: any) => {
    e.preventDefault();
    setTabelaDados((prev) => [
      ...prev,
      { nome, documento, destino, realizadoPor },
    ]);
    limparCampos();
  };
  const handleDelete = (e: any) => {
    e.preventDefault();
    if (!linhaSelecionada) {
      return;
    }
    setTabelaDados((prev) => {
      const copiaTabela = [...prev];
      return copiaTabela.filter((e) => {
        return e !== linhaSelecionada;
      });
    });
    setLinhaSelecionada(null);
  };

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Escolta de Presos:
      </h2>
      <section
        className={`${styles["style-div"]} flex flex-col gap-2 text-amarelo-claro`}
      >
        <section className="flex max-h-70 border rounded-[5px] border-cinza-maisclaro w-full">
          <Table className="">
            <TableHeader className="">
              <TableRow>
                <TableHead className="text-amarelo-claro">Nome:</TableHead>
                <TableHead className=" text-amarelo-claro">
                  Documento:
                </TableHead>
                <TableHead className=" text-amarelo-claro">Destino:</TableHead>
                <TableHead className=" text-amarelo-claro">
                  Realizado por:
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tabelaDados &&
                tabelaDados.map((e, i) => {
                  const linha = e === linhaSelecionada;
                  return (
                    <TableRow
                      key={i}
                      className={`${linha && "bg-cinza-maisclaro"} cursor-pointer`}
                      onClick={() => setLinhaSelecionada(e)}
                    >
                      <TableCell>{e.nome}</TableCell>
                      <TableCell>{e.documento}</TableCell>
                      <TableCell>{e.destino}</TableCell>
                      <TableCell>{e.realizadoPor}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </section>
        <div className="flex gap-2 items-stretch">
          <button
            className="bg-amarelo-claro py-1 px-3 rounded-[5px] w-full text-sm text-black font-bold cursor-pointer hover:bg-cinza-maisescuro hover:text-amarelo-claro transition-all duration-200"
            onClick={handleInsert}
          >
            Inserir
          </button>
          <button
            className="bg-amarelo-claro py-1 px-3 rounded-[5px] w-full text-sm text-black font-bold cursor-pointer hover:bg-cinza-maisescuro hover:text-amarelo-claro transition-all duration-200"
            onClick={handleDelete}
          >
            Excluir
          </button>
        </div>
        <div className="flex gap-2">
          <p>Nome:</p>
          <InputComponentForm
            type="text"
            width="w-full"
            value={nome}
            onChange={(e: any) => setNome(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <p>Documento:</p>
          <InputComponentForm
            type="text"
            width="w-full"
            value={documento}
            onChange={(e: any) => setDocumento(e.target.value)}
          />
        </div>{" "}
        <div className="flex gap-2">
          <p>Destino:</p>
          <InputComponentForm
            type="text"
            width="w-full"
            value={destino}
            onChange={(e: any) => setDestino(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <p className="whitespace-nowrap">Realizada por:</p>
          <ComboboxBasic
            items={orgaosOficiais}
            value={realizadoPor}
            onChange={(e) => setRealizadoPor(e ?? "")}
            placeholder=""
            styles="w-full"
          />
        </div>
      </section>
    </FormDefault>
  );
}
