'use client";';
import InputComponentForm from "../input/InputComponentForm";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import SelectComponentForm from "../select/Select";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormProps } from "@/app/interfaces/FormProps";
import { FormPedidoSeguro as ObjFormPedidoSeguro } from "@/generated/prisma";

interface Setores {
  pav: string;
  sol: string;
  cela: string;
}
interface FormMudancaCampos {
  de: Setores;
  para: Setores;
}
interface FormatoTabela {
  nome: string | null;
  de: Setores;
  para: Setores;
}
 const gerarCamposVazios = (): FormMudancaCampos => {
    return {
      de: {
        pav: "",
        sol: "",
        cela: "",
      },
      para: {
        pav: "",
        sol: "",
        cela: "",
      },
    };
  };

export default function FormPedidoSeguro({
  cacheData,
  onSave,
  readyData,
  generateData,
}: FormProps<ObjFormPedidoSeguro>) {
  
  const [nome, setNome] = useState("");
  const [tabelaDados, setTabelaDados] = useState<FormatoTabela[]>([]);
  const [linhaSelecionada, setLinhaSelecionada] = useState({});
  const [data, setData] = useState<FormMudancaCampos>(gerarCamposVazios());
  useEffect(() => {
    if (cacheData && cacheData.payload) {
      const { presos } = cacheData.payload;
      if (presos) {
        const presosParse = JSON.parse(presos.toString());
        setTabelaDados(presosParse);
      }
      setNome(nome);
    } else {
      setTabelaDados([])
      setNome("");
    }
  }, [cacheData]);

  useEffect(() => {
    if(generateData){
      onSave({
        id: 0,
        presos: JSON.stringify(tabelaDados),
        relatorioId: ""
      })
      if(readyData){
        readyData(true);
      }
    }
  }, [generateData])
 

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const [bloco, campo] = name.split(".");

    const camposRestantes = bloco as keyof FormMudancaCampos;

    setData((prev) => ({
      ...prev,
      [bloco]: {
        ...prev[camposRestantes],
        [campo]: value,
      },
    }));
  };
  const handleInsert = (e: any) => {
    e.preventDefault();
    setTabelaDados((prev) => [
      ...prev,
      {
        nome: nome,
        de: data.de,
        para: data.para,
      },
    ]);
    limparCampos();
  };
  const handleDelete = (e: any) => {
    e.preventDefault();
    if (tabelaDados.length === 0) {
      return;
    }
    setTabelaDados((prev) => {
      const arr = [...prev];
      return arr.filter((e) => {
        return e !== linhaSelecionada;
      });
    });
    setLinhaSelecionada({});
  };
  const limparCampos = () => {
    setData({
      de: {
        pav: "",
        sol: "",
        cela: "",
      },
      para: {
        pav: "",
        sol: "",
        cela: "",
      },
    });
    setNome("");
  };

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Pedido de seguro:
      </h2>

      <section className={`${styles["style-div"]} flex flex-col gap-2`}>
        <section className="flex max-h-70 border rounded-[5px] border-cinza-maisclaro w-full">
          <Table className="">
            <TableHeader className="">
              <TableRow>
                <TableHead
                  colSpan={4}
                  className="text-center text-amarelo-claro border-r"
                >
                  Origem:
                </TableHead>
                <TableHead
                  colSpan={3}
                  className="text-center text-amarelo-claro"
                >
                  Destino:
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead className=" text-amarelo-claro">Nome</TableHead>
                <TableHead className=" text-amarelo-claro text-center">
                  PAV
                </TableHead>
                <TableHead className=" text-amarelo-claro text-center">
                  SOL
                </TableHead>
                <TableHead className=" text-amarelo-claro border-r text-center">
                  CELA
                </TableHead>

                <TableHead className=" text-amarelo-claro text-center">
                  PAV
                </TableHead>
                <TableHead className=" text-amarelo-claro text-center">
                  SOL
                </TableHead>
                <TableHead className=" text-amarelo-claro text-center">
                  CELA
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tabelaDados.map((e, i) => {
                const linha = linhaSelecionada === e;
                return (
                  <TableRow
                    key={i}
                    onClick={() => setLinhaSelecionada(e)}
                    className={`${linha && "bg-cinza-maisclaro"} cursor-pointer`}
                  >
                    <TableCell>{e.nome}</TableCell>
                    <TableCell>{e.de.pav}</TableCell>
                    <TableCell>{e.de.sol}</TableCell>
                    <TableCell className="border-r">{e.de.cela}</TableCell>
                    <TableCell className="text-center">{e.para.pav}</TableCell>
                    <TableCell>{e.para.sol}</TableCell>
                    <TableCell>{e.para.cela}</TableCell>
                  </TableRow>
                );
              })}
              {/* <TableRow>
                <TableCell>Lucas Borgo Soares</TableCell>
                <TableCell>1A</TableCell>
                <TableCell>II</TableCell>
                <TableCell className="border-r">55</TableCell>
                <TableCell className="text-center">2A</TableCell>
                <TableCell>I</TableCell>
                <TableCell>35</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mateus Borgo Soares</TableCell>
                <TableCell>1A</TableCell>
                <TableCell>II</TableCell>
                <TableCell className="border-r">55</TableCell>
                <TableCell className="text-center">2A</TableCell>
                <TableCell>I</TableCell>
                <TableCell>35</TableCell>
              </TableRow> */}
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
        <div className="flex gap-1">
          <p>Nome: </p>
          <InputComponentForm
            type="text"
            width="w-full"
            onChange={(e: any) => {
              setNome(e.target.value);
            }}
            value={nome}
          />
        </div>
        <div className="flex justify-between gap-3">
          <fieldset className="flex flex-col grow gap-3 border border-amarelo-claro rounded-[5px] p-2">
            <legend className=" text-amarelo-claro text-center">De:</legend>
            <div className="flex justify-end gap-2">
              <p>PAV:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                value={data.de.pav}
                onChange={handleChange}
                name="de.pav"
              >
                <option value="" className="disabled hidden"></option>
                {["I", "II"].map((e) => {
                  return (
                    <option
                      className={`${styles["style-opt"]}`}
                      key={e}
                      value={e}
                    >
                      {e}
                    </option>
                  );
                })}
              </SelectComponentForm>
            </div>
            <div className="flex justify-end gap-2">
              <p>SOL:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                value={data.de.sol}
                onChange={handleChange}
                name="de.sol"
              >
                <option value="" className="disabled hidden"></option>
                {["1A", "2A", "3A", "1B", "2B", "3B", "DISC", "ALA G"].map(
                  (e) => {
                    return (
                      <option
                        className={`${styles["style-opt"]}`}
                        key={e}
                        value={e}
                      >
                        {e}
                      </option>
                    );
                  },
                )}
              </SelectComponentForm>
            </div>
            <div className="flex justify-end gap-2">
              <p>CELA:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                value={data.de.cela}
                onChange={handleChange}
                name="de.cela"
              >
                <option value="" className="disabled hidden"></option>
                {["1", "2", "3", "4", "5", "6"].map((e) => {
                  return (
                    <option
                      className={`${styles["style-opt"]}`}
                      key={e}
                      value={e}
                    >
                      {e}
                    </option>
                  );
                })}
              </SelectComponentForm>
            </div>
          </fieldset>
          <fieldset className="flex flex-col grow  gap-3 border border-amarelo-claro rounded-[5px] p-2">
            <legend className=" text-amarelo-claro text-center">Para:</legend>
            <div className="flex justify-end gap-2">
              <p>PAV:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                value={data.para.pav}
                onChange={handleChange}
                name="para.pav"
              >
                <option value="" className="disabled hidden"></option>
                {["I", "II"].map((e) => {
                  return (
                    <option
                      className={`${styles["style-opt"]}`}
                      key={e}
                      value={e}
                    >
                      {e}
                    </option>
                  );
                })}
              </SelectComponentForm>
            </div>
            <div className="flex justify-end gap-2">
              <p>SOL:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                value={data.para.sol}
                onChange={handleChange}
                name="para.sol"
              >
                <option value="" className="disabled hidden"></option>
                {["1A", "2A", "3A", "1B", "2B", "3B", "DISC", "ALA G"].map(
                  (e) => {
                    return (
                      <option
                        className={`${styles["style-opt"]}`}
                        key={e}
                        value={e}
                      >
                        {e}
                      </option>
                    );
                  },
                )}
              </SelectComponentForm>
            </div>
            <div className="flex justify-end gap-2">
              <p>CELA:</p>
              <SelectComponentForm
                type="text"
                width="w-[80%]"
                value={data.para.cela}
                onChange={handleChange}
                name="para.cela"
              >
                <option value="" className="disabled hidden"></option>
                {["1", "2", "3", "4", "5", "6"].map((e) => {
                  return (
                    <option
                      className={`${styles["style-opt"]}`}
                      key={e}
                      value={e}
                    >
                      {e}
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
