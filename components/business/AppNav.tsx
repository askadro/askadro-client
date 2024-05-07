"use client"

import {Navbar, Typography, IconButton, MobileNav} from "@/helpers/tailwind-material";
import React from "react";
import {APP_NAME} from "@/config/app";
import {auth_navs, dashboard_navs} from "@/config/nav";
import {Collapse} from "@material-tailwind/react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {NavList} from "@ui";


export default function AppNav() {
    const [openNav, setOpenNav] = React.useState(false);
    const router = useRouter()

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-lg px-4 py-2 lg:px-8 lg:py-4" placeholder={undefined}
                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}>
                    {APP_NAME}
                </Typography>
                <div className="hidden lg:block"><NavList list={dashboard_navs} /></div>
                <div className="flex items-center gap-x-1">
                    <Button onClick={() => router.push("login")}
                            variant="outline"
                            size="sm"
                            className="hidden lg:inline-block"
                    >
                        <Label color={"black"}>Log In</Label>
                    </Button>
                    <Button
                        onClick={() => router.push("register")}
                        size="sm"
                        className="hidden lg:inline-block">
                        <Label>Sign in</Label>
                    </Button>
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}>
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <div className="container mx-auto">
                    <NavList list={dashboard_navs} />
                    <div className="flex items-center gap-x-1">
                        <Button variant="outline" size="sm" className="">
                            <Label style={{color: "black"}}>Log In</Label>
                        </Button>
                        <Button size="sm" className="">
                            <Label>Sign in</Label>
                        </Button>
                    </div>
                </div>
            </Collapse>
        </Navbar>
    );
}
