import DateComponent from "../date/date";
import InputComponentForm from "../input/InputComponentForm";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css"

export default function FormAssinatura(){
    return (<FormDefault>
        <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Assinatura:
      </h2>
      <section className={`${styles["style-div"]} flex flex-col gap-5! `}>
            <fieldset className="flex flex-col border gap-3 border-amarelo-claro rounded-[5px] p-2">
                <legend className="text-amarelo-claro text-center">Quem Entrega:</legend>
                <div className="flex gap-2">
                    <p>Nome:</p>
                    <InputComponentForm type="text" width="w-full" />
                </div>
                <div className="flex gap-2">
                    <p className="whitespace-nowrap">Data:</p>
                    <DateComponent setDate={() => {}} />
                    <p>Matrícula:</p>
                    <InputComponentForm type="text" width="w-full"/>
                </div>
            </fieldset>
            <fieldset className="flex flex-col border gap-3 border-amarelo-claro rounded-[5px] p-2">
                <legend className="text-amarelo-claro text-center">Quem Recebe:</legend>
                <div className="flex gap-2">
                    <p>Nome:</p>
                    <InputComponentForm type="text" width="w-full" />
                </div>
                <div className="flex gap-2">
                    <p className="whitespace-nowrap">Data:</p>
                    <DateComponent setDate={() => {}} />
                    <p>Matrícula:</p>
                    <InputComponentForm type="text" width="w-full"/>
                </div>
            </fieldset>
      </section>
    </FormDefault>)
}