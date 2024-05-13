"use client"
import React from 'react';
import {CompanyForm,} from "@business";
import {useRouter, useParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ChevronLeft,} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

import {useTranslation} from "next-i18next";
import {GetCompany} from "@/api/company";


const CompanyEdit = () => {
    const router = useRouter()
    const {t} = useTranslation()
    const params = useParams()
    const {data, isLoading, isSuccess, error, refetch: refecthUser} = GetCompany(params?.id)


    if (!data) return null
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="flex items-center gap-4">
                <Button onClick={() => router.back()} variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4"/>
                    <span className="sr-only">{t("back")}</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {t("update_company")}
                </h1>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                    {data?.shortName}
                </Badge>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm">
                        {t("clean")}
                    </Button>
                    <Button size="sm">{t("save_company")}</Button>
                </div>
            </div>
            <div className="grid gap-4 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4  lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                            <CardTitle>{t("userDetail")}</CardTitle>
                            <CardDescription>
                                {t("userRoles")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CompanyForm defaultValues={data} id={data.id} buttonTitle={t("save")}/>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                    {t("clean")}
                </Button>
                <Button size="sm">{t("save_company")}</Button>
            </div>
        </main>

    );
};
{/*<UserForm defaultValues={data} id={params?.id} />*/
}

export default CompanyEdit;