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
import {gender} from "@/config/enums";
import {Plus} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {GetUsers} from "@/api/user";


export function UserTable() {
    const router = useRouter();
    const pathname = usePathname()
    const {data, isLoading,error} = GetUsers()
    console.log(data,"error : ",error)
    if (isLoading) return null
    if (!data) return null

    const returnGenderText = (g: string) => {
        let cinsiyet = ""
        gender.forEach((item: any) => {
            if (g === item.value) {
                cinsiyet = item.label
            }
        })
        return cinsiyet
    }

    const returnDateToAge = (date: string) => {
        let bt = ""
        if (!date) return bt;

    }
    return (
        <Table className="w-full">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Kullanıcı Adı</TableHead>
                    <TableHead>Status</TableHead>
                    {/*<TableHead>Alan</TableHead>*/}
                    <TableHead>Cinsiyet</TableHead>
                    <TableHead className="text-right">Yaş</TableHead>
                    <TableHead className="text-right">Güncelle</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((user: User) => (
                    <TableRow key={user?.id}>
                        <TableCell className="font-medium">{`${user?.firstName} ${user?.lastName}`}</TableCell>
                        <TableCell>{user?.status}</TableCell>
                        {/*<TableCell>{user.male}</TableCell>*/}
                        <TableCell>{returnGenderText(user?.gender)}</TableCell>
                        <TableCell className="text-right">{user?.birthDate}</TableCell>
                        <TableCell className="flex justify-end">
                            <Link  href={{pathname: `${pathname}/${user.id}`}} >
                                <Plus className="" />
                            </Link>
                        </TableCell>
                    </TableRow>
                    ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
)
}
