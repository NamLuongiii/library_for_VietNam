import Generator from "../fields/generator";
import Form from "../form/form";
import Link from "next/link"
import Destroy from "./destroy";
import { destroy } from "@/app/help/base";
import { redirect } from 'next/navigation'

export default function BaseShow({fields, entity, resource}) {
    
    async function handleDestroy() {
        "use server"
        await destroy(resource, entity.id)
        redirect("/home/books")
    }

    return <section className="mb-10">
        <header className="px-4 py-2 border-b bg-white sticky top-14">
            <h1 className="text-2xl">Book Detail</h1>
        </header>

        <Form>
            {fields.map((field, index) => (
                <Generator
                    key={index}
                    id={field.id}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    entity={entity}
                    isDisplay={field.isDisplay}
                ></Generator>
            ))}
        </Form>
        
        <footer className="h-10 p-2 border-t bg-white fixed bottom-0 right-0 left-64 grid grid-cols-2 gap-4">
            <Link rel="stylesheet" href={`${entity.id}/edit`} className="border">Update</Link>
            <form action={handleDestroy}>
                <Destroy></Destroy>
            </form>
        </footer>
    </section>
}