"use client";
export default function ErrorLogin({ useRef }: any) {
  return (
    <dialog
      ref={useRef}
      className={`opacity-100 scale-100 duration-300 ease-out transition-[all,display] allow-discrete
                   starting:opacity-0 starting:scale-95
                   backdrop:bg-black/50 backdrop:transition-[all,display] backdrop:duration-600 backdrop:allow-discrete
                   backdrop:opacity-100
                   backdrop:starting:opacity-0 outline-0 rounded-[5px] bg-cinza-maisclaro fixed inset-0  m-auto shadow-xl`}
        
    >
        <div className="bg-black text-white border-red-500 border  p-5 rounded-[5px]">Usuário ou senha errados!</div>
    </dialog>
  );
}
