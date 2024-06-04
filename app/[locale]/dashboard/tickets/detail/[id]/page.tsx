"use client"

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FormSelectInput, FormTextInput, TicketDetailCard} from "@ui";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

import {TITLES} from "@/config/enums";
import {GetTicket} from "@/api/ticket";
import {useParams} from "next/navigation";
import NameWithBack from "@/components/ui/NameWithBack";
import Modal from "@/components/ui/modal";
import {User} from "@/types";
import {GetUsers} from "@/api/user";

import {DeleteJob, NewJobWithTicket, UpdateJob} from "@/api/job";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";

const formSchema = z.object({
    enterTime: z.date(),
    exitTime: z.date(),
    ticketDate: z.date(),
    ticketNotes: z.string().optional(),
})

const Page = () => {
    const t = useTranslations("index")
    const params: { id: string } | null = useParams()
    const {data: ticket, refetch: refecthTicket} = GetTicket(params?.id)
    const {data: users} = GetUsers()
    const {mutate: deleteJob, isSuccess: deleteSuccess} = DeleteJob()
    const {mutate: updateJob, isSuccess: updateJobSuccess, data: updateData, reset: resetUpdateJob} = UpdateJob()
    const {mutate: updateJobWithTicket, isSuccess: newJobSuccess} = NewJobWithTicket()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => ({...ticket}), [ticket])
    })

    useEffect(() => {
        if (ticket) {
            form.reset({
                enterTime: new Date(ticket.enterTime),
                exitTime: new Date(ticket.exitTime),
                ticketDate: new Date(ticket.ticketDate),
                ticketNotes: ticket.ticketNotes,
            })
        }
    }, [form, ticket]);

    useEffect(() => {
        if (newJobSuccess || deleteSuccess) {
            refecthTicket(ticket.id)
        }
        if (updateJobSuccess) {
            const resetTimer = setTimeout(() => resetUpdateJob(), 1500)
            return () => clearTimeout(resetTimer)
        }
    }, [newJobSuccess, refecthTicket, updateJobSuccess, deleteSuccess, resetUpdateJob]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const returnData = useCallback(() => {
        return users?.map((item: User) => {
            return {label: item.firstName + " " + item.lastName, value: item.id}
        })
    }, [users])

    const updateTicketJobs = async (values: { jobs: any[]; }) => {
        updateJobWithTicket(values);
    };

    const ChangeableStaff = ({jobs}: any) => {
        return (
            <Card className="col-span-4">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">

                        <CardTitle>{t("users")}</CardTitle>
                        <CardDescription>
                            {t("update_ticket_jobs_decs")}
                        </CardDescription>
                    </div>
                    <div className="ml-auto gap-1">
                        <Modal users
                               label={t("new_staff")}
                               desc={t("new_staff")}
                               selectLabel={t("select_staff")}
                               list={returnData()}
                               extraData={ticket}
                               buttonTitle={"add"}
                               cancelButtonTitle={t("cancel")}
                               name={t("staff")}
                               onSubmit={updateTicketJobs}/>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t("name")}</TableHead>
                                <TableHead>{t("extra_price")}</TableHead>
                                <TableHead>{t("extra_time")}</TableHead>
                                <TableHead>{t("title")}</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ticket && ticket.jobs && ticket.jobs ? ticket.jobs.map((job: any, index: number) => {
                                return (
                                    <TableRow key={job.id}>
                                        <TableCell className="font-semibold truncate">
                                            {`${job?.users?.firstName} ${job?.users?.lastName}`}
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="text"
                                                defaultValue={job.extraPrice}
                                                onChange={(e) => job.extraPrice = e.target.value}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="text"
                                                defaultValue={job.extraTime}
                                                onChange={(e) => job.extraTime = e.target.value}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                defaultValue={job.title}
                                                onValueChange={(value) => job.title = value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t("select_roles")}/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>{t("title")}</SelectLabel>
                                                        {TITLES.map((role) => (
                                                            <SelectItem key={role.value} value={role.value}>
                                                                {role.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-row items-center gap-2">
                                                <Button className={updateJobSuccess ? "bg-green-500" : ""}
                                                        disabled={updateJobSuccess} onClick={() => updateJob({
                                                    id: job.id,
                                                    title: job.title,
                                                    extraTime: job.extraTime,
                                                    extraPrice: job.extraPrice
                                                })} size="sm">
                                                    {updateJobSuccess ? t("updated") : t("update")}
                                                </Button>
                                                <Button size="sm" variant="destructive"
                                                        onClick={() => deleteJob({id: job.id, ticketId: ticket.id})}>
                                                    {t("delete")}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            }) : null}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )
    }
    const WhoIsCreate = () => {
        return (
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>{t("creator")}</CardTitle>
                    <CardDescription
                        className="capitalize">{`${ticket.user.firstName} ${ticket.user.lastName}`}</CardDescription>
                </CardHeader>
            </Card>
        )
    }
    if (!ticket) return null
    if (!ticket.user) return null
    return (
        <div>
            <NameWithBack name={t("ticket")} desc={"update"}/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className=" grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mt-4">
                    <WhoIsCreate/>
                    <TicketDetailCard className="col-span-4" form={form} label={"update_ticket"}
                                      labelDesc={"update_tickets_desc"}/>

                    <Button className="col-span-4" type="submit">{t("update")}</Button>
                </form>
                <ChangeableStaff jobs={ticket?.jobs}/>
            </Form>
        </div>
    );
};

export default Page;