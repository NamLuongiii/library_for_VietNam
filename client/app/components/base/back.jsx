"use client"
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Back({text = "Back"}) {
    const router = useRouter()
    function handleClick() {
        router.back()
    }
    return <Button 
        variant="outlined" 
        color="secondary"
        type="button"
        onClick={handleClick}>{text}</Button>
}