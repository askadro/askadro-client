import {ColumnDef} from "@tanstack/react-table";
import {Company} from "@/types/Company";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import useRoute from "@/hooks/useRoute";
import {useTranslations} from "next-intl";


export const companyColums: ColumnDef<Company>[] = [
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
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "shortName",
        header: "short_name",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("shortName")}</div>
        ),
    },
    {
        accessorKey: "location",
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
        cell: ({row}) => {
            return <div className="capitalize">{row?.original?.address?.district?.name}</div>
        },
    },
    {
        accessorKey: "totalWorkingTime",
        header: "totalWorkingTime",
        cell: ({row}) => (
            <div className="">{row.getValue("totalWorkingTime")}</div>
        ),
    },
    {
        accessorKey: "timeOfPayment",
        header: () => <div className="">Time Of Payment</div>,
        cell: ({row}) => <div className="font-medium">{row.getValue("timeOfPayment")}</div>
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const company = row.original
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
                        <DropdownMenuItem onClick={(e) => route(e, `detail/${company.id}`)}>
                           Detail
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onClick={(e) => route(e, `edit/${company.id}`)}>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]