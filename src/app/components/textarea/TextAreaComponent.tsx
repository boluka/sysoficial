export default function TextAreaComponent({width, height, ...props}: {width:string, height: string, value?:any, ref?:any, setSituacao?: (value: string) => void}) {
    return(
    <textarea className={`outline-0 text-sm ${width} ${height} border border-amarelo-escuro rounded-[5px] p-2 field-sizing-content`} readOnly={props.value !== "Completo e sem alterações" ? false : true} value={props.value} onChange={(e) => {if(props.setSituacao){
        props.setSituacao(e.target.value)
    }}} ref={props.ref}>

    </textarea>
    )
}