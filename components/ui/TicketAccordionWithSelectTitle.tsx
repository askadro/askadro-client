import React from 'react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {User} from "@/types";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
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
import {useTranslations} from "next-intl";

export const TicketAccordionWithSelectTitle = ({data,setJob,titles}:{data:any[],setJob:any,titles:any[]}) => {
    const t = useTranslations("index")
    const changeStaffRole = (v: string, userId: string | string[] | undefined) => {
        setJob((prevStaffs: any) =>
            prevStaffs.map((job: any) =>
                job.userId === userId ? {...job, title: v} : job
            )
        )
    }
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>{`${t("staffs")} (${t("selectable_staff_role")})`}</AccordionTrigger>
                <AccordionContent className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <div
                        className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {data?.map((user: User) => {
                            const fullName = `${user.firstName} ${user.lastName}`.substring(0, 25)
                            return (
                            // @ts-ignore
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
                                            {user?.titles?.toString()}
                                        </p>
                                        <Select
                                            defaultValue={titles[0].value}
                                            onValueChange={(c: string) => changeStaffRole(c, user.id)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t("select_roles")}/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>{t("titles")}</SelectLabel>
                                                    {titles.map((title) => {
                                                        return (
                                                            <SelectItem key={title.value}
                                                                        value={title.value}
                                                            >{title.label}</SelectItem>
                                                        )
                                                    })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

