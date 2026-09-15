import InputComponentForm from "../input/InputComponentForm";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";

export default function FormEntradaPresos() {
  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Entrada de Presos:
      </h2>
      <section className={`${styles["style-div"]} flex flex-col gap-2 text-amarelo-claro`}>
        <div className="flex">
          <p>Nome:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
         <div className="flex">
          <p>Documento:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
         <div className="flex">
          <p>Procedência:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
        <div className="flex">
          <p>Autorizado:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
      </section>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Saída de Presos:</h2>
        <section className={`${styles["style-div"]} flex flex-col gap-2 text-amarelo-claro`}>
        <div className="flex">
          <p>Nome:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
         <div className="flex">
          <p>Documento:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
         <div className="flex">
          <p>Destino:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
        <div className="flex">
          <p>Autorizado:</p>
          <InputComponentForm type="text" width="w-full" />
        </div>
      </section>
    </FormDefault>
  );
}
