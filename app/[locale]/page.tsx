"use client"

import * as React from "react"
import {GetCompanies} from "@/api/company";
import {CustomTable} from "@business";
import {companyColums} from "@/config/companyTableData";


export default function DataTableDemo() {
    const {data} = GetCompanies()

    return (
        <CustomTable columns={companyColums} data={data} searchFilterParam={"name"} searchPlaceholder={"Search Company..."} />
    )
}
