import React from 'react';
import {Typography} from "@/helpers/tailwind-material";
import {NavType} from "@/types/navType";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";

export const NavList = ({list}:{list:NavType[]}) => {
    const router = useRouter()
    const t = useTranslations()
    return  (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {list.map((nav, i) => (
                <Typography
                    key={i.toString()}
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-x-2 p-1 font-medium"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}>
                    <nav.icon/>
                    <Button variant="link" onClick={()=>router.push(nav.path)} className="flex items-center ">
                        {t(nav.title)}
                    </Button>
                </Typography>
            ))}
        </ul>
    );
};
