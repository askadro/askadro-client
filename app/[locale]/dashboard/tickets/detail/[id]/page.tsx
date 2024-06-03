"use client"

import React, {useMemo} from 'react';
import {TicketDetailCard} from "@ui";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {TITLES} from "@/config/enums";

const formSchema = z.object({
    enterHour: z.date(),
    exitHour: z.date(),
    ticket_date: z.date(),
    ticket_notes: z.string().optional()
})

const Page = () => {
    const t = useTranslations("index")
    const ticketStaff = [1,2,3,4]
    const [staffForDb, setStaffForDb] = React.useState<{ staffId: string, title: string }[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // defaultValues: useMemo(() => defaultValues, [])
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(staffForDb,values)
        //update ticket
    }

    const ChangableStaff = ()=> {
        return (
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>{t("extra_price")}</TableHead>
                                <TableHead>{t("extra_hour")}</TableHead>
                                <TableHead>{t("title")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-semibold">
                                    GGPC-001
                                </TableCell>
                                <TableCell>
                                    <Label htmlFor="stock-1" className="sr-only">
                                        Stock
                                    </Label>
                                    <Input
                                        id="stock-1"
                                        type="number"
                                        defaultValue="100"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Label htmlFor="price-1" className="sr-only">
                                        Price
                                    </Label>
                                    <Input
                                        id="price-1"
                                        type="number"
                                        defaultValue="99.99"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={TITLES[0].value}
                                        // onValueChange={(c: string) => changeStaffRole(c, user.id)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={t("select_roles")}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>{t("title")}</SelectLabel>
                                                {TITLES.map((role) => {
                                                    return (
                                                        <SelectItem key={role.value}
                                                                    value={role.value}
                                                        >{role.label}</SelectItem>
                                                    )
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>

            </Card>
        )
    }

    return (
        <div>
            {/*{ticketStaff?.length ?<TicketAccordionWithSelectTitle  data={ticketStaff} setStaff={setStaffForDb} staff={staffForDb} titles={ROLES}/> : null}*/}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className=" grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mt-4">
                    <TicketDetailCard className="col-span-4" form={form} label={"update_ticket"} labelDesc={"update_tickets_desc"} />
                    <ChangableStaff />
                    <Button className="col-span-4" type="submit">{t("continue")}</Button>
                </form>
            </Form>
        </div>
    );
};

export default Page;