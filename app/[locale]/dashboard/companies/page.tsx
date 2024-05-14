"use client"

import React from 'react';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {CustomTable} from "@business";
import {GetCompanies} from "@/api/company";
import {useTranslations} from "next-intl";
import {companyColums} from "@/config/companyTableData";

const Page = () => {
    const t = useTranslations("index")
    const {data} = GetCompanies()
    return (
        <div>
            <CustomTable columns={companyColums} data={data} searchFilterParam={"name"}
                         searchPlaceholder={"Search Company..."}/>
        </div>

    );
};

export default Page;