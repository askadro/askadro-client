"use client"
import React, {useEffect, useState} from 'react';
import {useRouter, useParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ChevronLeft, PlusCircle} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DeleteCompany, GetCompany} from "@/api/company";
import {Company} from "@/types/Company";
import NameWithBack from "@/components/ui/NameWithBack";
import {useTranslations} from "next-intl";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {useToast} from "@/components/ui/use-toast";
import {cn} from "@/lib/utils";


const CompanyDetail = () => {
    const t = useTranslations("index")
    const params = useParams()
    const {toast} = useToast()
    const router = useRouter()
    const {data, isLoading, isSuccess, error, refetch: refecthUser} = GetCompany(params?.id)
    const {mutateAsync: deleteCompany, isSuccess: deleteSuccess} = DeleteCompany()
    const [company, setCompany] = useState<Company | null>(data)
    useEffect(() => {
        if (isSuccess) {
            setCompany(data)
        }
        if (deleteSuccess) {
            toast({
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                title: "Company deleted successfully",
                description: "Şirket kalıcı olarak silinmiştir.",
                variant: "destructive",
            })
            router.back()
        }
    }, [data, isLoading, isSuccess, deleteSuccess, toast, router]);
    if (!data || !company) return null
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="flex flex-row justify-between gap-4">
                <NameWithBack name={company?.name} desc={company?.shortName}/>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="destructive">{t("delete")}</Button>
                    </SheetTrigger>
                    <SheetContent side="bottom">
                        <SheetHeader>
                            <SheetTitle>{t("delete_title")}</SheetTitle>
                            <SheetDescription>
                                {t("delete_decs")}
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">
                                    {t("name")}
                                </Label>
                                <Label>
                                    {company.name}
                                </Label>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">
                                    {t("short_name")}
                                </Label>
                                <Label>
                                    {company.shortName}
                                </Label>
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button onClick={() => deleteCompany(company.id)} variant="destructive"
                                        type="submit">{t("delete")}</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </main>

    );
};
{/*<UserForm defaultValues={data} id={params?.id} />*/
}

export default CompanyDetail;