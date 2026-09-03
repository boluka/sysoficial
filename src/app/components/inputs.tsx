import { LockKeyholeOpen } from "lucide-react"
import { InputHTMLAttributes } from "react"

interface Props {
    name?: string,
    placeholder: string,
    label: string
    type?: string,
    autoComplete?:string,
    change: (data: { text: string, isActive: boolean }) => void;
    
}

export default function InputComponent(props: Props) {

    function manageDataInput(text: string) {
        props.change({ text: text, isActive: text.length > 0 })
    }

    return (
        <div className=" relative flex-1 flex items-center">

            <input type={props.type !== undefined ? props.type : "text"} name={props.name} id="" className="md:h-12 h-11 peer bg-cinza-escuro my-3 outline-0 indent-1 rounded-[3px] text-white border-l-2 border border-l-amarelo-claro border-[#ffffff36] p-1.5 w-full " placeholder={props.placeholder} onChange={(evt) => { manageDataInput(evt.target.value) }} autoComplete={props.autoComplete}/>

            <label className="md:peer-not-placeholder-shown:scale-85  absolute left-3 text-gray-400 font-sans text-sm pointer-events-none transition-all duration-400 origin-left opacity-0 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:opacity-100 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-amarelo-claro">{props.label}</label>
            <label className="md:text-[1em] absolute left-3 text-gray-400 font-sans text-sm pointer-events-none transition-all duration-400 origin-left peer-not-placeholder-shown:-translate-x-3 peer-not-placeholder-shown:opacity-0 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:text-amarelo-claro">{props.label}</label>
        </div>

    )
}