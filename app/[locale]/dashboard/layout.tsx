import React from "react";
import Header from "@/components/ui/Header";
import {Drawer} from "@/components/ui/Drawer";


const DashboardLayout = ({children}: { children: React.ReactNode }) => {

    return (
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <Drawer/>
                <div className="flex flex-col">
                    <Header/>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
    )
}


export default DashboardLayout;
