'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Logout() {
  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <section>
      <p>Logout successfully</p>
      <Link href="/login" className="text-blue-600">
        Redirect to Login
      </Link>
    </section>
  )
}
