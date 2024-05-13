'use client'

import Generator from '@/app/components/fields/generator'
import Form from '@/app/components/form/form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginForm({ fields }) {
  const [input, update] = useState({})
  const router = useRouter()

  function onchange(key, value) {
    input[key] = value
    update({ ...input })
  }

  function submit(e) {
    const token = btoa(`${input.user_name}:${input.password}`)
    localStorage.setItem('token', token)
    router.push('/home')
  }

  return (
    <section className="h-screen flex justify-center items-center">
      <Form action={submit} className="border rounded-sm p-4">
        <h1 className="text-3xl">Login</h1>
        {fields.map((field) => (
          <Generator
            key={field.id}
            {...field}
            onchange={(value) => onchange(field.name, value)}
          />
        ))}
        <button type="submit" className="border bg-gray-100 px-4 aspect-video">
          Send
        </button>
      </Form>
    </section>
  )
}
