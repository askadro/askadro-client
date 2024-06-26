"use client"
import React, { useEffect, useState } from 'react';
import {StaffForm, UserForm} from "@business";
import { useRouter, useParams } from "next/navigation";
import { GetUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import {Staff, User} from "@/types";
import NameWithBack from "@/components/ui/NameWithBack";
import {GetStaff, GetStaffs} from "@/api/staff";

const StaffDetail = () => {
    const router = useRouter()
    const t = useTranslations("index")
    const params = useParams()
    const { data, isLoading, isSuccess, error, refetch: refecthUser } = GetStaff(params?.id)
    const [staff, setStaff] = useState<Staff | null>(data)
    useEffect(() => {
        if (isSuccess) {
            setStaff(data)
        }
    }, [data, isLoading, isSuccess]);

    if (!data || !staff) return null
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
                            <StaffForm defaultValues={staff} buttonTitle={"save"} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default StaffDetail;
