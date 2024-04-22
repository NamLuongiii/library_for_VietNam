export function parseQueryString(obj) {
    let query = "?"
    Object.keys(obj).forEach(k => {
        query += `${k}=${obj[k]}`
    })
    return query
}