import { CircleCheck, CircleX, DatabaseArrowDown } from "lucide-react";

export type dialogMsg = 'Buscando dados de hoje...' | 'Formulário do dia não encontrado' |  'Erro ao buscar o relatório do dia' |'Dados encontrados com sucesso!';

const generateIcon = (msg: dialogMsg) => {
    switch (msg) {
        case 'Buscando dados de hoje...':
            return (<DatabaseArrowDown className="animate-bounce" />);
        case 'Formulário do dia não encontrado':
            return <CircleX />;
        case 'Erro ao buscar o relatório do dia':
            return <CircleX />;
        case 'Dados encontrados com sucesso!':
            return <CircleCheck />;
    }
};

export default function DialogInfo({mensagem, ref, show}: {mensagem: dialogMsg, ref?: React.Ref<HTMLDialogElement>, show?:boolean}) {
    return (
        <dialog className={`bg-cinza-maisescuro text-amarelo-claro shadow-[0_1px_5px_black] fixed top-[87%] p-6 rounded-[5px] outline-none duration-500 transition-all ${show ? 'opacity-100 left-5' : 'opacity-0 -left-10'}`} ref={ref}>
            <div className="flex gap-3 items-center justify-center">
                <p>{mensagem}</p>
                 { generateIcon(mensagem)}
            </div>
        </dialog>
    )
}