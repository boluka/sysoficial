import DateComponent from "../date/date";
import InputComponentForm from "../input/InputComponentForm";
import SelectComponent from "../select/Select";
import TextAreaComponent from "../textarea/TextAreaComponent";
import TimeComponent from "../time/TimeComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";

export default function FormExpediente() {
  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Expediente:
      </h2>
      <section className={`${styles["style-div"]} flex`}>
        <TextAreaComponent width="w-auto" height="h-30 flex-1" />
        <TextAreaComponent width="w-auto" height="h-30 flex-1" />
        <TextAreaComponent width="w-auto" height="h-30 flex-1" />
      </section>
      <section className={`${styles["style-div"]}  flex flex-col`}>
        <div className="flex w-full gap-2 items-center justify-end">
          <p className=" text-amarelo-claro">Falta:</p>
          <SelectComponent width="w-[40%]" height="h-full"/>
          <InputComponentForm type="text" width="w-[45%]" height="h-full"   />
        </div>
        <div className="flex w-full items-center gap-2 justify-center" >
          <p className=" text-amarelo-claro">Atraso:</p>
          <SelectComponent width="w-[45%]" height="h-full" />
          <p>De:</p>
          <TimeComponent />
          <p>Até</p>
          <TimeComponent />
        </div>
        <div className="flex w-full items-center justify-around " >
          <div className="flex w-[60%] justify-center  gap-2" >
            <p className=" text-amarelo-claro">Férias:</p>
            <SelectComponent width="w-full" height="h-full" />
          </div>
          <div className="flex gap-2">
            <p>Até: </p>
            <DateComponent setDate={() => {}}/>
          </div>
        </div>
        <div className="flex w-full gap-2 items-center justify-end " >
          <p className=" pl-5 text-amarelo-claro">Retorno de férias:</p>
          <SelectComponent width="grow" height="h-full" />
        </div>
         <div className="flex w-full gap-2 items-center justify-end  " >
          <p className=" pl-5 text-amarelo-claro">Atestado:</p>
          <SelectComponent width="grow" height="h-full" />
          <p>De:</p>
          <InputComponentForm type="number" width="w-[10%]" height="h-full" />
          <p>dias.</p>
        </div>
         <div className="flex w-full gap-2 items-center justify-end " >
          <p className=" pl-5 text-amarelo-claro">Retorno de atestado:</p>
          <SelectComponent width="grow" height="h-full" />
        </div>
      </section>
    </FormDefault>
  );
}
