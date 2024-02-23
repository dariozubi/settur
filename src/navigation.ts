import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "./i18n";

export const pathnames = {
  "/": "/",
};

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
  });
