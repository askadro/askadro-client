import React, {useEffect, useMemo, useState} from 'react';
import {z} from "zod";
import {useToast} from "@/components/ui/use-toast";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Authorized, FormSelectInput, FormTextInput} from "@ui";
import {GetProvinces} from "@/api/province";
import {SetCompany, UpdateCompany} from "@/api/company";
import {UpdateCompanyType} from "@/types/Company";
import {Label} from "@/components/ui/label";
import {useTranslations} from "next-intl";


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const formSchema = z.object({
    name: z.string().min(2, {}),
    phone: z.string().min(2, {}),
    city: z.string().min(2, {}),
    location: z.string().min(2, {}),
    registrationNumber: z.string().min(2, {}),
    timeOfPayment: z.string().min(2, {}),
    totalWorkingTime: z.string().min(2, {}),
    password: z.string().min(2, {}),
    shortName: z.string().min(2, {}),
    logo: z.string().min(2, {}),
})

const cleanValues = {
    name: "",
    phone: "",
    city: "70c5216e-9f0b-4102-8ad6-018c4c9600fa",
    location: "",
    registrationNumber: "",
    timeOfPayment: "",
    totalWorkingTime: "",
    password: "",
    shortName: "",
    logo: ""
}

type Props = {
    defaultValues?: UpdateCompanyType
    id?: string | string[] | undefined
    buttonTitle?: string
}

const getDefaultCityValue = (cityValue?: string): string => {
    return cityValue || "70c5216e-9f0b-4102-8ad6-018c4c9600fa";
};

export const CompanyForm = (props: Props) => {
    const {defaultValues, id, buttonTitle} = props
    const {toast} = useToast()
    const t = useTranslations("index")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => {
            return {
                ...defaultValues,
                city: getDefaultCityValue(defaultValues?.city)
            };
        }, [defaultValues]),
    })
    const {data: provinces} = GetProvinces()
    const {mutateAsync: newCompany, isSuccess: newCompanySuccess} = SetCompany()
    const {mutateAsync: updateCompany, isSuccess: updateSuccess} = UpdateCompany()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (defaultValues === undefined) {
            await newCompany(values)
        } else {
            // const {Identity,...v} = values
            await updateCompany({...values, id: defaultValues?.id})
        }
    }


    useEffect(() => {
        if (newCompanySuccess || updateSuccess) {
            form.reset(cleanValues); // Reset the form on successful submission
            toast({
                title: `Kullanıcı başarılı bir şekilde ${newCompanySuccess ? "eklendi" : "güncellendi"}`,
                description: `Kullanıcı ${newCompanySuccess ? "eklendi" : "güncellendi"} artık listeleniyor.`
            });
        }
    }, [newCompanySuccess, form, toast, updateSuccess]);

    useEffect(() => {
        form.reset(defaultValues); // Reset with default values on change
    }, [defaultValues, form]);
    if (!provinces) return null

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormTextInput form={form} name="name" label="Şirket Adı" placeholder={"As Kadro"}/>
                <FormTextInput form={form} name="phone" type="tel" label="Phone" placeholder={"0532 125 12 22"}/>
                <FormSelectInput form={form} name="city" label="City" data={provinces || []}/>
                <FormTextInput form={form} name="location" label="Semt" placeholder={"Sultanbeyli"}/>
                <FormTextInput form={form} name="registrationNumber" label="Vergi No" placeholder={"456743484"}/>
                <FormTextInput form={form} name="timeOfPayment" type="number" label="Ayın Kaçında Ödeme Yapılacak"
                               placeholder={"25"} description={t("what_month")}/>
                <FormTextInput form={form} name="registrationNumber" type="number" label="Vergi Nuamrası"
                               placeholder={"456743484"}/>
                <FormTextInput form={form} name="totalWorkingTime" type="number" label="Çalışma Saati"
                               placeholder={"8"} description={"how_work_hour"} defaultValue={8}/>
                <Authorized />
                <Button type="submit">{t(buttonTitle || "submit")}</Button>
            </form>
        </Form>
    );
};

