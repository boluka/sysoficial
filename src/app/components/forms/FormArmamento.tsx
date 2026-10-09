"use client";
import { useEffect, useRef, useState } from "react";
import InputComponentForm from "../input/InputComponentForm";
import SelectComponent from "../select/Select";
import styles from "./styles-forms.module.css";
import FormDefault from "./FormDefault";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ObjArmamento, ObjFormArmamento } from "@/app/types/form";

export default function FormArmamento({
  onSave,
}: {
  onSave: (param: ObjFormArmamento) => void;
}) {

  

  const [qtMunicao, setQtMunicao] = useState(0);
  const [qtCarregadoresPist, setQtCarregadoresPist] = useState(0);
  const [qtCarregadoresCarabina, setQtCarregadoresCarabina] = useState({qtCarabinaQuinze: 0, qtCarabinaTrinta: 0});
  const [selectGuns, setSelectGuns] = useState("");
  const [selectNumeration, setSelectNumeration] = useState("");
  const [guns, setGuns] = useState<ObjArmamento[]>([]);
  const [numeration, setNumeration] = useState<ObjArmamento[]>([]);
  const [data, setData] = useState<ObjArmamento[]>([]);
  const [itemSelect, setItemSelect] = useState<ObjArmamento>();
  const [id, setId] = useState(0);
  

  onSave({
    armamento: JSON.stringify(data),
    qtPistola: qtCarregadoresPist,
    qtCarabinaQuinze: qtCarregadoresCarabina.qtCarabinaQuinze,
    qtCarabinaTrinta: qtCarregadoresCarabina.qtCarabinaTrinta,
    municao: qtMunicao
  })

  const fetchGuns = async () => {
    try {
      fetch("/api/auth/armamento/")
      .then((e) => e.json())
      .then((e) => {
        if (e.sucess) {
          setGuns(e.payload);
        }
      });
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    if (numeration.length > 0) setSelectNumeration(numeration[0].num);
  }, [numeration]);

  const filterGuns = () => {
    setNumeration(
      guns.filter((e) => {
        return e.tipo == selectGuns;
      }),
    );
  };
 
  const handlerInsert = (e: any) => {
    e.preventDefault();
    setId(id + 1)
    setData((prev) => [{id: id, tipo: selectGuns, num: selectNumeration }, ...prev]);
    console.log(data)
  };

  const handlerDelete = (e:any) => {
    e.preventDefault();
      if(itemSelect){
        setData(data.filter((e) => {
            return e.id != itemSelect.id
        }))
        setItemSelect(undefined);
      }
  }

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
    fetchGuns();
  }, []);


  return (
    <FormDefault>
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
                setQtCarregadoresCarabina((prev) => ({...prev, qtCarabinaQuinze: e.target.value}));
              }}
            />
            <p>De 30 para Carabina: </p>
            <InputComponentForm
              width="w-30"
              type="number"
              value={qtCarregadoresCarabina.qtCarabinaTrinta}
              onChange={(e: any) => {
                setQtCarregadoresCarabina((prev) => ({...prev, qtCarabinaTrinta: e.target.value}));
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
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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
              {data.map((e, i) => {
                return (
                  <TableRow
                    key={i}
                    onClick={() => {
                      setItemSelect({id:e.id,  tipo: e.tipo, num: e.num })
                    
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
          {/* <table
              className={`${styles["style-table"]} w-full text-center  border p-2 border-collapse border-spacing-3`}
            >
              <thead>
                <tr className="bg-cinza ">
                  <th className="border border-black text-white p-2 w-[35%]">
                    Arma
                  </th>
                  <th className="border border-black text-amarelo-claro p-2 w-[35%]">
                    Numeração
                  </th>
                  <th className="border border-black text-amarelo-claro p-2">
                    Quantidade
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-cinza-maisclaro border border-black text-cinza-escuro">
                    Valor1
                  </td>
                  <td className="bg-cinza-maisclaro border border-black text-cinza-escuro">
                    Valor2
                  </td>
                  <td className="bg-cinza-maisclaro border border-black text-cinza-escuro">
                    Valor2
                  </td>
                </tr>
                <tr>
                  <td className="bg-white text-black border border-black">
                    Valor 3
                  </td>
                  <td className="bg-white text-black border border-black">
                    Valor 4
                  </td>
                  <td className="bg-white border border-black text-cinza-escuro">
                    Valor2
                  </td>
                </tr>
              </tbody>
            </table> */}
        </div>
      </div>
    </FormDefault>
  );
}
