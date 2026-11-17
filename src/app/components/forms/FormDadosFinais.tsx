"use client";
import { useEffect, useState } from "react";
import InputCheckBoxForm from "../input/InputCheckBoxForm";
import InputComponentForm from "../input/InputComponentForm";
import TextAreaComponent from "../textarea/TextAreaComponent";
import FormDefault from "./FormDefault";
import styles from "./styles-forms.module.css";
import { FormDadosFinais as ObjFormDadosFinais } from "@/generated/prisma";
import { FormProps } from "@/app/interfaces/FormProps";

export default function FormDadosFinais({
  onSave,
  cacheData,
  generateData,
  readyData,
}: FormProps<ObjFormDadosFinais>) {
  const [mandadoIntimacao, setMandadoIntimacao] = useState("");
  const [cartaPrecatoria, setCartaPrecatoria] = useState("");
  const [informacoes, setInformacoes] = useState("");
  const [atividadesLaborais, setAtividadesLaborais] = useState("");
  const [documentosPertencesPresos, setDocumentosPertencesPresos] =
    useState("");
  const [repasseDocumentos, setRepasseDocumentos] = useState("");
  const [guardaExterna, setGuardaExterna] = useState("");

  useEffect(() => {
    if (generateData) {
      onSave({
        id: 0,
        mandado_intimacao: mandadoIntimacao || null,
        carta_precatoria: cartaPrecatoria || null,
        informacoes: informacoes || null,
        atividades_laborais: atividadesLaborais || null,
        documentos_presos: documentosPertencesPresos || null,
        repasse_documentos: repasseDocumentos || null,
        guarda_externa: guardaExterna || null,
        relatorioId: "",
      });
      readyData && readyData(true);
    }
  }, [generateData]);

  useEffect(() => {
    if (cacheData && cacheData.payload) {
      const {
        mandado_intimacao,
        carta_precatoria,
        informacoes,
        atividades_laborais,
        documentos_presos,
        repasse_documentos,
        guarda_externa,
      } = cacheData.payload;
      setMandadoIntimacao(mandado_intimacao || "");
      setCartaPrecatoria(carta_precatoria || "");
      setInformacoes(informacoes || "");
      setAtividadesLaborais(atividades_laborais || "");
      setDocumentosPertencesPresos(documentos_presos || "");
      setRepasseDocumentos(repasse_documentos || "");
      setGuardaExterna(guarda_externa || "");

    } else {
      setMandadoIntimacao("");
      setCartaPrecatoria("");
      setInformacoes("");
      setAtividadesLaborais("");
      setDocumentosPertencesPresos("");
      setRepasseDocumentos("");
      setGuardaExterna("");
    }
  }, [cacheData]);

  return (
    <FormDefault>
      <h2 className="text-center bg-cinza-escuro rounded-[5px] text-amarelo-claro text-[1.3em] font-bold">
        Dados Finais:
      </h2>
      <section className={`${styles["style-div"]} flex flex-col gap-3!`}>
        <div>
          <p className="text-amarelo-claro">
            Mandado de intimação de sentença:
          </p>
          <div className="flex items-center  gap-2">
            <InputComponentForm
              type="text"
              width="w-full"
              value={mandadoIntimacao}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMandadoIntimacao(e.target.value)
              }
            />
          </div>
        </div>
        <div>
          <p className="text-amarelo-claro">Carta precatória:</p>
          <div className="flex items-center  gap-2">
            <InputComponentForm
              type="text"
              width="w-full"
              value={cartaPrecatoria}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCartaPrecatoria(e.target.value)
              }
            />
          </div>
        </div>
        <div>
          <p className="text-amarelo-claro">Informações:</p>
          <div className="flex items-center  gap-2">
            <TextAreaComponent
              width="w-full"
              height="h-30"
              value={informacoes}
              setTextArea={(e: string) => setInformacoes(e)}
            />
          </div>
        </div>
        <div>
          <p className="text-amarelo-claro">Atividades laborais:</p>
          <div className="flex items-center  gap-2">
            <InputComponentForm
              type="text"
              width="w-full"
              value={atividadesLaborais}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAtividadesLaborais(e.target.value)
              }
            />
          </div>
        </div>
        <div>
          <p className="text-amarelo-claro">
            Documentos e pertences de presos:
          </p>
          <div className="flex items-center  gap-2">
            <TextAreaComponent
              width="w-full"
              height="h-15"
              value={documentosPertencesPresos}
              setTextArea={(e: string) => setDocumentosPertencesPresos(e)}
            />
          </div>
        </div>
        <div>
          <p className="text-amarelo-claro">Repasse de documentos:</p>
          <div className="flex items-center  gap-2">
            <InputComponentForm
              type="text"
              width="w-full"
              value={repasseDocumentos}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRepasseDocumentos(e.target.value)
              }
            />
          </div>
        </div>
        <div>
          <p className="text-amarelo-claro">Guarda externa:</p>
          <div className="flex items-center  gap-2">
            <InputComponentForm
              type="text"
              width="w-full"
              value={guardaExterna}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setGuardaExterna(e.target.value)
              }
            />
          </div>
        </div>
      </section>
    </FormDefault>
  );
}
