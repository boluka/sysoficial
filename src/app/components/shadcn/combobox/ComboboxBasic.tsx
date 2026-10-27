"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"


export function ComboboxBasic({items, value, onChange, styles, placeholder}: {items: any[], value: string | null, onChange: (e: string | null) =>  void, styles?: string, placeholder?: string}) {
  return (
    <Combobox items={items} onValueChange={onChange} value={value} >
      <ComboboxInput className={`bg-cinza-escuro border-amarelo-escuro h-6 rounded-[5px] ${styles}`} placeholder={placeholder ?? "PP/Servidor"} />
      <ComboboxContent className='border border-cinza-maisclaro'>
        <ComboboxEmpty className='bg-cinza-escuro text-amarelo-claro '>Texto não encontrado</ComboboxEmpty>
        <ComboboxList className='bg-cinza-escuro'>
          {(item) => (
            <ComboboxItem className="bg-cinza-escuro  text-amarelo-claro" key={item.id} value={item.name}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
