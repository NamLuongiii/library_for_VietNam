'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

export default function BaseIndex({
  columns,
  entities,
  page,
  page_size,
  resource,
  title,
}) {
  const searchParams = useSearchParams()
  const urlSearchParams = new URLSearchParams(searchParams)
  const router = useRouter()

  const table = useReactTable({
    data: entities,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const pageParamKey = 'page'
  const sizeParamKey = 'page_size'

  function handleRowClick(id) {
    return router.push(`${resource}/${id}`)
  }

  function handleEditClick(e, id) {
    e.preventDefault()
    return router.push(`${resource}/${id}/update`)
  }

  function handleDestroyClick(e, id) {
    e.preventDefault()
    return router.push(`${resource}/${id}/update`)
  }

  function handlePageChange(e, v) {
    urlSearchParams.set(pageParamKey, v)
    router.push('?' + urlSearchParams.toString())
  }

  function handleRowPerPageChange(e) {
    const _page_size = e.target.value
    urlSearchParams.set(sizeParamKey, _page_size)
    router.push('?' + urlSearchParams.toString())
  }

  return (
    <section>
      <div className="px-4 py-2 bg-white flex items-center">
        <h1 className="text-xl">{title}</h1>
        <div className="ml-auto flex gap-4">
          <form id="search">
            <Input
              id="key_word"
              name="key_world"
              type="text"
              form="search"
              placeholder="Tìm sách"
            ></Input>
          </form>
          <Link href={`${resource}/store`}>
            <Button>Thêm mới</Button>
          </Link>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  )
}
