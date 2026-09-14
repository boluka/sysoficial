
export default function SelectComponent({children, width, height, situation}: any) {

    return (<select name="" id="" className={`${width} ${height} text-sm cursor-pointer border border-amarelo-escuro rounded-[5px] outline-none `} onChange={(e) => {situation(e.target.value)}} >
                {children}
            </select>)
}