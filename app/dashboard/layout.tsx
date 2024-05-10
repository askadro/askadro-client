"use client"
import React, {useEffect} from "react";
import {TooltipProvider} from "@/components/ui/tooltip";
import Header from "@/components/ui/Header";
import {Drawer} from "@/components/ui/Drawer";
import {useRouter, usePathname} from "next/navigation";
import {APP_PATHS} from "@/config/paths";


const DashboardLayout = ({children}: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (!pathname?.split("/")[2]) {
            router.push(`${APP_PATHS.dashboard}/${APP_PATHS.home}`);
        }
    }, [router, pathname]);

    return (
        <TooltipProvider>
            <div
                className="grid h-full w-full md:grid-cols-[150px_1fr] lg:grid-cols-[200px_1fr] xl:grid-cols-[250px_1fr]">
                <Drawer/>
                <div className="flex flex-col">
                    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                        {/*<AppNav />*/}
                        <Header/>
                        {children}
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}


export default DashboardLayout;
