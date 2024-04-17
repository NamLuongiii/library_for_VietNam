"use server"

function url(resource, segment = '') {
    return `${process.env.API_HOST}/${resource}/${segment}`
}

function basicAuthentication() {
    const token = btoa('super_admin:super_admin')
    return `Basic ${token}`
}

export async function index(resource, page = 1, page_size = 20) {
    const res = await fetch(
        url(resource, `?page=${page}&page_size=${page_size}`),
        {
            credentials: "include",
            headers: { Authorization : basicAuthentication() },
            cache: 'no-cache'
        }
    )

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function show(resource, resource_id) {
    const res = await fetch(
        url(resource, resource_id),
        {
            credentials: "include",
            headers: { Authorization: basicAuthentication() }
        }
    )

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function update(resource, resource_id, input) {
    const res = await fetch(
        url(resource, resource_id),
        {
            credentials: "include",
            headers: { 
                Authorization: basicAuthentication(),
                'Content-Type': 'application/json' 
            },
            method: 'PUT',
            body: JSON.stringify(input)

        }
    )

    if (!res.ok) {
        if (res.status == 400) {
            return  res.json()
        }

        throw new Error(res.statusText)
    }

    return res.json()

}

export async function store(resource, input) {
    const res = await fetch(
        url(resource),
        {
            method: 'POST',
            credentials: "include",
            headers: { 
                Authorization: basicAuthentication(),
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(input)
        }
    )

    if (!res.ok) {
        if (res.status == 400) 
            return {
                error: true,
                data: await res.json(),
                status: res.status,
                statusText: res.statusText
            }
        
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function destroy(resource, resource_id) {
    const res = await fetch(
        url(resource, resource_id),
        {
            method: 'DELETE',
            credentials: "include",
            headers: { 
                Authorization: basicAuthentication(),
            },
        }
    )

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}