"use client"

import React, {useEffect, useMemo, useState} from 'react';
import {z} from "zod";
import {useToast} from "@/components/ui/use-toast";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {
    Authorized,
    FormDatePicker,
    FormMultiSelectWithSearch,
    FormSelectInput,
    FormSelectWithSearch, FormTextArea,
    FormTextInput
} from "@ui";
import {GetProvinces} from "@/api/province";
import {SetCompany, UpdateCompany} from "@/api/company";
import {UpdateCompanyType} from "@/types/Company";
import {Label} from "@/components/ui/label";
import {useTranslations} from "next-intl";
import validator from "validator";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {gender, ROLES} from "@/config/enums";
import {address, auth} from "@/helpers/features";


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const formSchema = z.object({
    name: z.string().min(2, {}),
    phone: z.string().min(2, {}),
    location: z.string().min(2, {}),
    registrationNumber: z.string().min(2, {}),
    timeOfPayment: z.string().min(1, {}),
    totalWorkingTime: z.string().min(1, {}),
    shortName: z.string().min(3, {}).optional(),
    logoId: z.string().min(2, {}).optional(),
    username: z.string().min(6, {message: 'Username must be at least 6 characters.'}).optional(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters.'}).optional(),
    city: z.string().length(36, {message: "Format error"}).optional(),
    district: z.string().length(36, {message: "Format error"}).optional(),
    address: z.string().min(3, {message: "Do not allow empty"}).optional(),
    authorized: z.array(
        z.object({
            authorizedEmail: z.string().email("Invalid email format"),
            authorizedPerson: z.string().min(2, "Name must be at least 2 characters long"),
            authorizedPhone: z.string().refine(val => validator.isMobilePhone(val, "tr-TR"), {message: "Invalid phone number (TR format required)"}),
            authorizedTitle: z.string().min(2, "Job title must be at least 2 characters long")
        })
    ).optional()
}).superRefine((data, ctx) => {
    if ((data.username && !data.password) || (!data.username && data.password)) {
        ctx.addIssue({
            code: "custom",
            message: "Both username and password must be provided together.",
            path: ["username"], // or you can put both "username" and "password" in separate calls to addIssue
        });
        ctx.addIssue({
            code: "custom",
            message: "Both username and password must be provided together.",
            path: ["password"],
        });
    }
});


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
    logoId: "",
    authorized: [],
    username: "",
    district: "",
    address: ""
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
    const [authorized, setAuthorized] = React.useState([]);
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
        const company = {
            name: values.name,
            phone: values.phone,
            registrationNumber: values.registrationNumber,
            timeOfPayment: values.timeOfPayment,
            totalWorkingTime: values.totalWorkingTime,
            logoId: values.logoId,
            shortName: values.shortName,
        }
        const payload: any = {company};
        if (auth(values)) payload.auth = auth(values);
        if (address(values)) payload.address = address(values);
        if (values.authorized) payload.authorized = values.authorized

        console.log(payload);
        if (defaultValues === undefined) {
            await newCompany(payload)
        } else {
            await updateCompany({id: defaultValues?.id, ...payload})
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
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2">
                    <CardHeader>
                        <CardTitle>{t("company")}</CardTitle>
                        <CardDescription>{t("new_company_desc")}</CardDescription>
                    </CardHeader>
                    <CardContent>

                        <FormTextInput form={form} name="name" label="Şirket Adı" placeholder={"As Kadro"}/>
                        <FormTextInput form={form} name="shortName" label="Kısa isim" placeholder={"As"}/>
                        <FormTextInput form={form} name="phone" type="tel" label="Phone"
                                       placeholder={"0532 125 12 22"}/>
                        {defaultValues && defaultValues.password ?
                            <FormTextInput form={form} name="password" label={t("password")}
                                           placeholder={"*****"}/> : null}
                        <FormSelectInput form={form} name="city" label="City" data={provinces || []}/>
                        <FormTextInput form={form} name="location" label="Semt" placeholder={"Sultanbeyli"}/>
                        <FormTextInput form={form} name="registrationNumber" label="Vergi No"
                                       placeholder={"456743484"}/>
                        <FormTextInput form={form} name="timeOfPayment" type="number"
                                       label="Ayın Kaçında Ödeme Yapılacak"
                                       placeholder={"25"} description={t("what_month")}/>
                        <FormTextInput form={form} name="totalWorkingTime" type="number" label="Çalışma Saati"
                                       placeholder={"8"} description={t("how_work_hour")} defaultValue={8}/>
                    </CardContent>
                </Card>
                <Authorized/>
                <Card className="sm:col-span-2 xl:col-span-4">
                    <CardHeader>
                        <CardTitle>{`${t("address")} (${t("opsiyonel")})`}</CardTitle>
                        <CardDescription>{t("address_decs")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormSelectWithSearch form={form} name="city" label={t("city")} placeholder={t("city")}
                                              data={provinces || []}/>
                        <FormSelectWithSearch form={form} name="district" label={t("district")}
                                              placeholder={t("district")} data={provinces || []}/>
                        <FormTextArea form={form} label="address" name="address"/>
                    </CardContent>
                </Card>
                <Button className="col-span-4 py-5" type="submit">{t(buttonTitle || "submit")}</Button>
            </form>
        </Form>
    );
};

