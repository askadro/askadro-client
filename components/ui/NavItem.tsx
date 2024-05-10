"use client"
import React from 'react';
import Link from "next/link";
import {NavType} from "@/types/navType";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

const NavItem = ({nav}: { nav: NavType }) => {
    const router = useRouter()
    return (
        <Button
            variant="link"
            onClick={(event)=>{
                event.preventDefault()
                router.push(`${nav.path}/`)
            }}
            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
        >
            <nav.icon className="h-4 w-4"/>
            {nav.title}
        </Button>
    );
};

export default NavItem;