"use client"

import React from 'react';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {CustomTable} from "@business";
import {useTranslations} from "next-intl";
import {GetUsers} from "@/api/user";
import {usersColums} from "@/config/usersTableData";
import {DatePicker} from "@/components/ui/DatePicker";

const Page = () => {
    const t = useTranslations("index")
    const [rowSelection, setRowSelection] = React.useState({})

    const {data: user} = GetUsers()
    return (
        <div>
            <CustomTable rowSelection={rowSelection}
                         setRowSelection={setRowSelection}
                         columns={usersColums} data={user}
                         searchFilterParam={"firstName"}
                         searchPlaceholder={"Search users with name..."}
                         addTitle={"add_staff"}
            />
        </div>
    );
};

export default Page;