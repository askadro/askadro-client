"use client"

import AppNav from "@/components/business/AppNav";
import React, {useEffect} from "react";
import AuthNav from "@/components/business/AuthNav";
import Image from "next/image";
import imageUrl from "../../../assets/images/travel.jpg"
import {usePathname, useRouter} from "next/navigation";
import {APP_PATHS, AUTH_PATHS} from "@/config/paths";

const AuthLayout = ({children}: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (pathname?.split("/")[2] === "undefined") {
            router.replace(`${AUTH_PATHS.auth}/${AUTH_PATHS.login}`);
        }
    }, [router,pathname]);

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="hidden bg-muted lg:block">
                <Image
                    src={imageUrl}
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            {children}
        </div>
    )
}


export default AuthLayout;