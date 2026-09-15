
export default function SelectComponent({children, width, height, name, value, onChange}: any) {

    return (<select name={name} value={value} id="" className={`${width} ${height} text-sm cursor-pointer border border-amarelo-escuro rounded-[5px] outline-none `} onChange={onChange} >
                {children}
            </select>)
}