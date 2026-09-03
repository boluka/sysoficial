export default function TextAreaComponent({width, height, ...props}: {width:string, height: string, value:any, ref:any, setSituacao: (value: string) => void}) {
    return(
    <textarea className={`outline-0 w-${width} h-${height} border border-amarelo-escuro rounded-[5px] indent-2`} readOnly={props.value !== "Completo e sem alterações" ? false : true} value={props.value} onChange={(e) => {props.setSituacao(e.target.value)}} ref={props.ref}>

    </textarea>
    )
}