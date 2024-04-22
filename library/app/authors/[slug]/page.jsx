import Cover from "@/app/components/commons/cover"
import { Show } from "@/app/lib/baseApi"
import { Avatar } from "@chakra-ui/react"

export default async function AuthorShow({ params: { slug }}) {
    const resource = "authors"
    const { data } = await Show(resource, slug)
    const author = data 
    
    return <main className="mx-auto max-w-screen-lg p-4 lg:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8 lg:items-start">
            <Avatar
                size="2xl"
                name={author.name}
                src={author.potrait}
            ></Avatar>    
            <div>
                <h1 className="text-2xl text-teal-600 mb-4">{author.name}</h1>
                <p className="mb-4">{author.nation}</p>
            </div>
        </div>

        <div className="border my-4 p-2 bg-teal-50 lg:my-8 lg:p-4">
            <h2 className="text-lg">Giới thiệu</h2>
            <p className="py-4 lg:py-8">
                {author.bio}
            </p>
        </div>

        <div className="border my-4 shadow-sm flex flex-wrap gap-4 lg:my-8 lg:gap-8">
            {author.books.map(book => (
                <div key={book.id} className="basis-1/2 lg:basis-1/4">
                    <Cover book={book}></Cover>
                </div>
            ))}
        </div>
    </main>
}