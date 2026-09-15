import InputComponentForm from "../input/InputComponentForm";
import SelectComponent from "../select/Select";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";

export default function FormRevezamento() {
  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Revezamento Noturno:
      </h2>
      <section
        className={`${styles["style-div"]}   grid grid-cols-2 grid-rows-2`}
      >
        <fieldset className="flex flex-col gap-3 border border-amarelo-claro rounded-[5px] p-2">
          <legend className=" text-amarelo-claro text-center">1º TURNO:</legend>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Horário:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão I:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão II:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Monitoramento:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Ronda:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex flex-row-reverse justify-end items-center">
            <p className=" text-[0.8em] text-amarelo-claro">Ronda alternada com monitoramento.</p>
            <InputComponentForm type="checkbox"/>
          </div>
        </fieldset>
        <fieldset className="flex flex-col row-start-2 gap-3 border border-amarelo-claro rounded-[5px] p-2">
          <legend className=" text-amarelo-claro text-center">2º TURNO:</legend>
         <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Horário:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão I:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão II:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Monitoramento:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Ronda:</p>
            <SelectComponent width="w-full" />
          </div>
         <div className="flex flex-row-reverse justify-end items-center">
            <p className=" text-[0.8em] text-amarelo-claro">Ronda alternada com monitoramento.</p>
            <InputComponentForm type="checkbox"/>
          </div>
        </fieldset>
        <fieldset className="flex flex-col  gap-3 border border-amarelo-claro rounded-[5px] p-2">
          <legend className=" text-amarelo-claro text-center">3º TURNO:</legend>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Horário:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão I:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão II:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Monitoramento:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Ronda:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex flex-row-reverse justify-end items-center">
            <p className=" text-[0.8em] text-amarelo-claro">Ronda alternada com monitoramento.</p>
            <InputComponentForm type="checkbox"/>
          </div>
        </fieldset>
        <fieldset className="flex flex-col row-start-2 gap-3 border border-amarelo-claro rounded-[5px] p-2">
          <legend className=" text-amarelo-claro text-center">4º TURNO:</legend>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Horário:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão I:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Pavilhão II:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Monitoramento:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="whitespace-nowrap">Ronda:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex flex-row-reverse justify-end items-center">
            <p className=" text-[0.8em] text-amarelo-claro">Ronda alternada com monitoramento.</p>
            <InputComponentForm type="checkbox"/>
          </div>
        </fieldset>
      </section>
    </FormDefault>
  );
}
