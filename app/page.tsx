import {redirect} from 'next/navigation';
import {LANGUAGE} from "@/config/app";

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
    return redirect(`/${LANGUAGE}`);
}