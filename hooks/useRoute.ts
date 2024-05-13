import {usePathname, useRouter} from "next/navigation";
import React from "react";

const useRoute = () => {
    const router = useRouter();
    const pathname = usePathname()

    return (e:React.MouseEvent,newPath:string) => {
        e.preventDefault();
        router.push(`${pathname}/${newPath}`)
    };
};

export default useRoute;