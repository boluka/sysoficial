'use client'
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

interface DialogDate {
    showCalendar: boolean
    setShowCalendar: any,
    date: Date | undefined,
    setDate: any;
}

export default function DialogDate({showCalendar, setShowCalendar, date, setDate}: DialogDate) {
    return <dialog open={showCalendar}  className="fixed m-0 inset-auto right-5 bottom-65 max-w-none rounded-lg opacity-100 starting:opacity-0 transition-all duration-300">
        <Calendar className=" bg-black text-gray-200 rounded-lg" selected={date} onSelect={(e) => {
            setDate(e)
           setShowCalendar(false);
        }} mode="single"/>
    </dialog>
}