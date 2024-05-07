"use client"
import { Metadata } from 'next'
import {GetUsers} from "@/api/user";
import {useEffect} from "react";

// export const metadata: Metadata = {
//     title: 'Next.js',
// }

export default function Page() {
    const {data,error} = GetUsers()
    useEffect(()=>{
        console.log(data,error)
    },[data,error])

    return '...'
}