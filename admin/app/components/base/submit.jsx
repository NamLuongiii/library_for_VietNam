'use client'
import { Button } from '@mui/material'
import { useFormStatus } from 'react-dom'

export default function Submit() {
  const status = useFormStatus()
  return (
    <Button variant="contained" type="submit" disabled={status.pending}>
      {status.pending ? 'Submiting...' : 'Submit'}
    </Button>
  )
}
