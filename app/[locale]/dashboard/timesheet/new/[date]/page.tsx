"use client";
import React, {useCallback, useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {format, formatISO, getDaysInMonth, parseISO} from "date-fns";
import {AddTimesheet, GetTimesheetWithMonth, UpdateTimesheetWithId} from "@/api/timesheet";
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
import {Company, Staff} from "@/types";
import {GetCompanies} from "@/api/company";
import Modal from "@/components/ui/modal";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Calendar as CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {Search, SelectInputWithSearch} from "@ui";
import {GetStaffs} from "@/api/staff";
import {Option} from "@/components/ui/Search";

const Page = () => {
    const t = useTranslations("index")

    const [date, setSelectedDate] = useState<Date | undefined>(new Date())
    const [hourText, setHourText] = useState<any>(0);
    const [timesheetData, setTimesheetData] = useState<any[]>([]);
    const [selectedCompany, setSelectedCompany] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [isDisabled, setDisabled] = useState(false)
    const [selectedStaff, setSelectedStaff] = useState<Option>({label: "", value: ""})

    const {mutate: timesheetMutate} = GetTimesheetWithMonth();
    const {mutate: updateTimesheet, data: updatedTimesheet} = UpdateTimesheetWithId()
    const {data: companies} = GetCompanies()
    const {data: staffs} = GetStaffs()
    const {mutate: addTimesheet} = AddTimesheet()

    const chosingDate = new Date(date as Date)
    const month = chosingDate.getMonth();
    const year = chosingDate.getFullYear();
    const selectedDay = new Date();
    selectedDay.setMonth(month);
    const monthName = format(selectedDay, "LLLL", {locale: tr});
    const monthDays = getDaysInMonth(selectedDay);


    const returnCompanies = useCallback(() => {
        return companies?.map((item: Company) => {
            return {label: item.name, value: item.id}
        })
    }, [companies])

    const returnStaffs = useCallback(() => {
        const staffsAll = staffs?.[0];

        if (!staffsAll) return [];

        const timesheetStaffIds = timesheetData?.map(t => t.staff.id);

        const filteredStaffs = staffsAll?.filter((staff: Staff) => {
            return !timesheetStaffIds?.includes(staff.id);
        });

        return filteredStaffs?.map((item: Staff) => {
            return {label: item.firstName + " " + item.lastName, value: item.id};
        });
    }, [staffs, timesheetData]);


    useEffect(() => {
        const timesheetStaffs = {
            staff: staffs?.[0]?.find((s: Staff) => {
                if (s.id === selectedStaff?.value) return s
            }), dates: []
        }
        if (timesheetStaffs && timesheetStaffs?.staff?.id) {
            setTimesheetData((data: any) => [...data, timesheetStaffs])
        }
    }, [selectedStaff, staffs]);

    const letsListTimesheet = () => {
        timesheetMutate({companyId: selectedCompany, date: chosingDate.toISOString()}, {
            onSuccess: (data) => {
                console.log("data: ", data)
                setTimesheetData(data);
            }
        });
    }

    useEffect(() => {
        if (selectedCompany && chosingDate) {
            letsListTimesheet()
        }
    }, [selectedCompany, date]);

    const addTimesheetMethod = (staffId: any, date: number, hours: number) => {
        const currentDate = new Date(year, month, date + 1)
        addTimesheet({
            companyId: selectedCompany,
            date: currentDate.toISOString(),
            hoursWorked: hours,
            staffId: staffId,
        })
    }

    const handleAddTimesheet = (staffId: string | string[] | undefined, date: number, hours: number) => {
        const utcDate = new Date(year, month, date);
        const formattedDate = formatISO(utcDate);
        console.log("formattedDate: ", formattedDate)
        addTimesheet({
            companyId: selectedCompany,
            date: formattedDate,
            hoursWorked: hours,
            staffId: staffId,
        }, {
            onSuccess: (newTimesheet) => {
                console.log("newTimesheet: ", newTimesheet)
                setTimesheetData((prevData: any[]) => {
                    const existingStaffIndex = prevData.findIndex(ts => ts.staff.id === newTimesheet.staff.id);
                    if (existingStaffIndex > -1) {
                        // Existing staff, add new date
                        const updatedStaff = {
                            ...prevData[existingStaffIndex],
                            dates: [...prevData[existingStaffIndex].dates, {
                                id: newTimesheet.id,
                                date: newTimesheet.date+1,
                                hours: newTimesheet.hoursWorked,
                            }]
                        };
                        return [
                            ...prevData.slice(0, existingStaffIndex),
                            updatedStaff,
                            ...prevData.slice(existingStaffIndex + 1)
                        ];
                    } else {
                        // New staff, add new staff and date
                        const newStaff = {
                            staff: {
                                id: newTimesheet.staff.id,
                                firstName: newTimesheet.staff.firstName,
                                lastName: newTimesheet.staff.lastName,
                                // Add other staff properties as needed
                            },
                            dates: [{
                                id: newTimesheet.id,
                                date: newTimesheet.date+1,
                                hours: newTimesheet.hoursWorked,
                            }]
                        };
                        return [...prevData, newStaff];
                    }
                });
            }
        });
    };


    const handleUpdateTimesheet = (id: string, newHours: number) => {
        updateTimesheet({id, hoursWorked: newHours}, {
            onSuccess: (updatedData) => {
                console.log("updatedData: ", updatedData)
                setTimesheetData((prevData: any[]) => {
                    return prevData.map(ts => {
                        if (ts.dates.some((date: { id: any; }) => date.id === updatedData.id)) {
                            return {
                                ...ts,
                                dates: ts.dates.map((date: { id: any; }) =>
                                    date.id === updatedData.id
                                        ? {...date, hours: updatedData.hoursWorked}
                                        : date
                                )
                            }
                        }
                        return ts;
                    });
                });
            }
        });
    };

    const staffLabel = (staff: Staff) => <Label
        className="capitalize truncate">{`${staff.firstName} ${staff.lastName}`}</Label>

    const returnDialog = (staff: Staff, timesheetId: string, title: string, date: number, defaultValues: number = 8) => {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full h-full p-0 m-0">{title}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{staffLabel(staff)} - {`${date} ${monthName}`}</DialogTitle>
                        <DialogDescription>
                            {t("change_or_create_ts_hour_decs")}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input value={Number(hourText)} type="number" placeholder="8"
                               onChange={(e) => setHourText(e.target.value)}
                               defaultValue={Number(defaultValues)}/>
                        <Button type="submit" onClick={() => {
                            timesheetId ? handleUpdateTimesheet(timesheetId, Number(hourText)) :
                                handleAddTimesheet(staff?.id, date, Number(hourText))
                        }}>{t(timesheetId ? "update" : "create")}</Button>
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
                    {timesheetData?.map((ts: any) => (
                        <div key={ts.staff.id} className="flex flex-row gap-1 mb-1">
                            <div className="w-[120px]">
                                {staffLabel(ts?.staff)}</div>
                            {Array.from({length: monthDays}).map((_, index) => {
                                const day = index + 1;
                                const isPresent = ts?.dates && ts.dates.length > 0 && ts.dates?.find((dateObj: any) => {
                                    const date = new Date(parseISO(dateObj.date));
                                    date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // UTC to local time
                                    return date.getMonth() === selectedDay.getMonth() && date.getDate() === day
                                });
                                const hours = isPresent ? isPresent.hours : "";
                                const timesheetId = isPresent ? isPresent.id : "";
                                return (
                                    <div key={index} className="flex justify-center w-6 h-6">
                                        {returnDialog(ts?.staff, timesheetId, hours, day)}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const DateTableComponent = () => {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setSelectedDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        )
    }


    return (
        <div>
            <div className="flex flex-row gap-4 mb-4">
                <DateTableComponent/>
                <SelectInputWithSearch data={returnCompanies()} label={t("company")}
                                       onSelect={setSelectedCompany} value={selectedCompany}/>
            </div>
            {selectedCompany ? <div className="mb-4">
                <Search options={returnStaffs()}
                        emptyMessage="No resulsts."
                        placeholder={t("search_staff")}
                        isLoading={isLoading}
                        onValueChange={setSelectedStaff}
                        value={selectedStaff}
                        disabled={isDisabled}/>
            </div> : null}
            {selectedCompany ? returnDateLength() : null}
        </div>
    );
};

export default Page;
