"use client"
import React, {useEffect, useState} from 'react';
import {UserForm} from "@business";
import {useRouter, useParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ChevronLeft, PlusCircle} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useTranslations} from "next-intl";


const UserDetail = () => {
    const router = useRouter()
    const t = useTranslations("index")

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="flex items-center gap-4">
                <Button onClick={(e) => {
                    e.preventDefault()
                    router.back()
                }} variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4"/>
                    <span className="sr-only">{t("back")}</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {t("new_user")}
                </h1>

            </div>
            <div className="grid gap-4 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4  lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                            <CardTitle>{t("new_staff")}</CardTitle>
                            <CardDescription>
                                {t("manager_or_staff_decs")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserForm/>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/*<div className="flex items-center justify-center gap-2 md:hidden">*/}
            {/*    <Button variant="outline" size="sm">*/}
            {/*        {t("clean")}*/}
            {/*    </Button>*/}
            {/*    <Button size="sm">{t("saveUser")}</Button>*/}
            {/*</div>*/}
        </main>

    );
};
{/*<UserForm defaultValues={data} id={params?.id} />*/
}

export default UserDetail;