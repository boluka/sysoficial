import InputCheckBoxForm from "../input/InputCheckBoxForm";
import InputComponentForm from "../input/InputComponentForm";
import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css"

export default function FormDadosFinanis(){
    return (<FormDefault>
        <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Dados Finais:
      </h2>
      <section className={`${styles['style-div']} flex flex-col gap-3!`}>
        <div>
                  <p className="text-amarelo-claro">Mandado de intimação de sentença:</p>
                  <div className="flex items-center  gap-2">
                      <InputComponentForm type="text" width="w-full"/>
                      <InputCheckBoxForm/>
                      <p className="text-sm">N/C</p>
                  </div>
                </div>
                <div>
                  <p className="text-amarelo-claro">Carta precatória:</p>
                  <div className="flex items-center  gap-2">
                      <InputComponentForm type="text" width="w-full"/>
                      <InputCheckBoxForm/>
                      <p className="text-sm">N/C</p>
                  </div>
                </div>
                <div>
                  <p className="text-amarelo-claro">Informações:</p>
                  <div className="flex items-center  gap-2">
                      <TextAreaComponent width="w-full" height="h-30" />
                      <InputCheckBoxForm/>
                      <p className="text-sm">N/C</p>
                  </div>
                </div>
                <div>
                  <p className="text-amarelo-claro">Atividades laborais:</p>
                  <div className="flex items-center  gap-2">
                      <InputComponentForm type="text" width="w-full"/>
                      <InputCheckBoxForm/>
                      <p className="text-sm">N/C</p>
                  </div>
                </div>
                  <div>
                  <p className="text-amarelo-claro">Documentos e pertences de presos:</p>
                  <div className="flex items-center  gap-2">
                        <TextAreaComponent width="w-full" height="h-15" />
                      <InputCheckBoxForm/>
                      <p className="text-sm">N/C</p>
                  </div>
                </div>
                <div>
                  <p className="text-amarelo-claro">Repasse de documentos:</p>
                  <div className="flex items-center  gap-2">
                      <InputComponentForm type="text" width="w-full"/>
                      <InputCheckBoxForm/>
                      <p className="text-sm">N/C</p>
                  </div>
                </div>
                 <div>
                  <p className="text-amarelo-claro">Guarda externa:</p>
                  <div className="flex items-center  gap-2">
                      <InputComponentForm type="text" width="w-full"/>
                      <InputCheckBoxForm/>
                      <p className="text-sm">N/C</p>
                  </div>
                </div>
      </section>
    </FormDefault>)
}