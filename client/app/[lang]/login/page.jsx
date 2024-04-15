import LoginForm from "../../components/login/page"

export default function Login() {

    const fields = [
        {
            id: "user_id",
            label: "username",
            type: "text",
            name: "username",
        },
        {
            id: "password",
            label: "password",
            type: "text",
            name: "password",
        }
    ]

    return <LoginForm fields={fields} />
}