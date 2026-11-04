import { SetStateAction } from "react";

export function useSaveData(setGenerateDataForm: (value: SetStateAction<boolean>) => void, setFormDataReady: (value: SetStateAction<boolean>) => void, dateCalendar: Date | undefined, dialogSave: any) {

    return async function postData<T>(obj: T, API: string, ) {
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
              dialogSave.current?.showModal();
              setTimeout(() => {
                dialogSave.current?.close();
              }, 2000);
            }
          });
        } catch (error) {
          console.log(error);
        } finally {
          setGenerateDataForm(false);
          setFormDataReady(false);
        }
    }
    
}