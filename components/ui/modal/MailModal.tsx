import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button} from "../button";
import {
    DialogTrigger, Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle, DialogClose,
} from "@/components/ui/dialog";
import {FormTextInput} from "../FormTextInput";
import {useTranslations} from "next-intl";
import {z} from "zod";
import {Form} from "@/components/ui/form";
import {FormTextArea} from "@ui";
import {SendMailTicket} from "@/api/ticket";
import {useToast} from "@/components/ui/use-toast";
import {cn} from "@/lib/utils";

const jobFormSchema = z.object({
    recipients: z.string().optional(),
    text: z.string().optional(),
    subject: z.string().optional(),
})

export const MainModal = (props: any) => {
    const {
        label,
        desc,
        to,
        buttonTitle,
        onSubmit,
        data
    } = props;
    const t = useTranslations("index")
    const [open, setOpen] = React.useState(false);
    const form = useForm<z.infer<typeof jobFormSchema>>();
    const {toast} = useToast()
    const {mutate: sendMailTicket, isSuccess: successMail,reset:resetMail} = SendMailTicket()
    const onSubmitMail = async (values: any) => {
        sendMailTicket({id: data.id, mailContent: {...values, recipients: [values.recipients]}})
        form.reset()
        setOpen(false)
    }

    useEffect(() => {
        if (successMail) {
            toast({
                className: cn(
                    'bottom-0 left-0 flex fixed md:max-w-[420px] md:bottom-4 md:left-4'
                ),
                title: "Mail gönderildi",
                description: data.company.name + "'e mail ulaşacaktır.",
                variant: "default",
            })
            resetMail()
        }
    }, [data, resetMail, successMail, toast]);


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">{`${to}'e ${label} `}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{`${to}'e ${label} `}</DialogTitle>
                    <DialogDescription>{desc}</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="grid gap-4 py-4">
                        <FormTextInput form={form} name="subject" label={t("subject")}/>
                        <FormTextArea form={form} name="text" label={t("mail_text")}/>
                        <FormTextInput form={form} name="recipients" label={t("extra_recipient")}/>
                    </form>
                </Form>
                <Button onClick={form.handleSubmit(onSubmitMail)}>{buttonTitle}</Button>
            </DialogContent>
        </Dialog>
    );
};
