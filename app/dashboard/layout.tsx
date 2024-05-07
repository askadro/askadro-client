"use client"
import AppNav from "@/components/business/AppNav";
import React from "react";
import {TooltipProvider} from "@/components/ui/tooltip";
import Header from "@/components/ui/Header";
import {Drawer} from "@/components/ui/Drawer";


const DashboardLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <TooltipProvider>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
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
