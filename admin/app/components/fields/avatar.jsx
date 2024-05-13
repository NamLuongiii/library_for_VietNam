import { handleImageUpload } from "@/app/help/imageCompressor";
import { Avatar } from "@mui/material";

export default function AvatarField(props) {
    const {
        id,
        name,
        type,
        label,
        value,
        onchange,
        isDisplay,
    } = props

    async function handleChange(e) {
        const f = await handleImageUpload(e)
        if (f) onchange(f)
    }

    if (isDisplay) return (
        <div className="px-8 py-4">
            <Avatar
                src={value}
                className="w-44 aspect-square h-44"
            ></Avatar>
        </div>
    )

    return (
        <div className="px-8 py-4">
            <label className="text-sm text-gray-600 mr-4">{label}</label>
            <input
                type="file"
                accept="image/*"
                id={id}
                name={name}
                onChange={handleChange}
            ></input>
        </div>
    )
}