import { index } from '@/app/help/base'
import { parseQueryString } from '@/app/help/uitilies'
import BaseIndex from '@/app/components/base/baseIndex'

export default async function BookIndex({ searchParams }) {
  const resource = 'books'
  const queryString = parseQueryString(searchParams)
  const { data, page, page_size } = await index(resource, queryString)

  const columns = [
    {
      id: 'id',
      name: 'id',
      label: 'ID',
    },
    {
      id: 'name',
      name: 'name',
      label: 'Name',
    },
    {
      id: 'cover',
      name: 'cover',
      label: 'cover',
      type: 'image',
    },
    {
      id: 'files',
      name: 'files',
      label: 'Files',
    },
    {
      id: 'actions',
      name: 'actions',
      label: 'Actions',
      type: 'actions',
    },
  ]

  return (
    <section>
      <BaseIndex
        title="Books"
        resource={resource}
        columns={columns}
        entities={data}
        page={page}
        page_size={page_size}
      ></BaseIndex>
    </section>
  )
}
