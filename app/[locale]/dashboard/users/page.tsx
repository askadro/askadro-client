"use client"

import React from 'react';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {CustomTable} from "@business";
import {useTranslations} from "next-intl";
import {GetUsers} from "@/api/user";
import {usersColums} from "@/config/usersTableData";

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
                         searchPlaceholder={"Search users with name..."}/>
        </div>
    );
};

export default Page;