"use client"

import React, {useCallback} from 'react';
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import Modal from "@/components/ui/modal";
import {GetCompanies} from "@/api/company";
import {Company} from "@/types";
import useRoute from "@/hooks/useRoute";

const Page = () => {
    const t = useTranslations("index")
    const route = useRoute()
    const [selectedValue, setSelectedValue] = React.useState("")
    const {data: companies} = GetCompanies()
    const returnData = useCallback(() => {
        return companies?.map((item: Company) => {
            return {label: item.name, value: item.id}
        })
    }, [companies])
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">{t("tickets")}</h1>
            </div>
            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                x-chunk="dashboard-02-chunk-1"
            >
                <Modal select label={t("create_new_ticket")} selectedValue={selectedValue} name={t("company")}
                       setSelectedValue={setSelectedValue} list={returnData()} buttonTitle={t("continue")}
                       cancelButtonTitle={t("cancel")}
                       onSubmit={(e: any) => route(e, `new/${selectedValue}`)}
                />
            </div>
        </div>
    );
};

export default Page;