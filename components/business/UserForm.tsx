import React, {useEffect, useMemo, useState} from 'react';
import {Form} from "@/components/ui/form";
import {FormDatePicker, FormMultiSelect, FormSelectInput, FormTextArea, FormTextInput} from "@ui";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {gender} from "@/config/enums";
import {SetUser, UpdateUser} from "@/api/user";
import {useToast} from "@/components/ui/use-toast"
import {useTranslation} from "next-i18next";
import {UpdateUserType} from "@/types/CreateUserType";
import {ROLES} from "@/config/app";

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
    iban: z.string().refine(iban => /^TR\d{23}$/.test(iban), {
        message: "IBAN must start with TR and be exactly 26 characters long.",
    }),
    gender: z.string(),
    birthDate: z.date({
        required_error: "A date of birth is required.",
    }),
    userAddress: z.string().min(2, {}),
});

type Props = {
    defaultValues?: UpdateUserType
    id?: string | string[] | undefined
    buttonTitle?: string
}

const cleanValues = {firstName:"",lastName:"",Identity:"",iban: "",gender: "",userAddress: ""}

export const UserForm = (props: Props) => {
    const {defaultValues, id, buttonTitle} = props
    const {t} = useTranslation()
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => defaultValues, [defaultValues])
    })
    const [roles, setRoles] = useState<any[]>([])
    const {mutateAsync: newUser, data, error, isSuccess:newSuccess} = SetUser()
    const {mutateAsync: updateUser, isSuccess: updateSuccess} = UpdateUser()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const r =  roles.map((item: any) => item.value)
        if (defaultValues === undefined) {
            await newUser({...values,roles:r})
        } else {
            const {Identity,...v} = values
            await updateUser({...v, id, roles:r})
        }
    }

    useEffect(() => {
        if (newSuccess || updateSuccess) {
            form.reset(cleanValues); // Reset the form on successful submission
            setRoles([])
            toast({
                title: `Kullanıcı başarılı bir şekilde ${newSuccess ? "eklendi" : "güncellendi"}`,
                description: `Kullanıcı ${newSuccess ? "eklendi" : "güncellendi"} artık listeleniyor.`
            });
        }
    }, [newSuccess, form, toast, updateSuccess]);

    useEffect(() => {
        form.reset(defaultValues); // Reset with default values on change
    }, [defaultValues, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormTextInput form={form} name="firstName" label="Ad" placeholder="Adı"/>
                <FormTextInput form={form} name="lastName" label="Soyad" placeholder="Soyad"/>
                {!id ? <FormTextInput form={form} name="Identity" label="TC" placeholder="12345678921"
                                                 description="TC ve isim uygunluğu sağlanmalı"/> : null}
                <FormTextInput form={form} name="iban" label="IBAN" placeholder="TR123456789012345678901234"/>
                <FormSelectInput form={form} name="gender" label="Cinsiyet" data={gender}/>
                <FormDatePicker form={form} name="birthDate" label="Date of birth"
                                description="Doğum tarihi yaş bilgisi için önemli."/>
                <FormMultiSelect form={form} name="roles" label={t("roles")} data={ROLES} roles={roles}
                                 setRoles={setRoles}/>
                <FormTextArea form={form} label="Adress" name="userAddress"/>
                <Button type="submit">{t(buttonTitle || "submit")}</Button>
            </form>
        </Form>
    );
};

