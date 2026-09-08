import InputComponentForm from "../input/InputComponentForm";
import SelectComponent from "../select/Select";
import styles from "./styles-forms.module.css";

export default function FormArmamento() {
    return ( <form>

        <div
        className={`${styles["style-div"]} flex p-4! rounded-b-2xl!  justify-between flex-row-reverse`}
      >
        <div className="flex flex-col text-sm">
          <p className="text-amarelo-claro text-base">Munição: </p>
          <InputComponentForm width="w-30" type="number" />
          <p className="text-amarelo-claro text-base mt-2">Carregadores: </p>
          <div className="text-[13px] flex flex-col gap-1">
            <p>De 15 para Pistola: </p>
            <InputComponentForm width="w-30" type="number" />
            <p>De 15 para Carabina: </p>
            <InputComponentForm width="w-30" type="number" />
            <p>De 30 para Carabina: </p>
            <InputComponentForm width="w-30" type="number" />
          </div>
        </div>
        <div
          className={`${styles["style-div"]} p-3! flex flex-col w-[75%] items-start border roudend-[5px] border-amarelo-escuro`}
        >
          <div className="flex w-full">
            <p>Armamento: </p>
            <SelectComponent width="min-w-40 w-1/2"></SelectComponent>
            <button
              className="bg-amarelo-claro py-1 px-3 rounded-[5px] text-sm text-black font-bold cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              Inserir
            </button>
          </div>
          <div className="flex w-full">
            <p>Numeração: </p>
            <SelectComponent width="min-w-40 w-1/2"></SelectComponent>
          </div>
          <table>
            <thead>
              <tr>
                <th>Arma</th>
                <th>Numeração</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Valor1</td>
                <td>Valor2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>)
}