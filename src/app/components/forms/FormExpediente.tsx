import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";

export default function FormExpediente() {
  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Expediente:
      </h2>
     <section className={`${styles['style-div']}`}>
        <TextAreaComponent width="w-full" height="h-auto" />
     </section> 
    </FormDefault>
  );
}
