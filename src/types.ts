type VolumeInfo = {
  title: string
  subtitle: string
  authors: string[]
  description: string
  imageLinks: {
    smallThumbnail: string
    thumbnail: string
  }
}

export type BookInfo = {
  id: string
  volumeInfo: VolumeInfo
}

export type SearchResponse = {
  totalItems: number
  items: BookInfo[]
}
