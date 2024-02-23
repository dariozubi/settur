"use client";

import { Link } from "@/navigation";
import { usePathname } from "next/navigation";
import { IoGlobeOutline } from "react-icons/io5";

export const LanguageSelector = () => {
  const pathname = usePathname();
  const isEnglish = pathname.substring(0, 3) === "/en";
  return (
    <Link
      href="/"
      locale={isEnglish ? "es" : "en"}
      className="flex items-center gap-2"
    >
      <IoGlobeOutline />
      <span>{isEnglish ? "ES" : "EN"}</span>
    </Link>
  );
};
