"use client"
import { LinkIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function Footer() {

    return <footer className="pt-24">
        <div className="max-w-screen-md mx-auto flex justify-center items-center px-4 py-2 md:py-4">
            <Link href="/" className="inline-flex items-center gap-2 underline">
                <LinkIcon></LinkIcon>
                <code className="text-xs text-gray-600">Comunity</code></Link>
            <code className="text-xs text-gray-600">© 2024. Vlibrary</code>
        </div>
    </footer>
}