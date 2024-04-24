import Generator from "../fields/generator";
import Form from "../form/form";
import Link from "next/link"
import Destroy from "./destroy";
import { destroy } from "@/app/help/base";
import { redirect } from 'next/navigation'
import Back from "./back";
import { Button } from "@mui/material";

export default function BaseShow({
    fields, 
    entity, 
    resource, 
    title = "Detail"
}) {
    
    async function handleDestroy() {
        "use server"
        await destroy(resource, entity.id)
        redirect(`/home/${resource}`)
    }

    return <section className="mb-10">
        <header className="px-4 py-2 border-b bg-white sticky top-14 z-50">
            <h1 className="text-2xl">{title}</h1>
        </header>

        <Form>
            {fields.map((field, index) => (
                <Generator
                    key={index}
                    entity={entity}
                    {...field}
                ></Generator>
            ))}
        </Form>
        
        <footer className="px-8 py-4 flex items-center gap-4">
            <Button variant="contained" href={`${entity.id}/update`}>Update</Button>
            <form action={handleDestroy}>
                <Destroy></Destroy>
            </form>
            <Back text="Back"></Back>
        </footer>
    </section>
}