export default function DialogSave({ ref }: {ref?: React.Ref<HTMLDialogElement>}) {
    return <dialog ref={ref} className="backdrop:opacity-50 backdrop:bg-black backdrop:starting:opacity-0 backdrop:transition-all inset-0 m-auto rounded-[5px] border border-amarelo-claro starting:opacity-0 transition-all duration-300  ">
            <p className="bg-cinza-maisescuro text-amarelo-claro shadow-[0_1px_5px_black]  p-8 rounded-[5px] text-[1.3em] ">Dados salvo com sucesso!</p>
    </dialog>
}