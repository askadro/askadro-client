"use client"

import React from 'react';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {CustomTable} from "@business";
import {GetCompanies} from "@/api/company";
import {companyColums} from "@/config/companyTableData";
import {Button} from "@/components/ui/button";

const Page = () => {
    const [rowSelection, setRowSelection] = React.useState({})
    const {data: companies} = GetCompanies()
    console.log(companies)
    return (
        <div>
            <CustomTable
                rowSelection={rowSelection} setRowSelection={setRowSelection} columns={companyColums}
                data={companies}
                searchFilterParam={"name"}
                searchPlaceholder={"Search Company..."}
                addTitle={"add_company"}
            />
        </div>

    );
};

export default Page;