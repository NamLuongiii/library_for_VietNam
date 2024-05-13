'use client'

import { bookDocumentsUpoad, uploadSingleImage } from '@/app/help/firebase'
import BaseUpdate from '../base/baseUpdate'
import { extractBookExtension, stringToReadbleUrl } from '@/app/help/uitilies'

export function ClientWrap(props) {
  async function handleBeforeSubmit(input) {
    // cover
    const cover = input.cover
    if (cover && typeof cover == 'object') {
      input.cover = await uploadSingleImage(input.cover)
    }
    // file documents
    const files = input.files
    if (files && files.length && files[0] instanceof File) {
      const urls = await bookDocumentsUpoad(files)
      input.files = files.map((file, index) => {
        return {
          name: file.name,
          url: urls[index],
          extension: extractBookExtension(file.type),
        }
      })
    }
    return input
  }

  return <BaseUpdate beforeSubmit={handleBeforeSubmit} {...props}></BaseUpdate>
}
