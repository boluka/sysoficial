"use client";

import { useState } from "react";
import DateComponent from "../date/date";

export default function Forms({ children }: { children: string }) {
  const [date, setDate] = useState("00-00-0000");
  return (
    <form
      action=""
      className="flex flex-col gap-3  text-white bg-[#b9b9b9] min-w-120 w-1/2 max-w-180 mb-10 h-180 rounded-2xl self-center p-5"
    >
      <h2 className="text-center text-black font-bold mb-2">{children}</h2>
      <div className="flex justify-center gap-10 bg-cinza-escuro p-2 rounded-[5px]">
        <p>Relatório das ocorrências no dia: </p>
        <DateComponent setDate={setDate} />
      </div>
      <div className="flex justify-around gap-2 bg-cinza-escuro p-2 rounded-[5px]">
        <div className="flex gap-2">
          <p>Do dia:</p>
          <DateComponent setDate={setDate} />
        </div>
        <div className="flex gap-2">
          <p>Para o dia:</p>
          <DateComponent setDate={setDate} />
        </div>
      </div>
    </form>
  );
}
