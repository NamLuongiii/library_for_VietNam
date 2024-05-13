'use client'

import BaseStore from '@/app/components/base/baseStore'
import { uploadSingleImage } from '@/app/help/firebase'

export default function AuthorStore() {
  const resource = 'authors'
  const fields = [
    {
      id: 'name',
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      id: 'know_as',
      name: 'know_as',
      label: 'Know as',
      type: 'text',
    },
    {
      id: 'nation',
      name: 'nation',
      label: 'Nation',
      type: 'text',
    },
    {
      id: 'potrait',
      name: 'potrait',
      label: 'Avatar',
      type: 'avatar',
    },
    {
      id: 'bio',
      name: 'bio',
      label: 'Biograhy',
      type: 'textarea',
    },
  ]

  async function handleBeforeStore(input) {
    const potrait = input.potrait
    if (typeof potrait != 'object') return input

    const url = await uploadSingleImage(potrait)
    input.potrait = url
    return input
  }

  return (
    <section>
      <BaseStore
        resource={resource}
        fields={fields}
        beforeSubmit={handleBeforeStore}
      ></BaseStore>
    </section>
  )
}
