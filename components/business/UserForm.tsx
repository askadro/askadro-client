import React, {useEffect, useMemo, useState} from 'react';
import {Form} from "@/components/ui/form";
import {
    FormDatePicker,
    FormMultiSelect,
    FormMultiSelectWithSearch,
    FormSelectInput,
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
import {gender, ROLES} from "@/config/enums";
import {SetUser, UpdateUser} from "@/api/user";
import {useToast} from "@/components/ui/use-toast"
import {useTranslations} from "next-intl";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {GetProvinces} from "@/api/province";
import {User} from "@/types";
import {address, auth} from "@/helpers/features";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    Identity: z.string().length(11, {
        message: "Identity must be exactly 11 characters.",
    }),
    iban: z.string().refine(iban => /^TR\d{23}$/i.test(iban), {
        message: "IBAN must start with TR and be exactly 26 characters long.",
    }),
    gender: z.string(),
    birthDate: z.date({
        required_error: "A date of birth is required.",
    }),
    roles: z.string().array(),
    username: z.string().min(6, {message: 'Username must be at least 6 characters.'}).optional(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters.'}).optional(),
    city: z.string().length(36, {message: "Format error"}).optional(),
    district: z.string().length(36, {message: "Format error"}).optional(),
    address: z.string().min(3, {message: ""}).optional(),
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

type Props = {
    defaultValues?: User
    id?: string | string[] | undefined
    buttonTitle?: string
}

const cleanValues = {
    firstName: "",
    lastName: "",
    Identity: "",
    iban: "",
    gender: "",
    address: "",
    district: "",
    city: "",
    password: "",
    username: ""
}

export const UserForm = (props: Props) => {
    const {defaultValues, id, buttonTitle} = props
    const t = useTranslations("index")
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => defaultValues, [defaultValues])
    })
    const {mutateAsync: newUser, data, error, isSuccess: newSuccess} = SetUser()
    const {mutateAsync: updateUser, isSuccess: updateSuccess} = UpdateUser()
    const {data: provinces, refetch: refecthProvinces} = GetProvinces()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const user = {
            firstName: values.firstName,
            lastName: values.lastName,
            Identity: values.Identity,
            iban: values.iban.toLowerCase(),
            gender: values.gender,
            birthDate: values.birthDate,
            roles: values.roles,
        };

        const payload: any = { user };
        if (auth(values)) payload.auth = auth(values);
        if (address(values)) payload.address = address(values);

        console.log(payload);

        if (defaultValues === undefined) {
            await newUser(payload);
        } else {
            await updateUser({ id, ...payload });
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className=" grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2">
                    <CardHeader>
                        <CardTitle>{t("user")}</CardTitle>
                        <CardDescription>{t("new_user_desc")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormTextInput form={form} name="firstName" label="Ad" placeholder="Adı"/>
                        <FormTextInput form={form} name="lastName" label="Soyad" placeholder="Soyad"/>
                        {!id ? <FormTextInput form={form} name="Identity" label="TC" placeholder="12345678921"
                                              description="TC ve isim uygunluğu sağlanmalı"/> : null}
                        <FormTextInput form={form} name="iban" label="IBAN"
                                       placeholder="TR123456789012345678901234"/>
                        <FormSelectWithSearch form={form} name="gender" label={t("gender")} placeholder={t("gender")}
                                              data={gender || []}/>
                        <FormDatePicker form={form} name="birthDate" label="Date of birth"
                                        description="Doğum tarihi yaş bilgisi için önemli."/>
                        <FormMultiSelectWithSearch form={form} name="roles" label={t("roles")} data={ROLES}/>
                        {/*<FormMultiSelect name="roles" label={t("roles")} data={ROLES} state={roles}*/}
                        {/*                 setState={setRoles}/>*/}
                    </CardContent>
                </Card>
                <Card className="sm:col-span-2">
                    <CardHeader>
                        <CardTitle>{`${t("is_manager")} (${t("opsiyonel")})`}</CardTitle>
                        <CardDescription>{t("is_manager_decs")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormTextInput form={form} name="username" label={t("username")} placeholder={t("username")}/>
                        <FormTextInput form={form} name="password" type="password" label={t("password")} placeholder={t("password")}/>
                    </CardContent>
                </Card>

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

