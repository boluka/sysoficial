
export default function SelectComponent({children, width, height, state}: any) {

    return (<select name="" id="" className={`${width} ${height} text-sm cursor-pointer border border-amarelo-escuro rounded-[5px] outline-none `} onChange={(e) => {state(e.target.value)}} >
                {children}
            </select>)
}