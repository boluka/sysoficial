"use client"
import Image from "next/image";
import logoAgepen from "../../public/logoagepen.png"
import InputDeDados from "./components/inputs";
import {UserRound, LockKeyholeOpen} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [userActive, setUserActive] = useState({text: "", isActive: false});
  const [passActive, setPassActive] = useState({text: "", isActive: false});

  return (<form className=" bg-cinza-maisescuro w-100 h-auto pb-7 flex flex-col  items-center gap-2 border border-[#494949da] rounded-[5px]
  transition-all duration-300 shadow-2xl md:w-120 md:h-100">
    <section className="flex flex-col items-center w-[85%] ">
        
        <Image
          src={logoAgepen}
          alt="Logotipo Oficial AGEPEN"
          width={90}
          priority
          className="h-auto"
        />
      
      <h1 className="text-amarelo-escuro text-[1.2em] font-bold">Bem-vindo(a) ao SysOficial</h1>
      <h2 className="text-white text-[0.75em] font-extralight ">Sistema integrado do oficial do dia</h2>
    </section>

    <section className="w-[85%]">
      <div className="flex items-center gap-2 ">
        <UserRound className={`w-7 h-7  transition-colors duration-500 ${userActive.isActive ? 'text-amarelo-claro' : 'text-[#4e4e4e]'}`}  />
        <InputDeDados label="Usuário:" placeholder=" " change={setUserActive} />
      </div>
      <div className="flex items-center gap-2">
        <LockKeyholeOpen className={`w-7 h-7  transition-colors duration-500 ${passActive.isActive ? 'text-amarelo-claro' : 'text-[#4e4e4e]'}`}/>
        <InputDeDados label="Senha:" placeholder=" " type="password" change={setPassActive} />
      </div>
      <button type="submit" className="bg-amarelo-claro p-2 w-full cursor-pointer rounded-[5px] mt-2   font-bold hover:bg-amarelo-escuro">Login</button>
    </section>

  </form>)
}
