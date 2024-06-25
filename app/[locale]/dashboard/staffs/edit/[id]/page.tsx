"use client"
import React, { useEffect, useState } from 'react';
import { UserForm } from "@business";
import { useRouter, useParams } from "next/navigation";
import { GetUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { User } from "@/types";
import NameWithBack from "@/components/ui/NameWithBack";

const UserDetail = () => {
    const router = useRouter()
    const t = useTranslations("index")
    const params = useParams()
    const { data, isLoading, isSuccess, error, refetch: refecthUser } = GetUser(params?.id)
    const [user, setUser] = useState<User | null>(data)
    useEffect(() => {
        if (isSuccess) {
            setUser(data)
        }
    }, [data, isLoading, isSuccess]);

    if (!data || !user) return null
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <NameWithBack name={t("back")}/>
            <div className="grid gap-4 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                            <CardTitle>{t("update_staff")}</CardTitle>
                            <CardDescription>
                                {t("update_staff_decs")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserForm defaultValues={user} buttonTitle={"save"} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default UserDetail;
