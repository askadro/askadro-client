"use client"

import React from 'react';
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

type authType = {
    authorizedEmail: string
    authorizedPassword: string
    authorizedPerson: string
    authorizedPhone: string
    authorizedTitle: string
}

const defaultAuthorized = {
    authorizedEmail: "",
    authorizedPassword: "",
    authorizedPerson: "",
    authorizedPhone: "",
    authorizedTitle: ""
}

export const Authorized = () => {
    const [open, setOpen] = React.useState(false)
    const [authorized, setAuthorized] = React.useState<authType[]>([]);

    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [selectedJob, setSelectedJob] = React.useState("")

    console.log(authorized)
    const t = useTranslations("index")
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
                            <TableHead>{t("email")}</TableHead>
                            <TableHead>{t("name")}</TableHead>
                            <TableHead>{t("phone")}</TableHead>
                            <TableHead>{t("title")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Label htmlFor="email">
                                    {t("email")}
                                </Label>

                            </TableCell>
                            <TableCell>
                                <Label htmlFor="name">
                                    {t("name")}
                                </Label>

                            </TableCell>
                            <TableCell>
                                <Label htmlFor="phone">
                                    {t("phone")}
                                </Label>

                            </TableCell>
                            <TableCell>
                                <Label>
                                    {t("title")}
                                </Label>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </CardContent> : null}
            <CardFooter className="justify-center border-t p-4 ">
                <div className="flex justify-center gap-2 ">
                    <div>
                        <Label htmlFor="email">
                            {t("email")}
                        </Label>
                        <Input
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}

                            id="email"
                            type="text"
                            placeholder="company@company.com"
                        />
                    </div>
                    <div>
                        <Label htmlFor="name">
                            {t("name")}
                        </Label>
                        <Input
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
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
                            onChange={(e)=>setPhone(e.target.value)}
                            id="phone"
                            type="tel"
                            placeholder="05348986545"
                        />
                    </div>
                    <div>
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
                <Button type="button" onClick={() => setAuthorized((a) => {
                    return [...a, {
                        authorizedEmail:email,
                        authorizedPassword: name+phone,
                        authorizedPerson: name,
                        authorizedPhone: phone,
                        authorizedTitle: selectedJob
                    }]
                })} size="sm" variant="ghost" className="gap-1 self-end">
                    <PlusCircle className="h-3.5 w-3.5"/>
                    {t("add_authorized")}
                </Button>
            </CardFooter>
        </Card>
    );
};

