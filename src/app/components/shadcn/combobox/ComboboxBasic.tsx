"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"


export function ComboboxBasic({items, value, onChange, styles}: {items: any[], value: string | null, onChange: (e: string | null) =>  void, styles?: string}) {
  return (
    <Combobox items={items} onValueChange={onChange} value={value} >
      <ComboboxInput className={`bg-cinza-escuro border-amarelo-escuro h-6 rounded-[5px] ${styles}`} placeholder="PP/Servidor" />
      <ComboboxContent className='border border-cinza-maisclaro'>
        <ComboboxEmpty className='bg-cinza-escuro text-amarelo-claro '>Pessoa não encontrada</ComboboxEmpty>
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
