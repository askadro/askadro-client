"use client";
import Error from 'next/error'
import {useRouter} from "next/router";

// export async function getServerSideProps() {
//     const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     const errorCode = res.ok ? false : res.status
//     const json = await res.json()
//
//     return {
//         props: { errorCode, stars: json.stargazers_count },
//     }
// }

export default function Page({ errorCode, stars }:any) {
    const router = useRouter();
    // if (errorCode) {
    //     return <Error statusCode={errorCode} />
    // }

    return <div>
        <h1>Hata Oluştu</h1>
        <p>{router.query.message}</p>
    </div>
}