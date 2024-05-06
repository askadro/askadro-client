import {Button, Navbar} from "@/helprs/tailwind-material";

export default function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <Navbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Button placeholder={undefined} onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}>Button</Button>
            </Navbar>
        </main>
    );
}
