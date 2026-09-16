import InputCheckBoxForm from "../input/InputCheckBoxForm";
import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";

export default function FormSigo() {
  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Dados adicionais do SIGO:
      </h2>
      <section className={`${styles["style-div"]} `}>
        <div>
          <p className="text-amarelo-claro">SIGO:</p>
          <div className="flex items-center  gap-2">
              <TextAreaComponent width="w-full" height="h-15" />
              <InputCheckBoxForm/>
              <p className="text-sm">N/C</p>
          </div>
        </div>
        <div>
          <p className="text-amarelo-claro">Prisão Domiciliar:</p>
          <div className="flex items-center  gap-2">
              <TextAreaComponent width="w-full" height="h-15" />
              <InputCheckBoxForm/>
              <p className="text-sm">N/C</p>
          </div>
        </div>
        <div>
          <p className="text-amarelo-claro">Vistoria em cela:</p>
          <div className="flex items-center  gap-2">
              <TextAreaComponent width="w-full" height="h-15" />
              <InputCheckBoxForm/>
              <p className="text-sm">N/C</p>
          </div>
        </div>
        <div>
          <p className="text-amarelo-claro">Comunicados:</p>
          <div className="flex items-center  gap-2">
              <TextAreaComponent width="w-full" height="h-15" />
              <InputCheckBoxForm/>
              <p className="text-sm">N/C</p>
          </div>
        </div>
      </section>
    </FormDefault>
  );
}
