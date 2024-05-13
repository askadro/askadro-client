import React from 'react';
import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation";
import {useTranslation} from "next-i18next";

type Props = {
    name:String
    desc?:string
}

const NameWithBack = ({name,desc}:Props) => {
    const router = useRouter()
    const {t} = useTranslation()
    return (
        <div className="flex items-center gap-4">
            <Button onClick={() => router.back()} variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4"/>
                <span className="sr-only">{t("back")}</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 capitalize">
                {name || ""}
            </h1>
            <Badge variant="outline" className="ml-auto sm:ml-0">
                {desc || ""}
            </Badge>
        </div>
    );
};

export default NameWithBack;