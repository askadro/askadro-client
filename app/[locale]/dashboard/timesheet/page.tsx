"use client"

import React, {useState} from 'react';
import useRoute from "@/hooks/useRoute";
import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const Page = () => {
    const route = useRoute()
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

    return (
        <div>
            <Button onClick={(e) => route(e, `new/${format(selectedDate as Date,"MM-dd-yyyy")}`)}>go new page</Button>
        </div>
    );
};

export default Page;