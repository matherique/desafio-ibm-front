import { NextApiRequest, NextApiResponse } from 'next'
import api from 'services/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const query = (req.query?.q as string) || ''

  if (!query || query.length <= 4) return res.send({ books: [] })

  const { data } = await api.get(`?q=${encodeURI(query)}`)
  const bookList =
    data.items.map(({ id, volumeInfo, selfLink }) => {
      return {
        id: id,
        link: selfLink,
        title: volumeInfo?.title,
        subtitle: volumeInfo?.subtitle || null,
        authors: volumeInfo?.authors,
        description: volumeInfo?.description,
        smallThumbnail: volumeInfo?.imageLinks?.smallThumbnail || null,
        thumbnail: volumeInfo?.imageLinks?.thumbnail || null
      }
    }) || []

  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(bookList)
}
