import React from 'react';
import Link from "next/link";
import {Bell, Home, LineChart, Package, Package2, Settings, ShoppingCart, Users, Users2} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {dashboard_navs} from "@/config/nav";
import {NavType} from "@/types/navType";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import NavItem from "@/components/ui/NavItem";
import {APP_NAME} from "@/config/app";
import {useRouter} from "next/navigation";

export const Drawer = () => {
const router = useRouter();
    const returnNavList = () => {
        return dashboard_navs.map((nav: NavType) => {
            return <nav key={nav.id} className="grid items-start px-2 text-sm font-medium lg:px-4">
                <NavItem nav={nav}/>
            </nav>
        })
    }

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6"/>
                        <span className="">{APP_NAME}</span>
                    </Link>
                    {/*<Button variant="outline" size="icon" className="ml-auto h-8 w-8">*/}
                    {/*    <Bell className="h-4 w-4"/>*/}
                    {/*    <span className="sr-only">Toggle notifications</span>*/}
                    {/*</Button>*/}
                </div>

                {returnNavList()}

                <div className="mt-auto p-4">
                    <Card x-chunk="dashboard-02-chunk-0">
                        <CardHeader className="p-2 pt-0 md:p-4">
                            <CardTitle>Bağlantı kurmak</CardTitle>
                            <CardDescription>
                                İletişime geçmek için lütfen bizi arayın
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                            <Button size="sm" onClick={()=>router.push("/contact")} className="w-full">
                                Ara
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
        ;
};
