import InputCheckBoxForm from "../input/InputCheckBoxForm";
import InputComponentForm from "../input/InputComponentForm";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";

export default function FormInclusaoRetorno() {
  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Inclusão, retorno e exclusão de presos em trânsito
      </h2>
      <section
        className={`${styles["style-div"]} flex flex-col  text-amarelo-claro`}
      >
        <div className="flex items-center gap-2">
          <p className="whitespace-nowrap">Inclusão: </p>
          <InputComponentForm type="text" width="w-full" />
          <InputCheckBoxForm />
          <p className="text-sm">N/C</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="whitespace-nowrap">Retorno: </p>
          <InputComponentForm type="text" width="w-full" />
          <InputCheckBoxForm />
          <p className="text-sm">N/C</p>
        </div>
        <div className="flex items-center gap-2 ">
          <p className="whitespace-nowrap">Exclusão: </p>
          <InputComponentForm type="text" width="w-full" />
          <InputCheckBoxForm />
          <p className="text-sm">N/C</p>
        </div>
      </section>
    </FormDefault>
  );
}
