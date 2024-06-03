import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {FormTimePicker} from "@/components/ui/FormTimePicker";
import {FormDatePickerSha} from "@/components/ui/FormDatePickerSha";
import {FormTextArea} from "@/components/ui/FormTextArea";
import {useTranslations} from "next-intl";

export const TicketDetailCard = ({form,label,labelDesc,className}:{form:any,label?:string,labelDesc?:string,className?:string}) => {
    const t= useTranslations("index")
    return (
        <Card className={className || "sm:col-span-2 xl:col-span-4"}>
            <CardHeader>
                <CardTitle>{`${t(label || "ticket_detail")}`}</CardTitle>
                <CardDescription>{t(labelDesc ||"ticket_desc")}</CardDescription>
            </CardHeader>
            <CardContent>
                <FormTimePicker form={form} label={t("enter_time")} name="enterTime"/>
                <FormTimePicker form={form} label={t("exit_time")} name="exitTime"/>
                <div className="mt-6"/>
                <FormDatePickerSha form={form} name={"ticketDate"} label={t("ticket_date")}/>
                <FormTextArea form={form} name={"ticketNotes"} label={t("notes")}
                              description={t("notes_ticket_decs")}/>
            </CardContent>
        </Card>
    );
};

