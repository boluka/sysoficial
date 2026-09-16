import InputComponentForm from "../input/InputComponentForm";
import SelectComponent from "../select/Select";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";

export default function FormEscoltaPreso() {
  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Escolta de Presos:
      </h2>
      <section
        className={`${styles["style-div"]} flex flex-col gap-2 text-amarelo-claro`}
      >
        <div className="flex gap-2">
          <p>Nome:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
        <div className="flex gap-2">
          <p>Documento:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
        <div className="flex gap-2">
          <p>Destino:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
        <div className="flex gap-2">
          <p className="whitespace-nowrap">Realizada por:</p>
          <SelectComponent width="w-full" />
        </div>
      </section>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Escoltas não realizadas:
      </h2>
            <section
        className={`${styles["style-div"]} flex flex-col gap-2 text-amarelo-claro`}
      >
        <div className="flex gap-2">
          <p>Nome:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
        <div className="flex gap-2">
          <p>Documento:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
      </section>
    </FormDefault>
  );
}
