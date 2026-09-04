
export default function SelectComponent({children, width, situation}: any) {

    return (<select name="" id="" className={`${width} cursor-pointer border border-amarelo-escuro rounded-[5px] outline-none  mx-2`} onChange={(e) => {situation(e.target.value)}} >
                {children}
            </select>)
}