"use client"
export default function Error({error, reset}) {

    return <main>
        <label>{error.message}</label>
        <button onClick={reset}>reset</button>
    </main>
}