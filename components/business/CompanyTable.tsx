import React, {useState} from 'react';
import {GetCompanies} from "@/api/company";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {usePathname, useRouter} from "next/navigation";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Company} from "@/types/Company";
import Image from "next/image";
import {Building2, ContactRound, Edit, ListCollapse, Trash} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {formatDistance, subDays} from "date-fns";
import {tr} from "date-fns/locale";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Label} from "@/components/ui/label";
import useRoute from "@/hooks/useRoute";

export const CompanyTable = () => {
    const [sheetData, setSheetData] = useState<Company | null>()
    const {data} = GetCompanies()
    const route = useRoute()

    const t = (key: string) => {
        return key
    }


    const renderTableRow = () => {
        return data?.map((company: Company) => {
            return (
                <TableRow key={company.id} >
                    <TableCell className="hidden sm:table-cell">
                        {
                            company?.logoId ? <Image
                                alt={company?.name}
                                className="aspect-square rounded-md object-cover"
                                height="44"
                                src={company?.logoId}
                                width="44"
                            /> : <Building2 size={44} strokeWidth={1.75}/>
                        }

                    </TableCell>
                    <TableCell className="font-medium">
                        {`${company?.name}`}
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">
                            {company?.shortName}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {t(company?.phone)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">
                            {t(company?.timeOfPayment)}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">
                            {t(company?.totalWorkingTime)}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {formatDistance(subDays(new Date(company?.createdDate), 0), new Date(), {locale: tr})}
                    </TableCell>
                    <TableCell>
                        <div className="row-auto">
                            <Button onClick={(e) => route(e, `detail/${company.id}`)
                            } variant="ghost"
                                    size="icon">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <ListCollapse strokeWidth={1.75}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{t("detail")}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Button>
                            <Button onClick={(e) =>        route(e,`edit/${company.id}`)
                            }
                                    variant="ghost"
                                    size="icon">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Edit size={24} strokeWidth={1.75}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{t("edit")}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Button>
                            <Sheet>
                                <SheetTrigger onClick={() => setSheetData(company)}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Trash size={24} strokeWidth={1.75}/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{t("delete")}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </SheetTrigger>
                                <SheetContent side="bottom">
                                    <SheetHeader>
                                        <SheetTitle>{t("delete_user")}</SheetTitle>
                                        <SheetDescription>
                                            {t("delete_user_decs")}
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                {`${t("do_you_want_delete_user")}`}
                                            </Label>
                                            <Label htmlFor="name">
                                                {`${sheetData?.name}`}
                                            </Label>

                                        </div>

                                    </div>
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <Button type="submit">{t("cancel")}</Button>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Button variant="destructive"
                                                // onClick={() => deleteUser(company?.id)}
                                            >
                                                {t("delete")}</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>

                    </TableCell>
                </TableRow>
            )
        })
    }

    return (
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>{t("companies")}</CardTitle>
                <CardDescription>
                    {t("companies_decs")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">{t("logo")}</span>
                            </TableHead>
                            <TableHead>{t("name")}</TableHead>
                            <TableHead>{t("shortName")}</TableHead>
                            <TableHead>{t("phone")}</TableHead>
                            <TableHead>{t("timeOfPayment")}</TableHead>
                            <TableHead className="hidden md:table-cell">
                                {t("totalWorkingTime")}
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                {t("createdAt")}
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">{t("actions")}</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {renderTableRow()}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

