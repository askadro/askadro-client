"use client"

import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {APP_PATHS} from "@/config/paths";
import { useTranslation} from "next-i18next";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "@/next-i18next.config";

function Page() {
    const { t, ready } = useTranslation('common')
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (pathname === "/") {
            if (true) {
                router.replace(`${APP_PATHS.home}/`);
            }
        }
    }, [router, pathname]);

    useEffect(() => {
        console.log(ready)
    }, [ready]);

    console.log(t("hi"))

    return   <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                Beautifully designed components <br className="hidden sm:inline" />
                built with Radix UI and Tailwind CSS.
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
                Accessible and customizable components that you can copy and paste
                into your apps. Free. Open Source. And Next.js 13 Ready.
            </p>
        </div>
        <div className="flex gap-4">
            <Link
                href={"#"}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants()}
            >
                Documentation
            </Link>
            <Link
                target="_blank"
                rel="noreferrer"
                href={"#"}
                className={buttonVariants({ variant: "outline" })}
            >
                GitHub
            </Link>
        </div>
    </section>
}


// export const getStaticProps = async ({ locale }: { locale: string }) => ({
//     props: {
//         ...await serverSideTranslations(locale, ['common', 'footer']),
//     },
// })


export default Page