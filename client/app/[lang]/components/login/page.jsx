"use client"

import Generator from "@/app/components/fields/generator";
import Form from "@/app/components/form/form";
import { useState } from "react";

export default function LoginForm({ fields }) {
    const [input, update] = useState({})
    
    function onchange(key, value) {
        input[key] = value
        update({...input})
    }

    function submit() {
        console.log(input);
    }


    return <section>
        <Form>
            {fields.map(field => (
                <Generator 
                    key={field.id}
                    {...field}
                    onchange={value => onchange(field.name, value)}
                />
            ))}
            <button 
                type="button" 
                onClick={submit} 
                className="border bg-gray-100 px-4 aspect-video">Send</button>
        </Form>
    </section>
}