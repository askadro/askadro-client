"use client"

import React from 'react';
import Link from "next/link";
import {Bell, Package2} from "lucide-react";
import {dashboard_navs} from "@/config/nav";
import {NavType} from "@/types/navType";
import {Button} from "@/components/ui/button";

import {APP_NAME} from "@/config/app";
import {useTranslations} from "next-intl";

export const Drawer = () => {
    const t = useTranslations("index")

    const returnNavList = () => {
        return dashboard_navs.map((nav: NavType) => {
            return <nav key={nav.id} className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                    href={nav.path}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                    <nav.icon className="h-4 w-4"/>
                    {t(nav.title)}
                </Link>
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
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4"/>
                        <span className="sr-only">{t("notifications")}</span>
                    </Button>
                </div>
                <div className="flex-1">
                    {returnNavList()}
                </div>
            </div>
        </div>
    )

};
