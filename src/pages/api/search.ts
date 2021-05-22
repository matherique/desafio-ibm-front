import { NextApiRequest, NextApiResponse } from 'next'
import api from 'services/api'
import { SearchResponse } from 'types'
import { parseBookInfo } from 'utils/parser'

const TEMPO_CACHE = 60 * 60

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { q, startIndex } = req.query as { q: string; startIndex: string }

  if (!q || q.length <= 4) return res.send({ books: [] })

  const { data } = await api.get<SearchResponse>(
    `?q=${encodeURI(q)}&startIndex=${startIndex}`
  )

  const bookList = data.items.map(parseBookInfo)
  res.setHeader(
    'Cache-Control',
    `s-maxage=${TEMPO_CACHE}, stale-while-revalidate`
  )
  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({
    total: data.totalItems,
    books: bookList
  })
}
