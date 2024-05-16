"use client"

import React, {useEffect, useMemo, useState} from 'react';
import {useTranslations} from "next-intl";
import {GetUsers} from "@/api/user";
import {CustomTable} from "@business";
import {usersColums} from "@/config/usersTableData";
import {Button} from "@/components/ui/button";
import {ArrowRight, PlusCircle} from "lucide-react";
import {User} from "@/types";
import {SetTicket} from "@/api/ticket";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {ROLES} from "@/config/enums";
import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormDatePicker, FormDatePickerSha, FormTextArea, FormTextInput, FormTimePicker} from "@ui";
import {useParams} from "next/navigation";
import {GetCompanies} from "@/api/company";
import {Separator} from "@/components/ui/separator";
import {format} from "date-fns";
import {isEmpty} from "lodash";
import {Label} from "@/components/ui/label";

const getInitialDate = (hour: number = 7) => {
    const now = new Date();
    now.setHours(hour, 0, 0, 0); // Saat 07:00:00.000 olarak ayarla
    return now;
};

const formSchema = z.object({
    enterHour: z.date().default(getInitialDate()),
    exitHour: z.date().default(getInitialDate(14)),
    ticket_date: z.date().default(new Date()),
    ticket_notes: z.string().optional().default("")
})
const defaultValues = {
    enterHour: getInitialDate(),
    exitHour: getInitialDate(14),
    ticket_date: new Date(),
    ticket_notes: ""
};

const Page = () => {
    const t = useTranslations("index")
    const params: { id: string } | null = useParams()
    const [rowSelection, setRowSelection] = React.useState({})
    const [tab, setTab] = React.useState("user-table")
    const [ticketStaffs, setTicketStaffs] = React.useState<{ staffId: string, title: string }[]>([])
    const [selectedData, setSelectedData] = React.useState<any[]>([])
    const [ticketData, setTicketData] = React.useState(defaultValues)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => defaultValues, [])
    })
    const {data: user} = GetUsers()

    const {data: companies} = GetCompanies()
    const company = companies?.find((e: { id: string | undefined; }) => e.id === params?.id)
    const {mutateAsync: setTicket, isSuccess: ticketSuccess} = SetTicket()

    const finishTicketCreated = () => {
        const data = {
            staffs: ticketStaffs,
            ...ticketData,
            companyId: params?.id

        }
        console.log("last data: ", data)
    }

    const staffTitleCount = () => {
        return ticketStaffs?.reduce((acc, item) => {
            // Eğer title daha önce eklenmemişse, 0'dan başlat
            // @ts-ignore
            if (!acc[item.title]) {
                // @ts-ignore
                acc[item.title] = 0;
            }
            // Title'ın sayısını arttır
            // @ts-ignore
            acc[item.title]++;
            return acc;
        }, {});
    }


    const createTicket = () => {
        return (
            <div className="ml-auto flex items-center gap-2">
                <Button onClick={() => !isEmpty(rowSelection) ? setTab("ticket-detail") : () => {
                }} size="sm" variant="default" className="h-10 gap-1">
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">{t("continue")}</span>
                    <ArrowRight/>
                </Button>
            </div>
        )
    }

    useEffect(() => {
        const keys = Object.keys(rowSelection);
        const selectedData = user?.filter((u: User, index: number) => keys.some((k: string) => k === index.toString()))
        const formattedData = selectedData?.map((u: { id: any; }) => ({
            staffId: u.id,
            title: ROLES[0].value
        }));
        setSelectedData(selectedData)
        setTicketStaffs(formattedData)
    }, [rowSelection, user]);

    const changeStaffRole = (v: string, userId: string | undefined) => {
        setTicketStaffs((prevStaffs: any) =>
            prevStaffs.map((staff: any) =>
                staff.staffId === userId ? {...staff, title: v} : staff
            )
        )
    }

    const StaffList = () => {
        const titleCounts = staffTitleCount();

        return (
            <ul className="grid gap-3">
                {Object.entries(titleCounts).map(([title, count]:any) => (
                    <li key={title} className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t(title)}</span>
                        <span>{count}</span>
                    </li>
                ))}
            </ul>
        );
    };


    async function onSubmit(values: z.infer<typeof formSchema>) {
        setTicketData(values)
        setTab("control-and-finish")
    }

    if (!company) return null
    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="user-table" onValueChange={setTab} value={tab}>
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger
                            disabled={tab !== "ticket-detail" && tab !== "control-and-finish"}
                            value="user-table"
                        >
                            {t("staffs")}
                        </TabsTrigger>
                        <TabsTrigger
                            disabled={tab !== "control-and-finish"}
                            value="ticket-detail"
                        >
                            {t("ticket-detail")}
                        </TabsTrigger>
                        <TabsTrigger
                            disabled={true}
                            value="control-and-finish"
                        >
                            {t("control-and-finish")}
                        </TabsTrigger> </TabsList>
                </div>
                <TabsContent value="user-table">
                    <CustomTable rowSelection={rowSelection}
                                 setRowSelection={setRowSelection}
                                 columns={usersColums} data={user}
                                 searchFilterParam={"firstName"}
                                 searchPlaceholder={"Search users with name..."}
                                 addTitle={"add_staff"}
                                 RightComponent={createTicket()}
                    />
                </TabsContent>
                <TabsContent value="ticket-detail">
                    {selectedData?.length ? <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>{`${t("staffs")} (${t("selectable_staff_role")})`}</AccordionTrigger>
                            <AccordionContent className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                                <div
                                    className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                    {selectedData?.map((user: User) => {
                                        const fullName = `${user.firstName} ${user.lastName}`.substring(0, 25)
                                        return (
                                            <Card key={user.id} className="">
                                                <CardHeader className="flex">
                                                    <CardTitle className="line-clamp-1 flex justify-between gap-4">
                                                        <div className="line-clamp-1 ">{fullName}</div>
                                                        <Badge
                                                            className="self-center ">{user.status}</Badge></CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-2md font-bold">{t(user.gender)}</div>
                                                    <p className="text-xs text-muted-foreground">
                                                        {user?.roles?.toString()}
                                                    </p>
                                                    <Select
                                                        defaultValue={ROLES[0].value}
                                                        onValueChange={(c: string) => changeStaffRole(c, user.id)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={t("select_roles")}/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>{t("roles")}</SelectLabel>
                                                                {ROLES.map((role) => {
                                                                    return (
                                                                        <SelectItem key={role.value}
                                                                                    value={role.value}
                                                                        >{role.label}</SelectItem>
                                                                    )
                                                                })}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    extra ücret ve role seçim, static olarak varsayılan ücret
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion> : null}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className=" grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                            <Card className="sm:col-span-2 xl:col-span-4">
                                <CardHeader>
                                    <CardTitle>{`${t("ticket_detail")}`}</CardTitle>
                                    <CardDescription>{t("ticket_desc")}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <FormTimePicker form={form} label={t("enter_hour")} name={"enterHour"}/>
                                    <FormTimePicker form={form} label={t("exit_hour")} name={"exitHour"}/>
                                    <div className="mt-6"/>
                                    <FormDatePickerSha form={form} name={"ticket_date"} label={t("ticket_date")}/>
                                    <FormTextArea form={form} name={"ticket_notes"} label={t("notes")}
                                                  description={t("notes_ticket_decs")}/>
                                </CardContent>
                            </Card>
                            <Button type="submit">{t("continue")}</Button>
                        </form>

                    </Form>
                </TabsContent>
                <TabsContent value="control-and-finish">
                    <Card
                        className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
                    >
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                            <div className="grid gap-0.5">
                                <CardTitle className="group flex items-center gap-2 text-lg">
                                    {company.name}
                                </CardTitle>
                                <CardDescription>{`Date: ${format(ticketData?.ticket_date, "PPP")}`}</CardDescription>
                            </div>

                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                                <div className="font-semibold">{t("time_details")}</div>
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span
                                            className="text-muted-foreground">{t("enter_time")}</span>
                                        <span>{format(ticketData?.enterHour, "HH:mm")}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span
                                            className="text-muted-foreground">{t("exit_time")}</span>
                                        <span>{format(ticketData?.exitHour, "HH:mm")}</span>
                                    </li>
                                </ul>
                                <Separator className="my-2"/>
                                <StaffList/>
                            </div>
                            {ticketData?.ticket_notes ? <>
                                <Separator className="my-4"/>
                                <div className="grid gap-3">
                                    <Label>{t("notes")}</Label>
                                    <ul className="grid gap-3">
                                        {ticketData?.ticket_notes?.split(",")?.map((note, index) => (
                                            <li key={index.toString()} className="flex items-center justify-between">
                                                <span className="text-muted-foreground">{`- ${note}`}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </> : null
                            }
                        </CardContent>
                        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3 justify-center">
                           <Button onClick={()=>finishTicketCreated()}>{t("create_ticket")}</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};


export default Page;