

export default function Form({children, action, className}) {

    return <form action={action} className={className}>
        {children}
    </form>
}