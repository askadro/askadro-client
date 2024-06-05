"use client"
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {getLocalStorage} from "@/utils/storage";
import {GetUser} from "@/api/user";
import {LANGUAGE} from "@/config/app";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    // const {data}= GetUser("sdf")

    useEffect(() => {
         const token = getLocalStorage('token');
        console.log("dashboard token: ",token)
        if (!token) {
            router.push(`/${getLocalStorage("lang")}`);
        } else {
            // Token'ı kullanarak kullanıcı bilgilerini doğrulayın
            // Bu kısım backend ile iletişim kurarak yapılmalıdır
            // setUser({ username: 'user' }); // Bu kısım örnek
        }
    }, [router]);
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
            </div>
            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                x-chunk="dashboard-02-chunk-1"
            >
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        You have no products
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        You can start selling as soon as you add a product.
                    </p>
                    <Button className="mt-4">Add Product</Button>
                </div>
            </div>
        </div>
    )
}
