import { useState } from "react";

export type situation = "Completo e sem alterações" | "Incompleto" 

export default function TextAreaComponent({width, height, ...props}: {width:string, height: string, value?:any, ref?:any, setTextArea: (value: string) => void, readOnly?: situation} ) {
    const [focus, setFocus] = useState(false);
    
    return(
    <textarea className={`outline-0 text-sm ${width} ${height} border border-amarelo-escuro rounded-[5px] p-2 field-sizing-content focus-within:ring-1 focus-within:ring-ring focus-within:border-ring/50 transition-all duration-100`} onFocus={() => {
        setFocus(true)}} onBlur={() => {setFocus(false)}} readOnly={props.readOnly !== "Completo e sem alterações" ? false : true} onChange={(e) => {props.setTextArea(e.target.value as situation)}} value={props.value} ref={props.ref}>

    </textarea>
    )
}