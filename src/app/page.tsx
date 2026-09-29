"use client"
import Image from "next/image";
import logoAgepen from "../../public/logoagepen.png"
import InputDeDados from "./components/inputs";
import {UserRound, LockKeyholeOpen} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ErrorLogin from "./components/error/ErrorLogin";

export default function Home() {
  const [userActive, setUserActive] = useState({text: "", isActive: false});
  const [passActive, setPassActive] = useState({text: "", isActive: false});
  const [showError, setShowError] = useState(false);
  const refErrorDiv = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  useEffect(()=> {
   const timer =  setInterval(() => {
      setShowError(false);
    }, 3500)
    return () => clearInterval(timer);
  }, [showError])

  async function login (e: React.SubmitEvent) {
    e.preventDefault();

    const result = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({user:userActive.text, password:passActive.text})
    })
     const dados = await result.json();

      if (dados.sucess) {
        router.push(`/relatorio?nome=${userActive.text}`)
      } else {
        if(refErrorDiv.current) {
          setShowError(true);
        }
      }
    // if(userActive.text === usuarioValido && passActive.text === senhaValida){
    //   document.cookie = "sys_session=token_secreto_agepen; path=/; max-age=3600; SameSite=Strict;"
    //    console.log("Usuario validado")
    //    router.push(`/relatorio?nome=${usuarioValido}`)
       
    // } else {
    //   console.log("Usuário errado!");
    // }
  }

  return (<main className="grid grid-rows-[1fr_auto] min-h-screen min-w-screen items-center bg-linear-to-b from-cinza-escuro  to-cinza-maisescuro">
    <form className=" bg-cinza-maisescuro w-100 h-auto py-7 flex flex-col  items-center gap-2 border border-[#494949da] rounded-[5px] transition-all duration-600 shadow-2xl md:w-120 justify-self-center" onSubmit={(e) => {login(e)}}>
      <section className="flex flex-col items-center w-[85%] ">
    
          <Image
            src={logoAgepen}
            alt="Logotipo Oficial AGEPEN"
            width={90}
            priority
            className="h-auto"
          />
    
        <h1 className="text-amarelo-escuro text-[1.2em] font-bold md:text-[1.5em]">Bem-vindo(a) ao SysOficial</h1>
        <h2 className="text-white text-[0.75em] font-extralight md:text-[0.9em] ">Sistema integrado do oficial do dia</h2>
      </section>
      <section className="w-[85%]">
        <div className="flex items-center gap-2 ">
          <UserRound className={`w-7 h-7 md:w-9 md:h-9 transition-colors duration-500 ${userActive.isActive ? 'text-amarelo-claro' : 'text-[#4e4e4e]'}`}  />
          <InputDeDados label="Usuário:" placeholder=" " name="username" autoComplete="name" change={setUserActive} />
        </div>
        <div className="flex items-center gap-2">
          <LockKeyholeOpen className={`w-7 h-7 md:w-9 md:h-9  transition-colors duration-500 ${passActive.isActive ? 'text-amarelo-claro' : 'text-[#4e4e4e]'}`}/>
          <InputDeDados label="Senha:" placeholder=" " name="password" autoComplete="current-password" type="password" change={setPassActive} />
        </div>
        <button type="submit" className="bg-amarelo-claro p-2 w-full cursor-pointer rounded-[5px] mt-2 md:p-3 md:my-3  font-bold hover:bg-cinza-escuro hover:text-amarelo-claro hover:border hover:border-[#636363]">Login</button>
        <div ref={refErrorDiv} className={`text-white text-center bg-red-900 border border-red-500 rounded-[5px] p-1.5 duration-1000 starting:opacity-0  ${showError ? ' opacity-100 max-h-25' : 'opacity-0 max-h-0 overflow-hidden' }`}>Usuário e/ou senha incorreto!</div>
      </section>
    </form>
    <footer className="text-white bg-black w-full text-sm py-2 text-center font-extralight">JARDIM NOROESTE - CEP: 79.045-120 CAMPO GRANDE/MS – BRASIL – FONE: (67) 3901-3466 | E-mail: <a href="mailto:ipcg@agepen.ms.gov.br" className="underline text-blue-400">ipcg@agepen.ms.gov.br</a> </footer>
    {/* <ErrorLogin useRef={refErrorDiv}/> */}
  </main>)
}
