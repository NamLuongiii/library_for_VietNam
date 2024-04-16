import Generator from "../fields/generator";
import Form from "../form/form";
import Link from "next/link"

export default function BaseShow({fields, entity, resource}) {

    return <section className="pb-10 pt-14">
        <header className="px-4 py-2 border-b bg-white fixed top-14 right-0 left-64">
            <h1 className="text-2xl">Book Detail</h1>
        </header>

        <Form>
            {fields.map(field => (
                <Generator
                    key={field.key}
                    id={field.id}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    valueKey={field.valueKey}
                    entity={entity}
                ></Generator>
            ))}
        </Form>
        
        <footer className="h-10 p-2 border-t bg-white fixed bottom-0 right-0 left-64 grid grid-cols-2 gap-4">
            <Link rel="stylesheet" href={`/${resource}/${entity.id}/edit`} className="border">Update</Link>
            <button className="border">Destroy</button>
        </footer>
    </section>
}