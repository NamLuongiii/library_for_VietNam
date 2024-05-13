import { show } from '@/app/help/base'

export default async function Header() {
  const resource = 'business'
  const business = await show(resource)
  const data = business.data
  const books = data.books,
    authors = data.authors,
    categories = data.categories

  return (
    <header className="h-14 border-b sticky top-0 z-50 text-white bg-teal-500 flex justify-start items-center gap-6 px-4">
      <div className="text-sm font-semibold">{books} Sách |</div>
      <div className="text-sm font-semibold">{authors} Tác giả |</div>
      <div className="text-sm font-semibold">{categories} Danh mục sách |</div>
    </header>
  )
}
