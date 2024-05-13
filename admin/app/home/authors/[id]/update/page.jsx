import BaseUpdate from '@/app/components/base/baseUpdate'
import { show } from '@/app/help/base'

export default async function BookUpdate({ params: { id } }) {
  const resource = 'authors'
  const { data } = await show(resource, id)
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
  ]

  return (
    <section>
      <BaseUpdate
        resource={resource}
        fields={fields}
        id={id}
        entity={data}
      ></BaseUpdate>
    </section>
  )
}
