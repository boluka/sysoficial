import { Clock4 } from "lucide-react";

export default function TimeComponent({
  setTime,
}: {
  setTime?: (e: string) => {};
}) {
  return (
    <div className="flex w-18 relative border border-cinza-maisclaro rounded-[5px] text-amarelo-claro text-sm">
        <input
          type="time"
          className=" [&::-webkit-calendar-picker-indicator]:opacity-0
          [&::-webkit-calendar-picker-indicator]:w-full
          [&::-webkit-calendar-picker-indicator]:absolute
          [&::-webkit-calendar-picker-indicator]:inset-0
          [&::-webkit-calendar-picker-indicator]:cursor-pointer ml-1 outline-0
         hover:text-amarelo-escuro
          "
            
        />
        <Clock4 className="absolute right-1 bottom-0 w-4 text-amarelo-claro pointer-events-none"/>
    </div>
  );
}
