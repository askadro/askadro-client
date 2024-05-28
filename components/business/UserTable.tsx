import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {User} from "@/types/UserType";
import {ContactRound, Edit, ListCollapse, Trash} from "lucide-react";
import {DeleteUser, GetUsers} from "@/api/user";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";

import {Button} from "@/components/ui/button";
import {formatDistance, subDays} from 'date-fns';
import {tr} from "date-fns/locale";
import {
    Sheet,
    SheetClose,
    SheetContent, SheetDescription,
    SheetFooter,
    SheetHeader, SheetPortal,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Label} from "@/components/ui/label";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {useState} from "react";
import useRoute from "@/hooks/useRoute";
import {useTranslations} from "next-intl";


export function UserTable() {
    const t = useTranslations("index")
    const [sheetData, setSheetData] = useState<User | null>()
    const {mutateAsync: deleteUser} = DeleteUser()
    const {data, isLoading} = GetUsers()
    const route = useRoute()
    if (isLoading) return null
    if (!data) return null

    const renderTableRow = () => {
        return data.map((user: User) => {
            return (
            // @ts-ignore
                <TableRow key={user.id}>
                    <TableCell className="hidden sm:table-cell">
                        {
                            user?.image ? <Image
                                alt={user.firstName}
                                className="aspect-square rounded-md object-cover"
                                height="44"
                                src={user.image}
                                width="44"
                            /> : <ContactRound size={44} strokeWidth={1.75}/>
                        }

                    </TableCell>
                    <TableCell className="font-medium">
                        {`${user.firstName} ${user.lastName}`}
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">
                            {user.status}
                        </Badge>
                    </TableCell>
                    <TableCell> {user.titles?.map((r: string) => r.split(",").join(" "))}</TableCell>
                    <TableCell className="hidden md:table-cell">
                        {t(user.gender)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {
                            // @ts-ignore
                            formatDistance(subDays(new Date(user.createdAt), 0), new Date(), {locale: tr})}
                    </TableCell>
                    <TableCell>
                        <div className="row-auto">
                            <Button onClick={(e) => route(e, `detail/${user.id}`)
                            } variant="ghost"
                                    size="icon">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <ListCollapse strokeWidth={1.75}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{t("detail")}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Button>
                            <Button onClick={(e) => route(e,`edit/${user.id}`)
                            }
                                    variant="ghost"
                                    size="icon">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Edit size={24} strokeWidth={1.75}/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{t("edit")}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Button>
                            <Sheet>
                                <SheetTrigger onClick={() => setSheetData(user)}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Trash size={24} strokeWidth={1.75}/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{t("delete")}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </SheetTrigger>
                                <SheetContent side="bottom">
                                    <SheetHeader>
                                        <SheetTitle>{t("delete_user")}</SheetTitle>
                                        <SheetDescription>
                                            {t("delete_user_decs")}
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                {`${t("do_you_want_delete_user")}`}
                                            </Label>
                                            <Label htmlFor="name">
                                                {`${sheetData?.firstName} ${sheetData?.lastName}`}
                                            </Label>

                                        </div>

                                    </div>
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <Button type="submit">{t("cancel")}</Button>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Button variant="destructive"
                                                    onClick={() => deleteUser(user?.id as string)}>{t("delete")}</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>

                    </TableCell>
                </TableRow>
            )
        })
    }

    return (
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>{t("personel")}</CardTitle>
                <CardDescription>
                    {t("personel_decs")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>{t("name")}</TableHead>
                            <TableHead>{t("status")}</TableHead>
                            <TableHead>{t("roles")}</TableHead>
                            <TableHead className="hidden md:table-cell">
                                {t("gender")}
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                {t("createdAt")}
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">{t("actions")}</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {renderTableRow()}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    {t("showing")} <strong>1-10</strong> of <strong>{data.length}</strong> {t("products")}
                </div>
            </CardFooter>
        </Card>

    )
}
