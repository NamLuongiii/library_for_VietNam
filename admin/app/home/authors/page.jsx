import { index } from '@/app/help/base'
import Link from 'next/link'
import addSvg from '@/public/methods/add.svg'
import Image from 'next/image'
import BaseIndex from '@/app/components/base/baseIndex'
import { parseQueryString } from '@/app/help/uitilies'

export default async function BookIndex({ searchParams }) {
  const resource = 'authors'
  const queryString = parseQueryString(searchParams)

  const { data, page, page_size } = await index(resource, queryString)

  const columns = [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'ID',
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
    },
    {
      id: 'know_as',
      accessorKey: 'know_as',
      header: 'Know as',
    },
    {
      id: 'nation',
      accessorKey: 'nation',
      header: 'Nation',
    },
  ]

  return (
    <section>
      <BaseIndex
        title="Authors"
        resource={resource}
        columns={columns}
        entities={data}
        page={page}
        page_size={page_size}
      ></BaseIndex>
    </section>
  )
}
