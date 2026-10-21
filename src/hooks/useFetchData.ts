"use client";
import { dialogMsg } from "@/app/components/dialog/DialogInfo";
import fetchData from "@/app/relatorio/services";
import { SucessAuth } from "@/app/types/auth";
import { Dispatch, SetStateAction, useRef, useState } from "react";

const formatToISODate = (date: Date): string =>
  date.toISOString().split("T")[0];

export function useFetchData(dialog: {showDialogAnimation: boolean, setShowDialogAnimation:(b: boolean) => void , setDialogInfoMsg: (dialog: dialogMsg) => void, }) {
    const {showDialogAnimation, setShowDialogAnimation, setDialogInfoMsg} = dialog;

  const timeout = useRef<NodeJS.Timeout | null>(null);
  const prepareDialog = (dialogElement: HTMLDialogElement | null) => {
    //Verificação se na navegação do sistema, o dialog está aberto para fecha-lo;
    if (showDialogAnimation) {
      if (dialogElement && timeout.current) {
        clearTimeout(timeout.current);
        setShowDialogAnimation(false);
        dialogElement.close();
      }
    }
    setDialogInfoMsg("Buscando dados de hoje...");
    if (dialogElement && !dialogElement.open) {
        dialogElement.show();
    }
    setShowDialogAnimation(true);
  };

  const handleSucess = (response: any, itemActive: any) => {
    setDialogInfoMsg("Dados encontrados com sucesso!");
    itemActive.cache(response);
  };
  const handleError = (err: string, itemActive: any) => {
    setDialogInfoMsg(err as dialogMsg);
    itemActive.cache(null);
  };

  const scheduleDialogClose = () => {
    timeout.current = setTimeout(() => {
      setShowDialogAnimation(false);
    }, 2000);
  };

  async function showMsgFetchData(
    date: Date,
    itemActive: {aba: string,
    API: string,
    obj: {},
    cache: Dispatch<SetStateAction<SucessAuth<any> | null>>},
    dialogElement: HTMLDialogElement | null,
    dateCurrent: React.RefObject<string | null>,
  ) {
    prepareDialog(dialogElement);
    const formatDate = formatToISODate(date);

    fetchData(formatDate, itemActive.API)
      .then((response) => {
        if (response?.sucess) {
          handleSucess(response, itemActive);
          dateCurrent.current = date.toLocaleString('pt-BR').split(',')[0];
        } else {
          handleError(
            response?.error ??
              ("Erro ao buscar o relatório do dia" as dialogMsg),
            itemActive,
          );
          dateCurrent.current = null;
        }
      })
      .catch((err) => {handleError(err.mensage || "Erro de conexão com o servidor", itemActive)
        dateCurrent.current = null;
      })
      .finally(() => {
        scheduleDialogClose();
      });
  }
  return showMsgFetchData;
}
