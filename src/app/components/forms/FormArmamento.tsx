import { useEffect, useRef } from "react";
import InputComponentForm from "../input/InputComponentForm";
import SelectComponent from "../select/Select";
import styles from "./styles-forms.module.css";
import { X } from "lucide-react";

export default function FormArmamento(props: any) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    props.state(true)
  }, []);
  return (
    <dialog
      ref={ref}
      className={`opacity-100 scale-100 duration-300 ease-out transition-[all,display] allow-discrete
                   starting:opacity-0 starting:scale-95
                   backdrop:bg-black/50 backdrop:transition-[all,display] backdrop:duration-600 backdrop:allow-discrete
                   backdrop:opacity-100
                   backdrop:starting:opacity-0 outline-0 rounded-2xl bg-cinza-maisclaro fixed inset-0  m-auto shadow-xl`}
    >
      
      <div className="flex flex-col gap-3 text-white bg-[#b9b9b9] min-w-120 w-180 rounded-2xl self-center shadow-[0_0_40px_#00000081] p-5 relative">
        <button className="fixed right-0 top-0 outline-0" onClick={(e) => {
          e.preventDefault();
          ref.current?.close();
          props.state(false)}}>
          <X className="bg-red-600 text-black hover:bg-red-900 hover:text-white rounded-full w-7 h-7 p-1 cursor-pointer" />
        </button>
        <div
          className={`${styles["style-div"]} flex p-4! rounded-b-2xl!  justify-between flex-row-reverse`}
        >
          <div className="flex flex-col text-sm">
            <p className="text-amarelo-claro text-base">Munição: </p>
            <InputComponentForm width="w-30" type="number" />
            <p className="text-amarelo-claro text-base mt-2">Carregadores: </p>
            <div className="text-[13px] flex flex-col gap-1">
              <p>De 15 para Pistola: </p>
              <InputComponentForm width="w-30" type="number" />
              <p>De 15 para Carabina: </p>
              <InputComponentForm width="w-30" type="number" />
              <p>De 30 para Carabina: </p>
              <InputComponentForm width="w-30" type="number" />
            </div>
          </div>
          <div
            className={`${styles["style-div"]} p-3! flex flex-col w-[75%] items-start border roudend-[5px] border-amarelo-escuro`}
          >
            <div className="flex w-full">
              <p>Armamento: </p>
              <SelectComponent width="min-w-40 w-1/2"></SelectComponent>
              <button
                className="bg-amarelo-claro py-1 px-3 rounded-[5px] text-sm text-black font-bold cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                Inserir
              </button>
            </div>
            <div className="flex w-full">
              <p>Numeração: </p>

              <SelectComponent width="min-w-40 w-1/2"></SelectComponent>
              <button
                className="bg-amarelo-claro py-1 px-3 rounded-[5px] text-sm text-black font-bold cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                Excluir
              </button>
            </div>
            <table
              className={`${styles["style-table"]} w-full text-center  border p-2 border-collapse border-spacing-3`}
            >
              <thead>
                <tr className="bg-cinza-maisescuro ">
                  <th className="border border-black text-amarelo-claro p-2 w-[35%]">
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
            </table>
          </div>
        </div>
      </div>
    </dialog>
  );
}
