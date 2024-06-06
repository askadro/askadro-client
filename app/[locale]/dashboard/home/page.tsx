"use client"

import React, {JSX} from 'react';
import {GetSummary} from "@/api/myservices";
import {Card, CardContent, CardTitle, CardHeader, CardDescription, CardFooter} from "@/components/ui/card";
import {Activity, Building2, CreditCard, DollarSign, Repeat2, TicketSlash, Users} from "lucide-react";
import {useTranslations} from "next-intl";
import {Badge} from "@/components/ui/badge";

interface Summary {
    staff: { message: string, count: number },
    company: { message: string, count: number },
    ticket: { allTime: { message: string, count: number }, thisMount: { message: string, count: number } },
    job: {
        allTime: { message: string, count: number },
        thisMount: { message: string, count: number },
        thisYear: { message: string, count: number }
    }
}

const Page: React.FC = () => {
    const {data: summary} = GetSummary() as { data: Summary };
    const t = useTranslations("index");
    console.log(summary);

    const CardForDetail = ({label, count, message, icon}: {
        label: string,
        count: number,
        message: string,
        icon?: any
    }) => {
        return (
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {label}
                    </CardTitle>
                    {icon && icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold flex flex-row items-center">
                        <Badge className="mr-4 mb-3" variant="default">{count}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {message}
                    </p>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <CardForDetail icon={<Users className="h-4 w-4 text-muted-foreground"/>}
                               message={summary?.staff?.message} count={summary?.staff?.count}
                               label={t("staff")}/>
                <CardForDetail icon={<Building2 className="h-4 w-4 text-muted-foreground"/>}
                               message={summary?.company?.message} count={summary?.company?.count}
                               label={t("companies")}/>
                <CardForDetail icon={<TicketSlash className="h-4 w-4 text-muted-foreground"/>}
                               message={summary?.ticket?.allTime.message}
                               count={summary?.ticket?.allTime.count} label={t("tickets_alltime_summary")}/>
                <CardForDetail icon={<TicketSlash className="h-4 w-4 text-muted-foreground"/>}
                               message={summary?.ticket?.thisMount.message}
                               count={summary?.ticket?.thisMount.count} label={t("tickets_thismount_summary")}/>
                <CardForDetail icon={<Repeat2 className="h-4 w-4 text-muted-foreground"/>}
                               message={summary?.job?.allTime.message}
                               count={summary?.job?.allTime.count} label={t("jobs_alltime")}/>
                <CardForDetail icon={<Repeat2 className="h-4 w-4 text-muted-foreground"/>}
                               message={summary?.job?.thisMount.message}
                               count={summary?.job?.thisMount.count} label={t("jobs_thismount")}/>
                <CardForDetail icon={<Repeat2 className="h-4 w-4 text-muted-foreground"/>}
                               message={summary?.job?.thisYear.message}
                               count={summary?.job?.thisYear.count} label={t("jobs_thisyear")}/>
            </div>
        </div>
    );
};
export default Page;
