import api from '../../services/google-api'
import { SearchResponse } from '../../types'
import { parseBookInfo } from '../../utils/parser'

const TEMPO_CACHE = 60 * 60

export type Request = {
  query: {
    q?: string
    startIndex: number
  }
}

export interface Response {
  json: (body: any) => void
  setHeader: (name: string, value: string) => void
  status: (code: number) => void
}

export default async function handler(
  req: Request,
  res: Response
): Promise<void> {
  const { q, startIndex } = req.query

  if (!q?.length) {
    res.status(400)
    res.json({ message: 'missing query' })
    return
  }

  try {
    const resp = await api.get<SearchResponse>(
      `?q=${encodeURI(q)}&orderBy=newest&startIndex=${startIndex || 0}`
    )

    const { data } = resp

    const bookList = data.items.map(parseBookInfo)
    res.setHeader(
      'Cache-Control',
      `s-maxage=${TEMPO_CACHE}, stale-while-revalidate`
    )
    res.setHeader('Content-Type', 'application/json')
    res.status(200)
    res.json({
      total: data.totalItems,
      books: bookList
    })
  } catch (error) {
    res.status(500)
    res.json({ message: 'something went wrong' })
  }
}
