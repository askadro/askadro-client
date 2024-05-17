"use client"

import React, {useCallback} from 'react';
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import Modal from "@/components/ui/modal";
import {GetCompanies} from "@/api/company";
import {Company} from "@/types";
import useRoute from "@/hooks/useRoute";
import {GetTickets} from "@/api/ticket";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Building2, DollarSign} from "lucide-react";
import {Ticket} from "@/types/TicketType";
import {format, setDefaultOptions} from "date-fns";
import {tr} from "date-fns/locale"

setDefaultOptions({locale: tr})

const Page = () => {
    const t = useTranslations("index")
    const route = useRoute()
    const [selectedValue, setSelectedValue] = React.useState("")
    const {data: companies} = GetCompanies()
    //const {data: tickets} = GetTickets()
    const returnData = useCallback(() => {
        return companies?.map((item: Company) => {
            return {label: item.name, value: item.id}
        })
    }, [companies])

    const returnCreateButton = () => <Modal select label={t("create_new_ticket")} selectedValue={selectedValue}
                                            name={t("company")}
                                            setSelectedValue={setSelectedValue} list={returnData()}
                                            buttonTitle={t("continue")}
                                            cancelButtonTitle={t("cancel")}
                                            onSubmit={(e: any) => route(e, `new/${selectedValue}`)}/>

    const tics = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const returnTicketCard = () => {
        return tics?.map((item: any) => {
            return (
                <Card key={item} x-chunk="dashboard-01-chunk-0" className="cursor-pointer" onClick={(e) => {
                    route(e,`detail/${item}`)
                }}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-body">
                            Company name
                        </CardTitle>
                        <Building2 className="h-5 w-5 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{format(new Date(), "dd MMMM yyyy")}</div>
                        <div className="">
                            <p className="text-sm text-muted-foreground">
                                {`${t("enter_hour")}: ${"12:45"}`}
                            </p>
                            <p className="mb-2 text-sm text-muted-foreground">
                                {`${t("exit_hour")}: ${"12:45"}`}
                            </p>
                            <span className="">{t("notes")}</span>
                            {[1, 2, 3].map((note: any) => {
                                return (
                                    <p key={note} className="text-sm text-muted-foreground">
                                        {`- ${note}`}
                                    </p>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            )
        })
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="justify-between flex flex-row">
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">{t("tickets")}</h1>
                </div>
                {returnCreateButton()}
            </div>
            <div className="flex flex-1 rounded-lg border border-dashed shadow-sm flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 ">
                    {returnTicketCard()}
                </div>
            </div>
        </div>
    );
};

export default Page;