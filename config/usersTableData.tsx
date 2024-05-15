import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import useRoute from "@/hooks/useRoute";
import {useTranslations} from "next-intl";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import {User} from "@/types/UserType";
import {Badge} from "@/components/ui/badge";

export const usersColums: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "firstName",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Ad
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => (
            <div className="capitalize">{`${row.getValue("firstName")}`}</div>
        ),
    },
    {
        accessorKey: "lastName",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Soyad
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => (
            <div className="capitalize">{`${row.getValue("lastName")}`}</div>
        ),
    },
    {
        accessorKey: "gender",
        header: "gender",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("gender")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Location
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <Badge variant="outline">{row.getValue("status")}</Badge>,
    },
    {
        accessorKey: "roles",
        header: "roles",
        cell: ({row}: any) => (
            <div className="">{row.getValue("roles")?.map((i: any) => <Badge key={i}
                                                                            variant="secondary">{i}</Badge>)}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const user = row.original
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const route = useRoute()
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const t = useTranslations()
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={(e) => route(e, `detail/${user.id}`)}>
                            Detail
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onClick={(e) => route(e, `edit/${user.id}`)}>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]