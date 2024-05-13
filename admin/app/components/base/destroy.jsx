'use client'
import { Button } from '@mui/material'
import { useFormStatus } from 'react-dom'

export default function Destroy() {
  const status = useFormStatus()
  return (
    <Button
      variant="contained"
      color="error"
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? 'Destroing...' : 'Destroy'}
    </Button>
  )
}
