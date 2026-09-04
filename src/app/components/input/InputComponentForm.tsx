interface Props {
    type: string,
    colors?: 
    [border?:string , background?:string, text?:string]
    width?: string;
    height?: string
    
}

export default function InputComponentForm({type, colors = [], ...props}:Props) {
    const [
        border = 'amarelo-escuro',
        background = 'cinza-escuro',
        text = 'white',
     ] = colors;
     const {width = 'auto', height = 'auto'} = props
     
    return (
        <input type={type} className={`outline-0 ${width} ${height} border p-0.5 rounded-[5px] indent-2 border-${border} bg-${background} text-${text} min-w-0` } min='0' />
    )
}