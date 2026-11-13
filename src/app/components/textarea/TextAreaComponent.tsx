import { useState } from "react";

export type situation = "Completo e sem alterações" | "Incompleto" 

export default function TextAreaComponent({width, height, ...props}: {width:string, height: string, value?:any, ref?:any, setTextArea: (value: string) => void, readOnly?: situation} ) {
    const [focus, setFocus] = useState(false);
    
    return(
    <textarea className={`outline-0 text-sm ${width} ${height} border border-amarelo-escuro rounded-[5px] p-2 field-sizing-content focus:border-2 focus:border-blue-500 focus:shadow-[0px_0px_4px] focus:shadow-blue-400 transition-all duration-75`} onFocus={() => {
        setFocus(true)}} onBlur={() => {setFocus(false)}} readOnly={props.readOnly !== "Completo e sem alterações" ? false : true} onChange={(e) => {props.setTextArea(e.target.value as situation)}} value={props.value} ref={props.ref}>

    </textarea>
    )
}