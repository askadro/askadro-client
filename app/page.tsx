"use client"
import {Metadata} from 'next'
import {GetUsers} from "@/api/user";
import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {APP_PATHS} from "@/config/paths";

// export const metadata: Metadata = {
//     title: 'Next.js',
// }

export default function Page() {
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        console.log("db: ", pathname?.split("/"))
        if (pathname === "/") {
            if (true) {
                router.push(`${APP_PATHS.dashboard}/${APP_PATHS.home}`);
            }
        }
    }, [router, pathname]);
    return null
}