"use client"
import Image from "next/image"
import Link from "next/link"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Login} from "@/api/auth";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    useEffect(() => {
    }, []);
    return null
}
