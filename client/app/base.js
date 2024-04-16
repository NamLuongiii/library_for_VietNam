function url(resource, segment = '') {
    return `${process.env.API_HOST}/${resource}${segment}`
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
            headers: { Authorization : basicAuthentication() }
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