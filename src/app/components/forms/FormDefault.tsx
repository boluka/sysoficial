"use client";

import { ReactNode } from "react";

export default function Forms({ children }: { children: ReactNode }) {
  return (
    <form className="flex flex-col gap-3 text-white bg-[#b9b9b9] min-w-120 w-1/2 max-w-160 mb-10 rounded-2xl self-center shadow-[0_0_40px_#00000081] p-5 opacity-100 starting:opacity-0 starting:translate-y-4 duration-500 ease-out transition-all allow-discrete">
      {children}
    </form>
  );
}
