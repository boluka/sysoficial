"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";

interface DialogDate {
  showCalendar: boolean;
  setShowCalendar: any;
  date: Date | undefined;
  setDate: any;
  ref: React.RefObject<HTMLDialogElement | null>;
}

export default function DialogDate({
  showCalendar,
  setShowCalendar,
  ref,
  date,
  setDate,
}: DialogDate) {
  const verifySelectionDate = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowCalendar(false);
    }
  };

  return (
    <dialog
      ref={ref}
      open={showCalendar}
      onBlur={verifySelectionDate}
      className="fixed m-0 inset-auto right-5 bottom-65 max-w-none rounded-lg opacity-100 starting:opacity-0 transition-all duration-300 "
    >
      <Calendar
        className="bg-black text-gray-200 rounded-lg"
        captionLayout="dropdown-months"
        selected={date}
        onSelect={(e) => {
          setDate(e);
          setShowCalendar(false);
        }}
        mode="single"
      />
    </dialog>
  );
}
