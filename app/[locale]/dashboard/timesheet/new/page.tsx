"use client"
import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {getDaysInMonth} from "date-fns"

const Page = () => {
    const monthDays = getDaysInMonth(new Date())
    return (
        <div>
            <div className="flex flex-row items-center ">
                <Label>Hakan dursun</Label>
                <Input className="w-6 h-6 p-0 m-0" maxLength={2}/>
            </div>
        </div>
    );
};

export default Page;