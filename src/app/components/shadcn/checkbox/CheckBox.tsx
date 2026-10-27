import { Checkbox } from "@/components/ui/checkbox"


export default function CheckBox({value, onChange}:{value: boolean, onChange: (b: boolean) => void}) {

  return <Checkbox checked={value} onCheckedChange={onChange} className={`cursor-pointer text-amarelo-claro!`}/>
}