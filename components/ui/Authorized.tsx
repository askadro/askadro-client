"use client"

import React, {useMemo} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown, PlusCircle} from "lucide-react";
import {useTranslations} from "next-intl";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {jobTitles} from "@/config/jobTitles";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import validator from "validator";



const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.(com)$/;

const validateEmail = (email: string): string => {
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Email not acceptable";
    return "";
};

const validateName = (name: string): string => {
    if (name.trim().length < 2) return "Name must be at least 2 characters long.";
    return "";
};

const validatePhone = (phone: string): string => {
    if (!validator.isMobilePhone(phone, "tr-TR")) return "Invalid phone number (TR format required).";
    return "";
};

const validateJob = (job: string): string => {
    if (!job || job.trim().length < 2) return "Job title must be at least 2 characters long.";
    return "";
};


export const Authorized = ({authorized, setAuthorized}:any) => {
    const [open, setOpen] = React.useState(false)

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [selectedJob, setSelectedJob] = React.useState("")
    const [errors, setErrors] = React.useState({email: "", name: "", phone: "", job: ""});
    const t = useTranslations("index")

    const addAuthorized = () => {
        const emailError = validateEmail(email);
        const nameError = validateName(name);
        const phoneError = validatePhone(phone);
        const jobError = validateJob(selectedJob);

        if (authorized.some((i: { authorizedEmail: string; }) => i.authorizedEmail === email)) {
            setErrors((e) => ({ ...e, email: "Same email not acceptable" }));
            return;
        }

        if (emailError || nameError || phoneError || jobError) {
            setErrors((e) => ({
                ...e,
                email: emailError,
                name: nameError,
                phone: phoneError,
                job: jobError,
            }));
            return;
        }

        setErrors({ email: "", name: "", phone: "", job: "" });

        setAuthorized((a: any) => [
            ...a,
            {
                authorizedEmail: email,
                authorizedPassword: name + phone,
                authorizedPerson: name,
                authorizedPhone: phone,
                authorizedTitle: selectedJob,
            },
        ]);

        setEmail("");
        setName("");
        setPhone("");
        setSelectedJob("");

    }

    const renderBody = () => {
        return (
            <TableBody>
                {authorized.map((item:any, index:number) => (
                    <TableRow key={item.authorizedPhone.toString()}>
                        <TableCell>
                            <Label htmlFor="email">
                                {item.authorizedEmail}
                            </Label>
                        </TableCell>
                        <TableCell>
                            <Label htmlFor="name">
                                {item.authorizedPerson}
                            </Label>

                        </TableCell>
                        <TableCell>
                            <Label htmlFor="phone">
                                {item.authorizedPhone}
                            </Label>

                        </TableCell>
                        <TableCell>
                            <Label htmlFor="title">
                                {item.authorizedTitle}
                            </Label>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    return (
        <Card x-chunk="dashboard-07-chunk-1">
            <CardHeader>
                <CardTitle>{`${t("authorized")} (${t("opsiyonel")})`}</CardTitle>
                <CardDescription>
                    {t("authorized_decs")}
                </CardDescription>
            </CardHeader>
            {authorized.length > 0 ? <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">{t("email")}</TableHead>
                            <TableHead>{t("name")}</TableHead>
                            <TableHead>{t("phone")}</TableHead>
                            <TableHead className="w-[100px]">{t("title")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    {renderBody()}
                </Table>
            </CardContent> : null}
            <CardFooter className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <div>
                        <Label htmlFor="email">
                            {t("email")}
                        </Label>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                            id="email"
                            type="text"
                            placeholder="company@company.com"
                        />
                    </div>
                    <div>
                        <Label htmlFor="name">
                            {t("name_and_surname")}
                        </Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            type="text"
                            placeholder="Josehp posefh"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">
                            {t("phone")}
                        </Label>
                        <Input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            id="phone"
                            type="tel"
                            placeholder="05348986545"
                        />
                    </div>
                    <div className="justify-between flex flex-col">
                        <Label htmlFor="title">
                            {t("title")}
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    {selectedJob
                                        ? jobTitles?.find((job) => job.value === selectedJob)?.label.substring(0, 18)
                                        : "Select title..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search title..."/>
                                    <CommandEmpty>No jobs found.</CommandEmpty>
                                    <CommandList>
                                        {jobTitles?.map((job) => {
                                            return (
                                                <CommandItem
                                                    key={job.value}
                                                    value={job.value}
                                                    onSelect={(currentValue) => {
                                                        setSelectedJob(currentValue === selectedJob ? "" : currentValue)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedJob === job?.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {job?.label}
                                                </CommandItem>
                                            )
                                        })}
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    {errors.email && <Label className="text-red-400">{errors.email}</Label>}
                    {errors.name && <Label className="text-red-400">{errors.name}</Label>}
                    {errors.phone && <Label className="text-red-400">{errors.phone}</Label>}
                    {errors.job && <Label className="text-red-400">{errors.job}</Label>}
                </div>
                <Button type="button" onClick={addAuthorized} size="sm" variant="ghost" className="gap-1 self-end">
                    <PlusCircle className="h-3.5 w-3.5"/>
                    {t("add_authorized")}
                </Button>
            </CardFooter>
        </Card>
    );
};

