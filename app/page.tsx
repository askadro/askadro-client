import {redirect} from 'next/navigation';

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
    // let language
    // if (typeof window !== "undefined") {
    //     language = localStorage.getItem("lang")
    // }
    // if (!language) {
    //     return redirect(`/tr`);
    // }
    // return redirect(`/${language}`);
    return redirect(`/tr`);

}