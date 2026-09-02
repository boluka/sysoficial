import { Calendar } from "lucide-react"
export default function DateComponent({setDate}: {setDate: (e:string) => void}){
    return (<div className="flex relative border-[#919191] border p-0.5 rounded-[5px]">
                <input className="text-amarelo-claro text-sm [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:cursor-pointer w-fit outline-0 hover:text-amarelo-escuro" placeholder="" type="date" name="" id="" onChange={(e) => {setDate(e.target.value)}} />
                <Calendar className="w-4 absolute pointer-events-none right-0 bottom-0 text-amarelo-claro" />
            </div>)

}