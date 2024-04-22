"use server"

function url(resource, segments) {
    return `${process.env.API_HOST}/${resource}/${segments}` 
}

export async function Index(resource, segments = "", cache = "default") {
    const res = await fetch(
        url(resource, segments),
        {
            cache: "no-cache"
        }
    )

    if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || res.statusText)
    }

    return res.json()
}

export async function Show(resource, id, cache = "default") {
    const res = await fetch(
        url(resource, id),
        {
            cache: cache,
        }
    )

    if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || res.statusText)
    }

    return res.json()
}

export async function Update(resource, id, input, cache = "default") {
    const res = await fetch(
        url(resource, id),
        {
            cache,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        }
    )

    if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || res.statusText)
    }

    return res.json()
}




