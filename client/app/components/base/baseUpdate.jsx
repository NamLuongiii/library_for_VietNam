"use client"
import Submit from "@/app/components/base/submit"
import Generator from "@/app/components/fields/generator"
import Form from "@/app/components/form/form"
import { update } from "@/app/help/base"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Back from "./back"

export default function BaseUpdate({fields, resource, id, entity, title="Update"}) {
    const router = useRouter()
    const [input, updateInput] = useState({})
    const [errorMessages, setErrorMessages] = useState({})

    function handleChange(name, value) {
        input[name] = value
        updateInput({...input})
    }

    useEffect(() => {
       fields.map(field =>{
        input[field.name] = entity[field.name];
       }) 
    }, [])

    async function handleSubmit() {
        try {
            const res = await update(resource, id, input)
            if (res.error && res.status == 400) {
                const fields= res.data.fields
                setErrorMessages(fields)
            } else
                router.push(`/home/${resource}`)
        } catch (error) {
            throw new Error(error.message)
        }
    }


    return <section>
        <header className="bg-white flex items-center px-4 z-50">
            <h1 className="text-2xl px-4 py-2">{title}</h1>
        </header>
        <Form action={handleSubmit}>
            {fields.map(field => (
                <Generator 
                    key={field.id} 
                    {...field} 
                    onchange={value => handleChange(field.name, value)} 
                    entity={entity}
                    errorMessages={errorMessages}    
                ></Generator>
            ))}

            <footer className="px-8 py-4 flex items-center gap-4">
                <Submit></Submit>
                <Back text="Cancel"></Back>
            </footer>
        </Form>
    </section>
}