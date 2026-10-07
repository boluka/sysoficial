export type situation = "Completo e sem alterações" | "Incompleto" 

export default function TextAreaComponent({width, height, ...props}: {width:string, height: string, value?:any, ref?:any, setTextArea: (value: string) => void, readOnly?: situation} ) {
    return(
    <textarea className={`outline-0 text-sm ${width} ${height} border border-amarelo-escuro rounded-[5px] p-2 field-sizing-content`} readOnly={props.readOnly !== "Completo e sem alterações" ? false : true} onChange={(e) => {props.setTextArea(e.target.value as situation)}} value={props.value} ref={props.ref}>

    </textarea>
    )
}