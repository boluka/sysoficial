"use client";
import { useEffect, useState } from "react";
import InputComponentForm from "../input/InputComponentForm";
import SelectComponent from "../select/Select";
import styles from "./styles-forms.module.css";
import FormDefault from "./FormDefault";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ObjArmamento } from "@/app/types/form";
import { SucessAuth } from "@/app/types/auth";
import { fetchGuns } from "@/app/inicio/services";
import { FormProps } from "@/app/interfaces/FormProps";
import { FormArmamento as ObjFormArmamento } from "@/generated/prisma";

export default function FormArmamento({
  onSave,
  cacheData,
  readyData,
  generateData,
}: FormProps<ObjFormArmamento>) {
  const [qtMunicao, setQtMunicao] = useState("");
  const [qtCarregadoresPist, setQtCarregadoresPist] = useState("");
  const [qtCarregadoresCarabina, setQtCarregadoresCarabina] = useState({
    qtCarabinaQuinze: "",
    qtCarabinaTrinta: "",
  });
  const [selectGuns, setSelectGuns] = useState("");
  const [selectNumeration, setSelectNumeration] = useState("");
  const [guns, setGuns] = useState<ObjArmamento[]>([]);
  const [numeration, setNumeration] = useState<ObjArmamento[]>([]);
  const [manyGuns, setManyGuns] = useState<ObjArmamento[]>([]);
  const [itemSelect, setItemSelect] = useState<ObjArmamento>();
  const [id, setId] = useState(0);

  useEffect(() => {
    if (generateData) {
      onSave({
        id: 0,
        armamento: JSON.stringify(manyGuns),
        qtPistola: parseInt(qtCarregadoresPist) || 0,
        qtCarabinaQuinze:
          parseInt(qtCarregadoresCarabina.qtCarabinaQuinze) || 0,
        qtCarabinaTrinta:
          parseInt(qtCarregadoresCarabina.qtCarabinaTrinta) || 0,
        municao: parseInt(qtMunicao) || 0,
        relatorioId: "",
      });
      readyData && readyData(true);
    }
  }, [generateData]);

  const filterGuns = () => {
    setNumeration(
      guns.filter((e) => {
        return e.tipo == selectGuns;
      }),
    );
  };

  const handlerInsert = (e: any) => {
    e.preventDefault();
    setId(id + 1);
    setManyGuns((prev) => [
      ...prev,
      { id: id, tipo: selectGuns, num: selectNumeration },
    ]);
  };

  useEffect(() => {
    console.log(manyGuns);
  }, [manyGuns]);

  const handlerDelete = (e: any) => {
    e.preventDefault();
    if (itemSelect) {
      setManyGuns(
        manyGuns.filter((e) => {
          return e.id != itemSelect.id;
        }),
      );
      setItemSelect(undefined);
    }
  };

  useEffect(() => {
    if (cacheData && cacheData.sucess) {
      const {
        municao,
        qtPistola,
        qtCarabinaQuinze,
        qtCarabinaTrinta,
        armamento,
      } = cacheData.payload as ObjFormArmamento;
      setQtCarregadoresCarabina({
        qtCarabinaTrinta: qtCarabinaTrinta.toString(),
        qtCarabinaQuinze: qtCarabinaQuinze.toString(),
      });
      setQtMunicao(municao.toString());
      setQtCarregadoresPist(qtPistola.toString());

      let i = id;
      if (armamento) {
        let valorsArm = JSON.parse(armamento.toString());
        valorsArm = valorsArm.map((e: any) => {
          e.id = i++;
          return e;
        });
        setId(i);
        setManyGuns(valorsArm);
      }
    } else {
      setQtCarregadoresCarabina({
        qtCarabinaTrinta: "0",
        qtCarabinaQuinze: "0",
      });
      setQtMunicao("0");
      setQtCarregadoresPist("0");
      // //Lógica para incluir linhas vazias na tabela

      // let v = [];
      // for (let i = 1; i <= 6; i++) {
      //   v.push({ id: -1, num: "-", calibre: "-", tipo: "-" } as ObjArmamento);
      // }
      setManyGuns([]);
    }
  }, [cacheData]);

  useEffect(() => {
    if (numeration.length > 0) setSelectNumeration(numeration[0].num);
  }, [numeration]);

  useEffect(() => {
    filterGuns();
  }, [selectGuns]);

  const tiposDeArmamentoUnicos = Array.from(
    new Set(guns.map((e) => e.tipo.trim().toUpperCase())),
  );
  useEffect(() => {
    if (tiposDeArmamentoUnicos.length > 0 && !selectGuns) {
      setSelectGuns(tiposDeArmamentoUnicos[0]);
    }
  }, [guns]);

  useEffect(() => {
    (async () => {
      const data = await fetchGuns();
      data && setGuns(data);
    })();
  }, []);

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro text-amarelo-claro text-[1.3em] font-bold rounded-[5px]">
        Armamento
      </h2>
      <div
        className={`${styles["style-div"]} flex p-4! rounded-b-2xl! max-h-100 justify-between flex-row-reverse`}
      >
        <div className="flex flex-col text-sm">
          <p className="text-amarelo-claro text-base">Munição: </p>
          <InputComponentForm
            width="w-30"
            type="number"
            value={qtMunicao}
            onChange={(e: any) => {
              setQtMunicao(e.target.value);
            }}
          />
          <p className="text-amarelo-claro text-base mt-2">Carregadores: </p>
          <div className="text-[13px] flex flex-col gap-1">
            <p>De 15 para Pistola: </p>
            <InputComponentForm
              width="w-30"
              type="number"
              value={qtCarregadoresPist}
              onChange={(e: any) => {
                setQtCarregadoresPist(e.target.value);
              }}
            />
            <p>De 15 para Carabina: </p>
            <InputComponentForm
              width="w-30"
              type="number"
              value={qtCarregadoresCarabina.qtCarabinaQuinze}
              onChange={(e: any) => {
                setQtCarregadoresCarabina((prev) => ({
                  ...prev,
                  qtCarabinaQuinze: e.target.value,
                }));
              }}
            />
            <p>De 30 para Carabina: </p>
            <InputComponentForm
              width="w-30"
              type="number"
              value={qtCarregadoresCarabina.qtCarabinaTrinta}
              onChange={(e: any) => {
                setQtCarregadoresCarabina((prev) => ({
                  ...prev,
                  qtCarabinaTrinta: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div
          className={`${styles["style-div"]} p-3! flex flex-col w-[75%] items-start border roudend-[5px] border-amarelo-escuro`}
        >
          <div className="flex w-full gap-2">
            <p>Armamento: </p>
            <SelectComponent
              width="min-w-40 w-1/2"
              value={selectGuns}
              onChange={(e: any) => {
                setSelectGuns(e.target.value);
              }}
            >
              {tiposDeArmamentoUnicos.map((e) => {
                return (
                  <option
                    key={e}
                    value={e}
                    className="bg-cinza-escuro text-amarelo-claro"
                  >
                    {e}
                  </option>
                );
              })}
            </SelectComponent>
            <button
              className="bg-amarelo-claro py-1 px-3 rounded-[5px] text-sm text-black font-bold cursor-pointer hover:bg-cinza-maisescuro hover:text-amarelo-claro"
              onClick={handlerInsert}
            >
              Inserir
            </button>
          </div>
          <div className="flex w-full gap-2">
            <p>Numeração: </p>
            <SelectComponent
              width="min-w-40 w-1/2"
              value={selectNumeration}
              onChange={(e: any) => {
                setSelectNumeration(e.target.value);
              }}
            >
              {numeration.map((e) => {
                return (
                  <option
                    key={e.num}
                    value={e.num}
                    className="bg-cinza-escuro text-amarelo-claro"
                  >
                    {e.num}
                  </option>
                );
              })}
            </SelectComponent>
            <button
              className="bg-amarelo-claro py-1 px-3 rounded-[5px] text-sm text-black font-bold cursor-pointer hover:bg-cinza-maisescuro hover:text-amarelo-claro"
              onClick={handlerDelete}
            >
              Excluir
            </button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="">
                <TableHead className="w-1/2 text-amarelo-claro">
                  Armamento
                </TableHead>
                <TableHead className="w-1/2 text-amarelo-claro">
                  Numeração
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {manyGuns.map((e, i) => {
                return (
                  <TableRow
                    key={i}
                    onClick={() => {
                      setItemSelect({ id: e.id, tipo: e.tipo, num: e.num });
                    }}
                    className={`${e.id === itemSelect?.id && "bg-cinza-maisclaro"}`}
                  >
                    <TableCell className="font-medium cursor-pointer">
                      {e.tipo}
                    </TableCell>
                    <TableCell className="cursor-pointer">{e.num}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </FormDefault>
  );
}
