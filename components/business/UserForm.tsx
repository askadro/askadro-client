import React, {useEffect, useMemo} from 'react';
import {Form} from "@/components/ui/form";
import {
    FormDatePicker,
    FormMultiSelectWithSearch,
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
import {SetUser, UpdateUser} from "@/api/user";
import {useToast} from "@/components/ui/use-toast"
import {useTranslations} from "next-intl";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {GetDistricts, GetProvinces} from "@/api/province";
import {User} from "@/types";

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
    birthDate: z.string(),
    titles: z.string().array(),
    username: z.string().min(6, {message: 'Username must be at least 6 characters.'}).optional(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters.'}).optional(),
    provinceId: z.string().length(36, {message: "Format error"}).optional(),
    districtId: z.string().length(36, {message: "Format error"}).optional(),
    addressDetail: z.string().min(3, {message: ""}).optional(),
}).superRefine((data, ctx) => {
    if ((data.username && !data.password) || (!data.username && data.password)) {
        ctx.addIssue({
            code: "custom",
            message: "Both username and password must be provided together.",
            path: ["username"],
        });
        ctx.addIssue({
            code: "custom",
            message: "Both username and password must be provided together.",
            path: ["password"],
        });
    }
});

type Props = {
    defaultValues?: User
    buttonTitle?: string
}

const cleanValues = {
    firstName: "",
    lastName: "",
    identity: "",
    iban: "",
    gender: "",
    addressDetail: "",
    districtId: "",
    provinceId: "",
    password: "",
    username: "",
    birthDate: "",
    titles: []
}

export const UserForm = (props: Props) => {
    const {defaultValues, buttonTitle} = props
    const t = useTranslations("index")
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => defaultValues, [defaultValues])
    })
    const {mutateAsync: newUser, data, error, isSuccess: newSuccess} = SetUser()
    const {mutateAsync: updateUser, isSuccess: updateSuccess} = UpdateUser()
    const {data: provinces, refetch: refecthProvinces} = GetProvinces()
    const {data: districts} = GetDistricts(form.watch("provinceId"))

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const user = {
            firstName: values.firstName.toLowerCase(),
            lastName: values.lastName.toLowerCase(),
            identity: values.identity,
            iban: values.iban.toLowerCase(),
            gender: values.gender.toLowerCase(),
            birthDate: values.birthDate,
            titles: values.titles,
            addressDetail: values.addressDetail?.toLowerCase(),
            districtId: values.districtId,
            provinceId: values.provinceId,
            password: values.password,
            username: values.username?.toLowerCase(),
        };
        console.log("user: ", user)
        if (defaultValues === undefined) {
            await newUser(user);
        } else {
            const {identity, ...userData} = user
            await updateUser({id: defaultValues?.id, ...userData});
        }
    }

    useEffect(() => {
        if (newSuccess || updateSuccess) {
            form.reset(cleanValues); // Reset the form on successful submission
            toast({
                title: `Kullanıcı başarılı bir şekilde ${newSuccess ? "eklendi" : "güncellendi"}`,
                description: `Kullanıcı ${newSuccess ? "eklendi" : "güncellendi"} artık listeleniyor.`
            });
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
    console.log(form.formState.errors)
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="sm:col-span-1 md:col-span-1 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>{t("user")}</CardTitle>
                        <CardDescription>{t("new_user_desc")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormTextInput form={form} name="firstName" label="Ad" placeholder="Adı"/>
                        <FormTextInput form={form} name="lastName" label="Soyad" placeholder="Soyad"/>
                        {!defaultValues?.id ?
                            <FormTextInput form={form} name="Identity" label="TC" placeholder="12345678921"
                                           description="TC ve isim uygunluğu sağlanmalı"/> : null}
                        <FormTextInput form={form} name="iban" label="IBAN"
                                       placeholder="TR123456789012345678901234"/>
                        <FormSelectWithSearch form={form} name="gender" label={t("gender")} placeholder={t("gender")}
                                              data={gender || []}/>
                        <FormDatePicker form={form} name="birthDate" label={t("date_of_birth")}
                                        description="Doğum tarihi yaş bilgisi için önemli."/>
                        <FormMultiSelectWithSearch form={form} name="titles" label={t("titles")} data={TITLES}
                                                   defaultValue={defaultValues?.titles}/>
                    </CardContent>
                </Card>
                <Card className="sm:col-span-1 md:col-span-1 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>{`${t("is_manager")} (${t("opsiyonel")})`}</CardTitle>
                        <CardDescription>{t("is_manager_decs")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormTextInput form={form} name="username" label={t("username")} placeholder={t("username")}/>
                        <FormTextInput form={form} name="password" type="password" label={t("password")}
                                       placeholder={t("password")}/>
                    </CardContent>
                </Card>

                <Card className="sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                    <CardHeader>
                        <CardTitle>{`${t("address")} (${t("opsiyonel")})`}</CardTitle>
                        <CardDescription>{t("address_decs")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormSelectWithSearch form={form} name="provinceId" label={t("city")} placeholder={t("city")}
                                              data={provinces || []}/>
                        <FormSelectWithSearch form={form} name="districtId" label={t("district")}
                                              placeholder={t("district")} data={districts}/>
                        <FormTextArea form={form} label="address_detail" name="addressDetail"/>
                    </CardContent>
                </Card>
                <Button className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-3 py-5"
                        type="submit">{t(buttonTitle || "submit")}</Button>
            </form>
        </Form>
    );
};
