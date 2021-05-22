import { NextApiRequest, NextApiResponse } from 'next'
import api from 'services/api'
import { SearchResponse } from 'types'
import { parseBookInfo } from 'utils/parser'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const query = (req.query?.q as string) || ''

  if (!query || query.length <= 4) return res.send({ books: [] })

  const { data } = await api.get<SearchResponse>(`?q=${encodeURI(query)}`)

  const bookList = data.items.map(parseBookInfo)

  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({
    total: data.totalItems,
    books: bookList
  })
}
