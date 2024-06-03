"use client"

import React from "react";
import Image from "next/image";
import imageUrl from "../../../assets/images/travel.jpg"

const AuthLayout = ({children}: { children: React.ReactNode }) => {

     return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="hidden bg-muted lg:block">
                <Image
                    src={imageUrl}
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            {children}
        </div>
    )
}


export default AuthLayout;