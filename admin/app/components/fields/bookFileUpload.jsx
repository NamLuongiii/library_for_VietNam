import { formatBytes } from '@/app/help/uitilies'
import { Button } from '@/components/ui/button'
import { ArrowDown, ArrowUp, CircleMinus } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function BookFileUpload({ onchange }) {
  const [values, setValues] = useState([])

  useEffect(() => {
    onchange(values)
  }, [values])

  const handleChange = (e) => {
    const files = e.target.files
    const _values = [...values]
    for (let file of files) {
      _values.push({
        name: file.name,
        file: file.name,
        size: formatBytes(file.size),
        content: file,
      })
    }
    setValues(_values)
  }

  const handleRemove = (item, e) => {
    e.preventDefault()
    setValues(values.filter((_item) => _item != item))
  }

  const handleEditable = (e, item) => {
    const v = e.target.value
    const _item = values.find((_item) => item == _item)
    if (_item) {
      _item.name = v
      setValues([...values])
    }
  }

  const handleUp = (item, e) => {
    e.preventDefault()
    const i = values.findIndex((_item) => item == _item)
    const up = i - 1

    if (i < 0 || up < 0) return
    values[i] = values[up]
    values[up] = item
    setValues([...values])
  }

  const handleDown = (item, e) => {
    e.preventDefault()
    const i = values.findIndex((_item) => item == _item)
    const up = i + 1

    if (i < 0 || up < 0 || up > values.length - 1) return
    values[i] = values[up]
    values[up] = item
    setValues([...values])
  }

  return (
    <div className="px-8 py-2">
      <table className="border-collapse border border-slate-400 w-full">
        <thead>
          <tr className="bg-slate-50 text-xs">
            <th className="border border-slate-300">Dịch chuyển</th>
            <th className="border border-slate-300">Index</th>
            <th className="border border-slate-300">Tên tài liệu</th>
            <th className="border border-slate-300">Tên file</th>
            <th className="border border-slate-300">Kích thước file</th>
            <th className="border border-slate-300">Xoá</th>
          </tr>
        </thead>
        <tbody>
          {values.map((item, index) => {
            return (
              <tr key={index} className="text-sm">
                <td className="border border-slate-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleUp(item, e)}
                  >
                    <ArrowUp></ArrowUp>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleDown(item, e)}
                  >
                    <ArrowDown></ArrowDown>
                  </Button>
                </td>
                <td className="border border-slate-300">{index}</td>
                <td className="group border border-slate-300 text-blue-400 underline relative">
                  {item.name}
                  <input
                    type="text"
                    className="hidden group-hover:block absolute inset-0 hover:border"
                    value={item.name}
                    onChange={(e) => handleEditable(e, item)}
                  ></input>
                </td>
                <td className="border border-slate-300">{item.file}</td>
                <td className="border border-slate-300">{item.size}</td>
                <td className="border border-slate-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleRemove(item, e)}
                  >
                    <CircleMinus></CircleMinus>
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex flex-col items-center justify-center pt-4">
        <input
          onChange={handleChange}
          accept=".epub, .pdf"
          id="book-file-upload"
          type="file"
          name="book-file-upload"
          multiple
        ></input>
        <div className="text-sm">Pdf, epub</div>
      </div>
    </div>
  )
}
