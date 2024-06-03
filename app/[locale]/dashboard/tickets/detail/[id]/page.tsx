"use client"

import React, {useEffect, useMemo} from 'react';
import {TicketDetailCard} from "@ui";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {TITLES} from "@/config/enums";
import {GetTicket} from "@/api/ticket";
import {useParams} from "next/navigation";
import NameWithBack from "@/components/ui/NameWithBack";

const formSchema = z.object({
    enterTime: z.date(),
    exitTime: z.date(),
    ticketDate: z.date(),
    ticketNotes: z.string().optional(),
})

const Page = () => {
    const t = useTranslations("index")
    const params: { id: string } | null = useParams()
    const {data: ticket} = GetTicket(params?.id)
    const [staffForDb, setStaffForDb] = React.useState<{ staffId: string, title: string }[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => ticket, [ticket])
    })
    useEffect(() => {
        if (ticket) {
            form.reset({
                enterTime: new Date(ticket.enterTime),
                exitTime:new Date( ticket.exitTime),
                ticketDate: new Date(ticket.ticketDate),
                ticketNotes: ticket.ticketNotes,
            })
        }
    }, [form, ticket]);
    console.log(ticket)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(staffForDb, values)
    }

    const ChangeableStaff = () => {
        return (
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                        {t("update_ticket_jobs_decs")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("name")}</TableHead>
                                <TableHead>{t("extra_price")}</TableHead>
                                <TableHead>{t("extra_time")}</TableHead>
                                <TableHead>{t("title")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                ticket?.jobs?.length > 0 && ticket?.jobs?.map((job:any) => (
                                    <TableRow key={job.id}>
                                        <TableCell className="font-semibold truncate ">
                                            {`${job.users.firstName} ${job.users.lastName}`}
                                        </TableCell>

                                        <TableCell>
                                            <Label htmlFor={job.id} className="sr-only">
                                                {t("extra_price")}
                                            </Label>
                                            <Input
                                                id={job.id}
                                                type="text"
                                                defaultValue={job.extraPrice}
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <Label htmlFor={job.id+"+&"} className="sr-only">
                                                {t("extra_time")}
                                            </Label>
                                            <Input
                                                id={job.id+"+&"}
                                                type="text"
                                                defaultValue={job.extraTime}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                defaultValue={job.title}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("select_roles")}/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>{t("title")}</SelectLabel>
                                                        {TITLES.map((role) => {
                                                            return (
                                                                <SelectItem key={role.value}
                                                                            value={role.value}
                                                                >{role.label}</SelectItem>
                                                            )
                                                        })}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>

            </Card>
        )
    }
    const WhoIsCreate =()=>{
        return (
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>{t("creator")}</CardTitle>
                    <CardDescription className="capitalize">{`${ticket.user.firstName} ${ticket.user.lastName}`}</CardDescription>
                </CardHeader>
            </Card>
        )
    }
    if(!ticket) return null
    if(!ticket.user) return null
    return (
        <div>
            <NameWithBack name={t("ticket")} desc={"update"}/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className=" grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mt-4">
                    <WhoIsCreate />
                    <TicketDetailCard className="col-span-4" form={form} label={"update_ticket"}
                                      labelDesc={"update_tickets_desc"}/>
                    <ChangeableStaff/>
                    <Button className="col-span-4" type="submit">{t("update")}</Button>
                </form>
            </Form>
        </div>
    );
};

export default Page;