import React, {useEffect} from 'react';
import {Form} from "@/components/ui/form";
import {FormDatePicker, FormSelectInput, FormTextInput} from "@ui";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {gender} from "@/config/enums";
import {SetUser} from "@/api/user";
import {useToast} from "@/components/ui/use-toast"

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
});

export const AddUserForm = () => {
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            Identity: "",
            iban: "TR",
            birthDate: new Date("01/01/2000"),
        },
    })

    const {mutateAsync, data, error, isSuccess} = SetUser()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await mutateAsync(values)
    }

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess) {
            form.reset()
            toast({
                title: "Kullanıcı başarılı bir şekilde eklendi",
                description: "Kullanıcı eklendi artık listeleniyor."
            })
        }
    }, [isSuccess, form, toast])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormTextInput form={form} name="firstName" label="Ad" placeholder="Adı"/>
                <FormTextInput form={form} name="lastName" label="Soyad" placeholder="Soyad"/>
                <FormTextInput form={form} name="Identity" label="TC" placeholder="12345678921"
                               description="TC ve isim uygunluğu sağlanmalı"/>
                <FormTextInput form={form} name="iban" label="IBAN" placeholder="TR123456789012345678901234"/>
                <FormSelectInput form={form} name="gender" label="Cinsiyet" data={gender}/>
                <FormDatePicker form={form} name="birthDate" label="Date of birth"
                                description="Doğum tarihi yaş bilgisi için önemli."/>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

