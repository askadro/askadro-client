"use client"
import React from 'react';
import {CompanyForm,} from "@business";
import {useRouter,} from "next/navigation";
import {useTranslations} from "next-intl";
import NameWithBack from "@/components/ui/NameWithBack";

const CompanyDetail = () => {
    const t = useTranslations("index")

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <NameWithBack name={t("back")}/>
            <CompanyForm/>
        </main>

    );
};

export default CompanyDetail;