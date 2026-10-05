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
    return <dialog open={showCalendar} className="fixed left-[88%] bottom-65 rounded-lg ">
        <Calendar className=" bg-black text-gray-200 rounded-lg" selected={date} onSelect={(e) => {
            setDate(e)
           setShowCalendar(false);
        }} mode="single"/>
    </dialog>
}