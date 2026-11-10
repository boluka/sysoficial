'use client'
import { dialogMsg } from "@/app/components/dialog/DialogInfo";
import { SetStateAction, useRef } from "react";

interface Dialog {
  showDialogAnimation: boolean;
  setShowDialogAnimation: (b: boolean) => void;
  setDialogInfoMsg: (dialog: dialogMsg) => void;
}

export function useSaveData(
  setGenerateDataForm: (value: SetStateAction<boolean>) => void,
  setFormDataReady: (value: SetStateAction<boolean>) => void,
  dateCalendar: Date | undefined,
  dialog: Dialog
) {
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
    setDialogInfoMsg("Salvando dados...");
    if (dialogElement && !dialogElement.open) {
        dialogElement.show();
    }
    setShowDialogAnimation(true);
  };
  const handleSucess = () => {
    setDialogInfoMsg("Dados salvos com sucesso!");
  };
  const handleError = () => {
    setDialogInfoMsg(  "Ocorreu um erro ao salvar");
  };
  const scheduleDialogClose = () => {
    timeout.current = setTimeout(() => {
      setShowDialogAnimation(false);
    }, 2000);
  };

      
  return async function postData<T>(obj: T, API: string, dialogElement: HTMLDialogElement | null) {
    prepareDialog(dialogElement)
    let object;
    if (obj) {
      object = {
        date: dateCalendar ?? new Date(),
        data: { ...obj },
      };
    }
    console.log(obj);
    try {
      const result = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });

      result.json().then((e) => {
        if (e.sucess) {
           handleSucess()
        } else {
           handleError();
        }
      });
    } catch (error) {
      console.log(error);
      handleError();
    } finally {
      setGenerateDataForm(false);
      setFormDataReady(false);
      scheduleDialogClose();
    }
  };
}
