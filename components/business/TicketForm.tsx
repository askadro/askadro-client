import React, {useEffect, useMemo} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {useToast} from "@/components/ui/use-toast";
import {Form} from "@/components/ui/form";

const formSchema = z.object({})

type Props = {
    defaultValues: any
    id: string,
    buttonTitle: string,
}

export const TicketForm = (props: Props) => {
    const {defaultValues, id, buttonTitle} = props
    const t = useTranslations("index")
    const {toast} = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => defaultValues, [defaultValues])
    })

    useEffect(() => {
        form.reset(defaultValues); // Reset with default values on change
    }, [defaultValues, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("values: ",values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">

            </form>
        </Form>
    );
};

