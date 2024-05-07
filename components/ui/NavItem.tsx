import React from 'react';
import Link from "next/link";
import {NavType} from "@/types/navType";

const NavItem = ({nav}: { nav: NavType }) => {
    return (
        <Link
            href={nav.path}
            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
        >
            <nav.icon className="h-4 w-4"/>
            {nav.title}
        </Link>
    );
};

export default NavItem;