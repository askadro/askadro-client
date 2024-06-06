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
import {GetTicket, SendMailTicket, UpdateTicket} from "@/api/ticket";
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
import {isEqual} from "lodash";
import {cn} from "@/lib/utils";
import {useToast} from "@/components/ui/use-toast";
import {Job} from "@/types/JobType";

const formSchema = z.object({
    enterTime: z.date(),
    exitTime: z.date(),
    ticketDate: z.date(),
    ticketNotes: z.string().optional(),
})

const Page = () => {
    const t = useTranslations("index")
    const params: { id: string } | null = useParams()
    const {toast} = useToast()
    const {data: ticket, refetch: refecthTicket} = GetTicket(params?.id)
    const {data: users} = GetUsers()
    const {mutate: deleteJob, isSuccess: deleteSuccess} = DeleteJob()
    const {mutate: updateJob, isSuccess: updateJobSuccess, data: updateData, reset: resetUpdateJob} = UpdateJob()
    const {mutate: updateJobWithTicket, isSuccess: newJobSuccess} = NewJobWithTicket()
    const {mutateAsync: updateTicket, isSuccess: updateTicketSuccess, reset: resetUpdateTicket} = UpdateTicket()


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
    const callToast = (title: string, desc?: string, variant?: boolean) => {
        return toast({
            className: cn(
                'bottom-0 left-0 flex fixed md:max-w-[420px] md:bottom-4 md:left-4'
            ),
            title: title,
            description: desc ? desc : null,
            variant: variant ? "destructive" : "default",
        })
    }

    useEffect(() => {
        if (newJobSuccess || deleteSuccess) {
            refecthTicket(ticket.id).then(() => callToast("Yeni işler talebe eklendi"))
        }
        if (updateJobSuccess) {
            callToast("İş güncellendi")
            const resetTimer = setTimeout(() => resetUpdateJob(), 1500)
            return () => clearTimeout(resetTimer)
        }
        if (updateTicketSuccess) {
            callToast("Talep detayı güncellendi")
            const resetTicketTimer = setTimeout(() => resetUpdateTicket(), 1500)
            return () => clearTimeout(resetTicketTimer)
        }

    }, [newJobSuccess, refecthTicket, updateJobSuccess, deleteSuccess, resetUpdateJob, updateTicketSuccess, resetUpdateTicket]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await updateTicket({...values, id: ticket.id})
        console.log(values)
    }

    const getAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    const returnData = useCallback(() => {
        const filteredUser = users?.filter((u: User) => u.id !== ticket?.jobs?.find((i: Job) => i.users.id === u.id)?.users?.id)
        return filteredUser?.map((item: User) => {
            return {label: item.firstName + " " + item.lastName, value: item.id, age: getAge(item.birthDate)}
        })
    }, [ticket?.jobs, users])

    const updateTicketJobs = async (values: { jobs: any[]; }) => {
        updateJobWithTicket(values);
    };

    if (!ticket) return null
    if (!ticket.user) return null
    if (!ticket.company) return null
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
                                                <Button
                                                    className={updateJobSuccess && updateData.id === job.id ? "bg-green-500" : ""}
                                                    disabled={updateJobSuccess && updateData.id === job.id}
                                                    onClick={() => updateJob({
                                                        id: job.id,
                                                        title: job.title,
                                                        extraTime: job.extraTime,
                                                        extraPrice: job.extraPrice
                                                    })} size="sm">
                                                    {updateJobSuccess && updateData.id === job.id ? t("updated") : t("update")}
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


    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <NameWithBack name={t("ticket")} desc={"update"}/>
                <Modal mail
                       to={ticket?.company?.name}
                       label={t("send_mail")}
                       data={ticket}
                       buttonTitle={t("send")}/>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className=" grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mt-4">
                    <WhoIsCreate/>
                    <TicketDetailCard className="col-span-4" form={form} label={"update_ticket"}
                                      labelDesc={"update_tickets_desc"}/>

                    <Button className={`col-span-4 mb-4 ${updateTicketSuccess ? "bg-green-500" : ""}`} type="submit">
                        {updateTicketSuccess ? t("updated") : t("update")}
                    </Button>
                </form>
                <ChangeableStaff jobs={ticket?.jobs}/>
            </Form>
        </div>
    );
};

export default Page;