import React, {useEffect, useMemo, useState} from 'react';
import {Form} from "@/components/ui/form";
import {
    FormDatePicker,
    FormMultiSelectWithSearch, FormSelectInput,
    FormSelectWithSearch,
    FormTextArea,
    FormTextInput
} from "@ui";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {gender, TITLES} from "@/config/enums";
import {useToast} from "@/components/ui/use-toast"
import {useTranslations} from "next-intl";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {GetDistricts, GetProvinces} from "@/api/province";
import {Staff} from "@/types";
import {Label} from "@/components/ui/label";
import {SetStaff, UpdateStaff} from "@/api/staff";

const turkishPhoneNumberRegex = /^(\+90|0)?\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/;


const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    identity: z.string().length(11, {
        message: "Identity must be exactly 11 characters.",
    }),
    iban: z.string().refine(iban => /^TR\d{23}$/i.test(iban), {
        message: "IBAN must start with TR and be exactly 26 characters long.",
    }),
    gender: z.string(),
    phone: z.string().refine((value) => turkishPhoneNumberRegex.test(value), {
        message: "Invalid phone number format"
    }),
    birthDate: z.string(),
    titles: z.string().array(),
    provinceId: z.string().length(36, {message: "Format error"}).optional(),
    districtId: z.string().length(36, {message: "Format error"}).optional(),
    addressDetail: z.string().min(3, {message: ""}).optional(),
});

type Props = {
    defaultValues?: Staff
    buttonTitle?: string
}

const cleanValues = {
    firstName: "",
    lastName: "",
    identity: "",
    iban: "",
    gender: "",
    birthDate: "",
    phone: "",
    titles: []
}

export const UserForm = (props: Props) => {
    const {defaultValues, buttonTitle} = props
    const t = useTranslations("index")
    const {toast} = useToast()
    const [errorMessage,setError] = useState("")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => defaultValues, [defaultValues])
    })
    const {mutateAsync: newStaff, data, error, isSuccess: newSuccess} = SetStaff()
    const {mutateAsync: updateStaff, isSuccess: updateSuccess} = UpdateStaff()
    const {data: provinces, refetch: refecthProvinces} = GetProvinces()
    const {data: districts} = GetDistricts(form.watch("provinceId"))

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const staff = {
            firstName: values.firstName.toLowerCase(),
            lastName: values.lastName.toLowerCase(),
            identity: values.identity,
            iban: values.iban.toLowerCase(),
            gender: values.gender.toLowerCase(),
            birthDate: new Date(values.birthDate).toISOString(),
            titles: values.titles,
            addressDetail: values.addressDetail?.toLowerCase(),
            districtId: values.districtId,
            provinceId: values.provinceId,
            phone: values.phone
        };

        try {
            if (defaultValues === undefined) {
                await newStaff(staff);
            } else {
                const {identity, ...staffData} = staff
                await updateStaff({id: defaultValues?.id, ...staffData});
            }
        } catch (error:any) {
            setError(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        if (newSuccess || updateSuccess) {
            form.reset();
            toast({
                title: `Kullanıcı başarılı bir şekilde ${newSuccess ? "eklendi" : "güncellendi"}`,
                description: `Kullanıcı ${newSuccess ? "eklendi" : "güncellendi"} artık listeleniyor.`
            });
            setError("")
        }
    }, [newSuccess, form, toast, updateSuccess]);

    useEffect(() => {
        form.reset(defaultValues); // Reset with default values on change
    }, [defaultValues, form]);

    useEffect(() => {
        if (!provinces) {
            refecthProvinces().then(r => {
            })
        }
    }, [provinces, refecthProvinces]);

    return (
        <Form {...form}>
                <Label>{errorMessage}</Label>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                <Card className="sm:col-span-2 md:col-span-2  col-span-1">
                    <CardHeader>
                        <CardTitle>{t("staff")}</CardTitle>
                        <CardDescription>{t("new_staff_desc")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormTextInput form={form} name="firstName" label="Ad" placeholder="Adı"/>
                        <FormTextInput form={form} name="lastName" label="Soyad" placeholder="Soyad"/>
                        {!defaultValues?.id ?
                            <FormTextInput form={form} name="identity" label="TC" placeholder="12345678921"
                                           description="TC ve isim uygunluğu sağlanmalı"/> : null}
                        <FormTextInput form={form} name="iban" label="IBAN"
                                       placeholder="TR123456789012345678901234"/>
                        <FormTextInput form={form} name="phone" label={t("phone")} placeholder="5343297414"/>
                        <FormSelectInput form={form} name="gender" label={t("gender")} placeholder={t("gender")}
                                         data={gender || []}/>
                        <FormDatePicker form={form} name="birthDate" label={t("date_of_birth")}
                                        description="Doğum tarihi yaş bilgisi için önemli."/>
                        <FormMultiSelectWithSearch form={form} name="titles" label={t("titles")} data={TITLES}
                        />
                    </CardContent>
                </Card>

                <Card className="sm:col-span-2 md:col-span-2  col-span-1">
                    <CardHeader>
                        <CardTitle>{`${t("address")} (${t("opsiyonel")})`}</CardTitle>
                        <CardDescription>{t("address_decs")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormSelectWithSearch form={form} name="provinceId" label={t("city")} placeholder={t("city")}
                                              data={provinces || []}/>
                        <FormSelectWithSearch form={form} name="districtId" label={t("district")}
                                              placeholder={t("district")} data={districts}/>
                        <FormTextArea form={form} label={t("address_detail")} name="addressDetail"/>
                    </CardContent>
                </Card>
                <Button className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-3 py-5"
                        type="submit">{t(buttonTitle || "submit")}</Button>
            </form>
        </Form>
    );
};
