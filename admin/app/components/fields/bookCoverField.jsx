'use client'

import { handleImageUpload } from '@/app/help/imageCompressor'
import { formatBytes } from '@/app/help/uitilies'
import { Avatar, Chip, FormHelperText } from '@mui/material'
import { useState } from 'react'

export default function BookCoverField(props) {
  const {
    id,
    name,
    type,
    label,
    value,
    onchange,
    isDisplay,
    required,
    errorMessage,
  } = props

  const [file, setFile] = useState()

  async function handleChange(e) {
    const f = await handleImageUpload(e)
    if (f) onchange(f)
    setFile(f)
  }

  function objectUrl(file) {
    return window.URL.createObjectURL(file)
  }

  if (isDisplay)
    return (
      <div className="px-8 py-4">
        <Avatar
          src={value}
          variant="square"
          className="w-44 aspect-square h-44"
        ></Avatar>
      </div>
    )

  return (
    <div className="px-8 py-4">
      <label
        htmlFor={id}
        required
        className={`text-sm text-gray-600 mr-4 ${required && "after:content-['*']"}`}
      >
        {label}
      </label>
      <input
        type="file"
        accept="image/*"
        id={id}
        name={name}
        onChange={handleChange}
        required={required}
      ></input>
      {file && (
        <div className="text-sm text-gray-400 py-2">
          {file.name}{' '}
          <Chip label={formatBytes(file.size)} color="warning"></Chip>
        </div>
      )}
      {file && (
        <Avatar
          alt="cover preview"
          src={objectUrl(file)}
          variant="square"
          className="w-44 aspect-square h-44"
        ></Avatar>
      )}
      {!file && value && (
        <Avatar
          alt="cover preview"
          src={value}
          variant="square"
          className="w-44 aspect-square h-44 my-4"
        ></Avatar>
      )}
      <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
    </div>
  )
}
