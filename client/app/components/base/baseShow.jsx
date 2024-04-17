import Generator from "../fields/generator";
import Form from "../form/form";
import Link from "next/link"
import Destroy from "./destroy";
import { destroy } from "@/app/help/base";
import { redirect } from 'next/navigation'
import Back from "./back";

export default function BaseShow({fields, entity, resource, title = "Detail"}) {
    
    async function handleDestroy() {
        "use server"
        await destroy(resource, entity.id)
        redirect(`/home/${resource}`)
    }

    return <section className="mb-10">
        <header className="px-4 py-2 border-b bg-white sticky top-14">
            <h1 className="text-2xl">{title}</h1>
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
        
        <footer className="h-14 px-4 py-2 border-t-2 bg-white fixed bottom-0 right-0 left-64 gap-4 flex">
            <Link rel="stylesheet" href={`${entity.id}/update`} className="border inline-flex justify-center items-center px-4 py-1">Update</Link>
            <form action={handleDestroy}>
                <Destroy></Destroy>
            </form>
            <Back text="Back"></Back>
        </footer>
    </section>
}