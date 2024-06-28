"use client"

import React, {useEffect, useMemo} from 'react';
import {useTranslations} from "next-intl";
import {CustomTable} from "@business";
import {usersColums} from "@/config/usersTableData";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import {User} from "@/types";
import {CreateTicket} from "@/api/ticket";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {TITLES} from "@/config/enums";
import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    TicketAccordionWithSelectTitle,
    TicketDetailCard
} from "@ui";
import {redirect, useParams, useRouter} from "next/navigation";
import {GetCompanies} from "@/api/company";
import {Separator} from "@/components/ui/separator";
import {format} from "date-fns";
import {isEmpty} from "lodash";
import {Label} from "@/components/ui/label";
import {getInitialDate} from "@/helpers/features";
import {useToast} from "@/components/ui/use-toast";
import {cn} from "@/lib/utils";
import {getLocalStorage} from "@/utils/storage";
import {GetStaffs} from "@/api/staff";
import {GetProfile} from "@/api/user";

const formSchema = z.object({
    enterTime: z.date().default(getInitialDate()),
    exitTime: z.date().default(getInitialDate(14)),
    ticketDate: z.date().default(new Date()),
    ticketNotes: z.string().optional().default(""),
})

const defaultValues = {
    enterTime: getInitialDate(),
    exitTime: getInitialDate(14),
    ticketDate: new Date(),
    ticketNotes: ""
};

const Page = () => {
    const t = useTranslations("index")
    const router = useRouter()
    const {toast} = useToast()
    const params: { id: string } | null = useParams()
    const [rowSelection, setRowSelection] = React.useState({})
    const [tab, setTab] = React.useState("staffs-table")
    const [jobsData, setJobsData] = React.useState<{
        userId: string,
        title: string,
        enterTime: Date,
        exitTime: Date
    }[]>([])
    const [selectedStaff, setSelectedStaff] = React.useState<any[]>([])
    const [ticketData, setTicketData] = React.useState(defaultValues)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => defaultValues, [])
    })
    const {data: staffs} = GetStaffs()
    const staffsData = staffs?.[0]
    const {data: profile} = GetProfile()
    const {data: companies} = GetCompanies()
    const company = companies?.find((e: { id: string | undefined; }) => e.id === params?.id)
    const {mutateAsync: createTicketAsync, isSuccess: ticketSuccess} = CreateTicket()

    const finishTicketCreated = async () => {
        if (!profile?.id) {
            toast({
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                title: "Profile shouldn't find",
                description: "Giriş yapmadan oluşturulamaz",
                variant: "destructive",
            })
        }
        const data = {
            jobs: jobsData,
            ...ticketData,
            companyId: params?.id,
            userId: profile.id
        }
        console.log("last data: ", data)
        await createTicketAsync(data)
    }

    useEffect(() => {
        if (ticketSuccess) {
            toast({
                title: "Ticket created",
                description: "Talep oluşturuldu",
            });

            const timeoutId = setTimeout(() => {
                form.reset(defaultValues);
                setSelectedStaff([]);
                setRowSelection({});
                setTicketData(defaultValues);
                setJobsData([]);
                router.replace(`/${getLocalStorage("lang") || "tr"}/dashboard/tickets`);
            }, 1500);

            return () => clearTimeout(timeoutId); // Cleanup the timeout if the component unmounts or ticketSuccess changes
        }
    }, [ticketSuccess, form, router, toast]);


    const staffTitleCount = () => {
        return jobsData?.reduce((acc, item) => {
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
        const selectedData = staffsData?.filter((u: User, index: number) => keys.some((k: string) => k === index.toString()))
        const formattedData = selectedData?.map((u: { id: any; }) => ({
            userId: u.id,
            title: TITLES[0].value,
            enterTime: form.getValues("enterTime"),
            exitTime: form.getValues("exitTime")
        }));
        setSelectedStaff(selectedData)
        setJobsData(formattedData)
    }, [form, rowSelection, staffsData]);


    const StaffList = () => {
        const titleCounts = staffTitleCount();

        return (
            <ul className="grid gap-3">
                {Object.entries(titleCounts).map(([title, count]: any) => (
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
            <Tabs defaultValue="staffs-table" onValueChange={setTab} value={tab}>
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger
                            disabled={tab !== "ticket-detail" && tab !== "control-and-finish"}
                            value="staffs-table"
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
                <TabsContent value="staffs-table">
                    <CustomTable rowSelection={rowSelection}
                                 setRowSelection={setRowSelection}
                                 columns={usersColums} data={staffsData}
                                 searchFilterParam={"firstName"}
                                 searchPlaceholder={"Search users with name..."}
                                 addTitle={"add_staff"}
                                 RightComponent={createTicket()}
                    />
                </TabsContent>
                <TabsContent value="ticket-detail">
                    {selectedStaff?.length ?
                        <TicketAccordionWithSelectTitle data={selectedStaff} setJob={setJobsData}
                                                        titles={TITLES}/> : null}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className=" grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                            <TicketDetailCard form={form}/>
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
                                <CardDescription>{`Date: ${format(ticketData?.ticketDate, "PPP")}`}</CardDescription>
                            </div>

                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                                <div className="font-semibold">{t("time_details")}</div>
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span
                                            className="text-muted-foreground">{t("enter_time")}</span>
                                        <span>{format(ticketData?.enterTime, "HH:mm")}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span
                                            className="text-muted-foreground">{t("exit_time")}</span>
                                        <span>{format(ticketData?.exitTime, "HH:mm")}</span>
                                    </li>
                                </ul>
                                <Separator className="my-2"/>
                                <StaffList/>
                            </div>
                            {ticketData?.ticketDate ? <>
                                <Separator className="my-4"/>
                                <div className="grid gap-3">
                                    <Label>{t("notes")}</Label>
                                    <ul className="grid gap-3">
                                        {ticketData?.ticketNotes?.split(",")?.map((note, index) => (
                                            <li key={index.toString()} className="flex items-center justify-between">
                                                <span className="text-muted-foreground">{`- ${note}`}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </> : null
                            }
                        </CardContent>
                        <CardFooter
                            className="flex flex-row items-center border-t bg-muted/50 px-6 py-3 justify-center">
                            <Button onClick={() => finishTicketCreated()}>{t("create_ticket")}</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};


export default Page;