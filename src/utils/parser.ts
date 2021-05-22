import { BookInfo } from 'types'

export function parseBookInfo(book: BookInfo): BookInfo {
  return {
    id: book.id,
    volumeInfo: {
      title: book.volumeInfo?.title || null,
      subtitle: book.volumeInfo?.subtitle || null,
      authors: book.volumeInfo?.authors || [],
      description: book.volumeInfo?.description || null,
      imageLinks: {
        smallThumbnail: book.volumeInfo?.imageLinks?.smallThumbnail || null,
        thumbnail: book.volumeInfo?.imageLinks?.thumbnail || null
      }
    }
  }
}
