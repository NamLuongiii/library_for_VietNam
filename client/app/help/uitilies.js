export function parseQueryString(obj) {
    let query = "?"
    Object.keys(obj).forEach(k => {
        query += `${k}=${obj[k]}`
    })
    return query
}

export function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function extractBookExtension(fileType) {
    const accepts = ["pdf", "epub", "mobi"] 
    for (let i = 0; i < accepts.length; i++) {
        if (fileType.includes(accepts[i])) 
            return accepts[i]
    }
    return "N/a"
}