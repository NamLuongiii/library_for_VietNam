"use client"
import Submit from "@/app/components/base/submit"
import Generator from "@/app/components/fields/generator"
import Form from "@/app/components/form/form"
import { store } from "@/app/help/base"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import Back from "./back"
import { Button } from "@mui/material"

export default function BaseStore({fields, resource, title="Store new record"}) {
    const router = useRouter()
    const [input, updateInput] = useState({})
    const [errorMessages, setErrorMessages] = useState({})

    function handleChange(name, value) {
        input[name] = value
        updateInput({...input})
    }

    

    async function handleSubmit() {
        try {
            const res = await store(resource, input)
            if (res.error && res.status == 400) {
                const fields= res.data.fields
                console.log(fields);
                setErrorMessages(fields)
            } else
                router.push(`/home/${resource}`)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    function handleBack() {
        return router.back()
    }


    return <section> 
        <header className="sticky top-14 bg-white flex items-center gap-4 px-4 shadow-md border-b z-50">
            <h1 className="text-2xl py-2">{title}</h1>
            <Button variant="contained" onClick={handleBack}>Back</Button>
        </header>
        <Form className="py-12" action={handleSubmit}>
            {fields.map(field => (
                <Generator 
                    key={field.id} 
                    {...field} 
                    onchange={value => handleChange(field.name, value)} 
                    errorMessages={errorMessages}    
                ></Generator>
            ))}

            <footer className="px-8 py-8">
                <Submit></Submit>
            </footer>
        </Form>
    </section>
}