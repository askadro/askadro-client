"use client"

import React, {useCallback, useEffect} from 'react';
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
import {FormDatePicker} from "@ui";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";

setDefaultOptions({locale: tr})
const sd = new Date().setMonth(new Date().getMonth() - 1)
const ed = new Date().setDate(new Date().getDate() + 5)

const Page = () => {
    const t = useTranslations("index")
    const route = useRoute()
    const form = useForm({
        defaultValues: {
            startDate: sd,
            endDate: ed,
        }
    })
    const [selectedValue, setSelectedValue] = React.useState("")
    const {data: companies} = GetCompanies()
    const {mutate: getTickets, data: tickets} = GetTickets()
    const returnData = useCallback(() => {
        return companies?.map((item: Company) => {
            return {label: item.name, value: item.id}
        })
    }, [companies])

    useEffect(() => {
        getTickets({startDate: new Date(form.watch("startDate")), endDate: new Date(form.watch("endDate"))})
    }, [form, getTickets, form.getValues("startDate"), form.getValues("endDate")]);

    const returnCreateButton = () => <Modal select label={t("create_new_ticket")} selectedValue={selectedValue}
                                            name={t("company")}
                                            setSelectedValue={setSelectedValue} list={returnData()}
                                            buttonTitle={t("continue")}
                                            cancelButtonTitle={t("cancel")}
                                            onSubmit={(e: any) => route(e, `new/${selectedValue}`)}/>

    const returnTicketCard = () => {
        return tickets?.map((ticket: any) => {
            return (
                <Card key={ticket.id} x-chunk="dashboard-01-chunk-0" className="cursor-pointer" onClick={(e) => {
                    route(e, `detail/${ticket.id}`)
                }}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-body">
                            {ticket.company?.name}
                        </CardTitle>
                        <Building2 className="h-5 w-5 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{format(ticket.ticketDate, "dd MMMM yyyy")}</div>
                        <div className="">
                            <p className="text-sm text-muted-foreground">
                                {`${t("enter_time")}: ${format(ticket.enterTime, "hh:mm")}`}
                            </p>
                            <p className="mb-2 text-sm text-muted-foreground">
                                {`${t("exit_time")}: ${format(ticket.exitTime, "hh:mm")}`}
                            </p>
                            {ticket.ticketNotes ? (
                                <>
                                    <span className="">{t("notes")}</span>
                                    {
                                        ticket.ticketNotes.split(",").map((note: any) => {
                                            return (
                                                <p key={note} className="text-sm text-muted-foreground">
                                                    {`- ${note}`}
                                                </p>
                                            )
                                        })
                                    }
                                </>
                            ) : null}
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
            <Form {...form}>
                <form className="flex flex-row items-center gap-4">
                    <FormDatePicker form={form} name="startDate" label={t("start_date")}/>
                    <FormDatePicker form={form} name="endDate" label={t("end_date")}/>
                </form>
            </Form>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 ">
                {returnTicketCard()}
            </div>
        </div>
    );
};

export default Page;