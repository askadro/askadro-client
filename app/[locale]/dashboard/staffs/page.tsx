"use client"

import React from 'react';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {CustomTable} from "@business";
import {useTranslations} from "next-intl";
import {staffsColums} from "@/config/usersTableData";
import {GetStaffs} from "@/api/staff";

const Page = () => {
    const t = useTranslations("index")
    const [rowSelection, setRowSelection] = React.useState({})

    const {data: staffs} = GetStaffs()
    return (
        <div>
            <CustomTable rowSelection={rowSelection}
                         setRowSelection={setRowSelection}
                         columns={staffsColums} data={staffs[0]}
                         searchFilterParam={"firstName"}
                         searchPlaceholder={"Search staff with name..."}
                         addTitle={"add_staff"}
            />
        </div>
    );
};

export default Page;