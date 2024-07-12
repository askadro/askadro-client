"use client"
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {getLocalStorage, setLocalStorage} from "@/utils/storage";
import {Login} from "@/api/auth";
import {FormCheckboxInput, FormTextInput} from "@ui";
import {useTranslations} from "next-intl";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {getApiClient} from "@/api";
import {router} from "next/client";


// Validation schema
const formSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
});

export default function LoginPage() {
    const t = useTranslations("index")
    const router = useRouter();
    const {mutateAsync: login, data: token, isSuccess: loginSuccess, isError} = Login()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const rememberedUser = getLocalStorage('rememberedUser');
        if (rememberedUser) {
            setLocalStorage('username', rememberedUser.username);
            form.setValue('password', rememberedUser.password);
        }
    }, [form]);

    // useEffect(() => {
    //     router.push(`/${getLocalStorage("lang") || "tr"}/dashboard`);
    // }, []);
    useEffect(() => {
        if (loginSuccess) {
            getApiClient().defaults.headers.common["Authorization"] = token.access_token;
            setLocalStorage("token", token.access_token);
            router.push(`/${getLocalStorage("lang") || "tr"}/dashboard`);
            console.log(getApiClient().defaults)
        }
    }, [loginSuccess, router, token]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            await login(data);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>
                <div>
                    <p className="text-balance text-muted-foreground">
                        {isError ? t("something_went_wrong") : null}
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <FormTextInput form={form} name={"username"} label={t("username")}/>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <Link
                                            href="/forgot-password"
                                            className="ml-auto inline-block text-sm underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <FormTextInput form={form} name={"password"}/>
                                </div>
                                <FormCheckboxInput form={form} name={"rememberMe"} label={t("rememberMe")}/>
                                <Button type="submit"
                                        className="w-full">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
