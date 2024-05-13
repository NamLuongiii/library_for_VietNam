import BaseShow from '@/app/components/base/baseShow'
import { index, show } from '@/app/help/base'

export default async function BookShow({ params: { id } }) {
  const resource = 'books'
  const { data } = await show(resource, id)

  const fields = [
    {
      id: 'name',
      name: 'name',
      label: 'Name',
      type: 'text',
      isDisplay: true,
    },
    {
      id: 'cover',
      name: 'cover',
      label: 'Cover',
      type: 'bookCover',
      isDisplay: true,
    },
    {
      id: 'preface',
      name: 'preface',
      label: 'Preface',
      type: 'textarea',
      isDisplay: true,
    },
    {
      id: 'lang',
      name: 'lang',
      label: 'Lang',
      type: 'text',
      isDisplay: true,
    },
    {
      id: 'authors',
      name: 'authors',
      label: 'Author',
      type: 'autocomplete',
      options: [],
      valueKey: 'id',
      textKey: 'name',
      isDisplay: true,
    },
    {
      id: 'categories',
      name: 'categories',
      label: 'Category',
      type: 'autocomplete',
      options: [],
      valueKey: 'id',
      textKey: 'name',
      isDisplay: true,
    },
  ]

  return (
    <section>
      <BaseShow entity={data} fields={fields} resource={resource}></BaseShow>
    </section>
  )
}
