"use client"

import React from 'react';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {UserForm, UserTable} from "@business";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {File, ListFilter, PlusCircle} from "lucide-react";
import {useTranslation} from "next-i18next";
import {usePathname, useRouter} from "next/navigation";

const Page = () => {
    const {t} = useTranslation()
    const router = useRouter();
    const pathname = usePathname()
    return (
        <Tabs defaultValue="user-list" className="">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="user-list">{t("users")}</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Draft</TabsTrigger>
                    <TabsTrigger value="archived" className="hidden sm:flex"> Archived
                    </TabsTrigger>
                    {/*<TabsTrigger value="user-list">Personel Listesi</TabsTrigger>*/}
                    {/*<TabsTrigger value="new-user">Personel Ekle</TabsTrigger>*/}
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-7 gap-1">
                                <ListFilter className="h-3.5 w-3.5"/>
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("filterBy")}</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuCheckboxItem checked>
                                {t("active")}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                {t("busy")}
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button size="sm" variant="outline" className="h-7 gap-1">
                        <File className="h-3.5 w-3.5"/>
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                    </Button>
                    <Button onClick={()=>router.push(`${pathname}/add`)} size="sm" className="h-7 gap-1">
                        <PlusCircle className="h-3.5 w-3.5"/>
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {t("add_user")}
                  </span>
                    </Button>
                </div>
            </div>
                <TabsContent value="user-list">
                    <UserTable/>
                </TabsContent>
                <TabsContent value="new-user">
                    <UserForm/>
                </TabsContent>
        </Tabs>
    );
};

export default Page;