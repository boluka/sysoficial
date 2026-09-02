'use client'
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Forms from '@/app/components/forms/forms'


export default function Report() {
    /**
     * Não esquecer de corrigir o uso de tokens com a biblioteca correta
     */
    const containerRef = useRef<HTMLDivElement>(null);
    const dialogTop = useRef<HTMLDialogElement>(null);
    const [nickname, setNickname] = useState('');
    const searchParams = useSearchParams();
    useEffect(() => {
        // dialogTop.current?.showModal();
        const user = searchParams.get('nome');
        if(user){
            localStorage.setItem('nome', user);
            setNickname(user);
        } else {
            const name = localStorage.getItem('nome')
            if(name){
                setNickname(name);
            }
        }
    }, [])

    const [itemActive, setItemActive] = useState('1- Recebimento')
    function moveLeft() {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= 300;
        }
    }
    function moveRight() {
        if (containerRef.current) {
            containerRef.current.scrollLeft += 300;
            console.log(containerRef.current.scrollLeft)
        }
    }

    const elementLi = ["1- Recebimento", "2- Equipe", "3- Trocas", "4- Hora extra", "05- 11 Expediente", "12- Revezamento", "13-14 Rotina Diária", "15- Entrada de Presos", "16- Saída de Presos", "17- Mudança de cela"
    ]
    return (<main className="flex flex-col gap-10 bg-linear-to-b from-cinza-maisescuro  to-cinza-escuro min-h-screen w-full">

        <nav className="flex  justify-between items-center bg-cinza-escuro p-1 gap-4">
            <div className='flex items-center min-w-75 gap-2 w-1/2'>
                <button onClick={moveLeft} className='cursor-pointer shrink-0'>
                    <ChevronLeft className='text-amarelo-claro w-8 h-8' />
                </button>
                <div ref={containerRef} className='flex overflow-x-auto scroll-smooth scrollbar-none w-full  px-2  gap-3 items-center '>

                    {elementLi.map((e) => {
                        const active = itemActive === e
                        return <div key={e} className={`${active ? 'bg-amarelo-claro text-cinza-escuro font-bold ' : 'bg-cinza-escuro text-amarelo-claro'} p-3 my-1 rounded-[5px] text-sm cursor-pointer shadow-black shadow-[1px_1px_4px] whitespace-nowrap shrink-0 `} onClick={() => setItemActive(e)}>{e}</div>
                    })}

                </div>
                <button onClick={moveRight} className='cursor-pointer shrink-0'>
                    <ChevronRight className='text-amarelo-claro w-8 h-8' />
                </button>
            </div>
            <div className="text-amarelo-claro shrink-0">Bem-vindo {nickname} !</div>
        </nav>
        <dialog ref={dialogTop} className=' w-75 h-75 bg-amarelo-claro'>Teste </dialog>
        <Forms>{itemActive}</Forms>
    </main>)
}