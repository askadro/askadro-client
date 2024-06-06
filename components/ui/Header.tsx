"use client"

import React from 'react';
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {
    CircleUser,
    Menu,
    Package2,
    Search,

} from "lucide-react";
import Link from "next/link";

import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {dashboard_navs} from "@/config/nav";
import {NavType} from "@/types/navType";
import {LanguageSwitcher} from "@business";
import {useTranslations} from "next-intl";
import {APP_NAME} from "@/config/app";
import {Logout} from "@/api/auth";
import {redirect, useRouter} from "next/navigation";
import {clearLocalStorage, setLocalStorage} from "@/utils/storage";
import {getApiClient} from "@/api";

const Header = () => {
    const t = useTranslations("index")
    const router = useRouter()
    const {mutate: logout} = Logout()
    const logoutEvent = () => {
        logout()
        clearLocalStorage("token")
        getApiClient().defaults.headers.common["Authorization"] = null
        router.push("/tr")
    }

    const returnNavList = () => {
        return dashboard_navs.map((nav: NavType) => {
            return <Link
                key={nav.id}
                href={nav.path}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
                <nav.icon className="h-5 w-5"/>
                {t(nav.title)}
            </Link>
        })
    }

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6"/>
                            <span className="sr-only">{APP_NAME}</span>
                        </Link>
                        {returnNavList()}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            type="search"
                            placeholder={t("search_user")}
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>
            <LanguageSwitcher/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="h-5 w-5"/>
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => logoutEvent()}>{t("logout")}</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default Header;