interface InputComponent {
    type: string,
    colors?: 
    [border?:string , background?:string, text?:string]
    width?: string;
    height?: string
    styles?: string
    onChange?: any;
    value: any;
}

export default function InputComponentForm({type, colors = [], onChange,  ...props}:InputComponent) {
    const [
        border = 'amarelo-escuro',
        background = 'cinza-escuro',
        text = 'white',
     ] = colors;
     const {width = 'auto', height = 'auto', styles = null} = props
     
    return (
        <input type={type} className={`outline-0 ${width} ${height} border p-0.5 rounded-[5px] border-${border} bg-${background} text-${text} min-w-0 text-sm indent-1 ${styles}` } onChange={onChange} value={props.value} min='0' />
    )
}