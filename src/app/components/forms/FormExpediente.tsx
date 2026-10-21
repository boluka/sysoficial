"use client";
import { useState } from "react";
import DateComponent from "../date/date";
import InputComponentForm from "../input/InputComponentForm";
import SelectComponent from "../select/Select";
import TextAreaComponent from "../textarea/TextAreaComponent";
import TimeComponent from "../time/TimeComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import { Person } from "@/generated/prisma";
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

export default function FormExpediente({
  person,
}: {
  person: Person[] | undefined;
}) {
  const [falta, setFalta] = useState<Person>({ id: 0, name: "" });
  const [verifyString, setVerifyString] = useState(true);
  const [pessoaEx, setPessoaEx] = useState<string | null>(null);
  const [pessoaExTable, setPessoaExTable] = useState<string[]>(["--", "--"]);

  const handlerInsert = (e: any) => {
    e.preventDefault();
    if (pessoaEx) {
      if (verifyString) {
       pessoaExTable.pop();
        if (!pessoaExTable.find((e) => {return e === "--";})) {
          setVerifyString(false)
        }
      }
      setPessoaExTable((prev) => [pessoaEx, ...prev]);
    }
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
          <ComboboxBasic
            items={person ?? []}
            value={pessoaEx}
            onChange={(e) => {
              setPessoaEx(e ?? null);
            }}
          />
          <button
            className="bg-amarelo-claro py-1 px-3 rounded-[5px] text-sm text-black font-bold cursor-pointer hover:bg-cinza-maisescuro hover:text-amarelo-claro transition-all duration-200"
            onClick={handlerInsert}
          >
            Inserir
          </button>
          <button className="bg-amarelo-claro py-1 px-3 rounded-[5px] text-sm text-black font-bold cursor-pointer hover:bg-cinza-maisescuro hover:text-amarelo-claro transition-all duration-200">
            Deletar
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
              {
                pessoaExTable.map((e, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{e}</TableCell>
                    </TableRow>
                  );
                })
                /* <TableRow>
                <TableCell className="font-medium">Lucas</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Lucas</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Lucas</TableCell>
              </TableRow> */
              }
            </TableBody>
          </Table>
        </section>
      </section>
      <section className={`${styles["style-div"]}  flex flex-col`}>
        <div className="flex w-full gap-2 items-center justify-end">
          <p className=" text-amarelo-claro">Falta:</p>
          <SelectComponent width="w-[40%]" height="h-full" />
          <InputComponentForm type="text" width="w-[45%]" height="h-full" />
        </div>
        <div className="flex w-full items-center gap-2 justify-center">
          <p className=" text-amarelo-claro">Atraso:</p>
          <SelectComponent width="w-[45%]" height="h-full" />
          <p>De:</p>
          <TimeComponent />
          <p>Até</p>
          <TimeComponent />
        </div>
        <div className="flex w-full items-center justify-around ">
          <div className="flex w-[60%] justify-center  gap-2">
            <p className=" text-amarelo-claro">Férias:</p>
            <SelectComponent width="w-full" height="h-full" />
          </div>
          <div className="flex gap-2">
            <p>Até: </p>
            <DateComponent setDate={() => {}} />
          </div>
        </div>
        <div className="flex w-full gap-2 items-center justify-end ">
          <p className=" pl-5 text-amarelo-claro">Retorno de férias:</p>
          <SelectComponent width="grow" height="h-full" />
        </div>
        <div className="flex w-full gap-2 items-center justify-end  ">
          <p className=" pl-5 text-amarelo-claro">Atestado:</p>
          <SelectComponent width="grow" height="h-full" />
          <p>De:</p>
          <InputComponentForm type="number" width="w-[10%]" height="h-full" />
          <p>dias.</p>
        </div>
        <div className="flex w-full gap-2 items-center justify-end ">
          <p className=" pl-5 text-amarelo-claro">Retorno de atestado:</p>
          <SelectComponent width="grow" height="h-full" />
        </div>
      </section>
    </FormDefault>
  );
}
