"use client"
import React from 'react';
import {CompanyForm,} from "@business";
import {useParams} from "next/navigation";
import {GetCompany} from "@/api/company";
import {useTranslations} from "next-intl";
import NameWithBack from "@/components/ui/NameWithBack";


const CompanyEdit = () => {
    const t = useTranslations("index")
    const params = useParams()
    const {data, isLoading, isSuccess, error, refetch: refecthUser} = GetCompany(params?.id)

    if (!data) return null
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <NameWithBack name={t("back")}/>
            <CompanyForm defaultValues={data} id={data.id} buttonTitle={t("save")}/>
        </main>

    );
};

export default CompanyEdit;