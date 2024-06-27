"use client";
import React, {useEffect} from "react";
import {Label} from "@/components/ui/label";
import {format, getDaysInMonth, parseISO} from "date-fns";
import {useParams} from "next/navigation";
import {GetTimesheetWithMonth} from "@/api/timesheet";
import {tr} from "date-fns/locale";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {useTranslations} from "next-intl";

const Page = () => {
    const t = useTranslations("index")
    const {month} = useParams() as any;
    const selectedDay = new Date();
    selectedDay.setMonth(month - 1);
    const monthName = format(selectedDay, "LLLL", {locale: tr});
    const monthDays = getDaysInMonth(selectedDay);
    const {mutate: timesheetMutate, data: timesheet} = GetTimesheetWithMonth();

    useEffect(() => {
        timesheetMutate({companyId: "32151e76-b198-4709-a678-b7f389452d7f", month: Number(month), year: 2024});
    }, [month, timesheetMutate]);

    const returnDialog = (title: string, date: number, defaultValues: number = 8) => {
        console.log(date)
        const currentDay = selectedDay.getMonth() + 1
        const selectedDate = new Date(currentDay);
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full h-full p-0 m-0">{title}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{t("change_or_create_ts_hour")}</DialogTitle>
                        <DialogDescription>
                            {t("change_or_create_ts_hour_decs")}
                            {date}
                            {currentDay}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="text" placeholder="8" defaultValue={defaultValues}/>
                        <Button type="submit">{t("update")}</Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                {t("close")}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    const returnDateLength = () => {
        return (
            <div className="mb-2 gap-2">
                <div>
                    <div className="flex flex-row gap-1 mb-3">
                        <div className="w-[120px]">
                            <div className="truncate">{monthName}</div>
                        </div>
                        {Array.from({length: monthDays}).map((_, index) => (
                            <div key={index} className="flex justify-center w-6 h-6">
                                <div>{index + 1}</div>
                            </div>
                        ))}
                    </div>
                    {timesheet?.map((ts: any) => (
                        <div key={ts.staff.id} className="flex flex-row gap-1 mb-1">
                            <div className="w-[120px]">
                                <Label
                                    className="capitalize truncate">{`${ts.staff.firstName} ${ts.staff.lastName}`}</Label>
                            </div>
                            {Array.from({length: monthDays}).map((_, index) => {
                                const day = index + 1;
                                const isPresent = ts.dates.find((dateObj: any) => {
                                    const date = new Date(parseISO(dateObj.date));
                                    date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // UTC to local time
                                    return (
                                        date.getMonth() === selectedDay.getMonth() &&
                                        date.getDate() === day
                                    );
                                });
                                const hours = isPresent ? isPresent.hours : "";

                                return (
                                    <div key={index} className="flex justify-center w-6 h-6">
                                        {returnDialog(hours, day)}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            {returnDateLength()}
        </div>
    );
};

export default Page;
