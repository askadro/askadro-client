"use client"
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {APP_PATHS} from "@/config/paths";
import { useTranslation} from "next-i18next";

export default function Page() {
    const { t, i18n } = useTranslation('common')
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (pathname === "/") {
            if (true) {
                router.replace(`${APP_PATHS.home}/`);
            }
        }
    }, [router, pathname]);

    const clientSideLanguageChange = (newLocale: string) => {
        i18n.changeLanguage(newLocale);
    }

    console.log(t("hi"))

    return null
}