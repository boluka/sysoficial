import SelectComponent from "../select/Select";
import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
export default function FormEquipe() {
  return (
    <FormDefault>
      <h1 className="text-center bg-cinza-escuro rounded-[5px] text-[1.3em] font-bold text-amarelo-claro">
        Equipe Plantonista
      </h1>
      <div className="flex gap-2">
        <section
          className={`${styles["style-div"]} flex flex-col gap-4! w-full`}
        >
          <fieldset className="flex flex-col gap-2 border border-amarelo-claro rounded-[5px] py-2">
            <legend className="text-amarelo-claro text-center">
              Oficial do Dia:{" "}
            </legend>
            <div className="flex items-center justify-end">
              <p className="text-sm">Chefe de Equipe: </p>
              <SelectComponent width="w-[50%]" />
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm">Aux. Chefe-Equipe: </p>
              <SelectComponent width="w-[50%]" />
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-2 border border-amarelo-claro rounded-[5px] py-2">
            <legend className="text-amarelo-claro text-center">
              Portaria:{" "}
            </legend>
            <div className="flex items-center justify-end">
              <p className="text-sm">Portaria Principal: </p>
              <SelectComponent width="w-[50%]" />
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm">Auxiliar Portaria 1:</p>
              <SelectComponent width="w-[50%]" />
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm">Auxiliar Portaria 2:</p>
              <SelectComponent width="w-[50%]" />
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-2 border border-amarelo-claro rounded-[5px] py-2">
            <legend className="text-amarelo-claro text-center">
              Trabalhos:
            </legend>
            <div className="flex items-center justify-end">
              <p className="text-sm">Passarela Principal:</p>
              <SelectComponent width="w-[50%]" />
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm">Escola Padaria:</p>
              <SelectComponent width="w-[50%]" />
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm">Trabalho/Crina</p>
              <SelectComponent width="w-[50%]" />
            </div>
          </fieldset>
        </section>
        <section className={`${styles["style-div"]} flex flex-col w-full`}>
          <fieldset className="flex flex-col gap-3 border border-amarelo-claro rounded-[5px] py-2">
            <legend className="text-amarelo-claro text-center">
              Pavilhão 1:
            </legend>
            <div className="flex items-center justify-end">
              <p className="text-sm">Responsável PV1:</p>
              <SelectComponent width="w-[50%]" />
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm">Corredor PV1:</p>
              <SelectComponent width="w-[50%]" />
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm">Corredor PV1:</p>
              <SelectComponent width="w-[50%]" />
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm">Corredor PV1:</p>
              <SelectComponent width="w-[50%]" />
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm">Corredor PV1:</p>
              <SelectComponent width="w-[50%]" />
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-3 border border-amarelo-claro rounded-[5px] py-2">
            <legend className="text-amarelo-claro text-center">
              Pavilhão 2:
            </legend>
            <div className="flex items-center justify-end">
              <p className="text-sm">Responsável PV2:</p>
              <SelectComponent width="w-[50%]" />
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm">Corredor PV2:</p>
              <SelectComponent width="w-[50%]" />
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm">Corredor PV2:</p>
              <SelectComponent width="w-[50%]" />
            </div>
            <div className="flex items-center justify-end">
              <p className="text-sm">Corredor PV2:</p>
              <SelectComponent width="w-[50%]" />
            </div>
          </fieldset>
        </section>
      </div>
      <div className={`${styles["style-div"]}`}>
        <p className="text-amarelo-claro mb-1">Demais auxiliares:</p>
        <TextAreaComponent width="w-full" height="h-10"/>
      </div>
    </FormDefault>
  );
}
