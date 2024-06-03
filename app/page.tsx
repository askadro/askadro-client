import {redirect} from 'next/navigation';
import {getLocalStorage} from "@/utils/storage";
import {LANGUAGE} from "@/config/app";

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
    return redirect(`/${getLocalStorage("lang") || LANGUAGE}`);

}