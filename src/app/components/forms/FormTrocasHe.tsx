import DateComponent from "../date/date";
import InputComponent from "../inputs";
import SelectComponent from "../select/Select";
import TimeComponent from "../time/TimeComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
export default function FormTrocas() {
  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Trocas de serviço
      </h2>
      <section className={`${styles["style-div"]} flex flex-col`}>
        <fieldset className="flex w-full gap-2 border border-amarelo-claro rounded-[5px] p-2">
          <legend className="text-amarelo-claro text-center">Servidores</legend>
          <div className="flex w-full">
            <p>Substituto:</p>
            <SelectComponent width="w-full" />
          </div>
          <div className="flex w-full">
            <p>Substituído:</p>
            <SelectComponent width="w-full" />
          </div>
        </fieldset>
        <fieldset className="flex w-full justify-around gap-2 border border-amarelo-claro rounded-[5px] p-2">
          <legend className="text-amarelo-claro text-center">
            Horários e Data
          </legend>
          <div className="flex gap-2">
            <p>Entrada:</p>
            <DateComponent setDate={() => {}} />
            <TimeComponent />
          </div>
          <div className="flex gap-2">
            <p>Saída:</p>
            <DateComponent setDate={() => {}} />
            <TimeComponent />
          </div>
        </fieldset>
      </section>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Hora extra
      </h2>
      <section className={`${styles['style-div']} flex justify-between `}>
            <div className="flex flex-1">
                <p className="">Servidor: </p>
                <SelectComponent width="w-full"/>
            </div>
            <div className="flex gap-2">
                <p className="">Ínicio: </p>
                <DateComponent setDate={() => {}}/>
            </div>
            <div className="flex gap-2">
                <p className="">Término: </p>
                <DateComponent setDate={() => {}}/>
            </div>
      </section>
    </FormDefault>
  );
}
