import api from '../../services/google-api'
import { BookInfo } from '../../types'
import { parseBookInfo } from '../../utils/parser'

export type Request = {
  query: {
    id?: string
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
  try {
    const { id } = req.query

    if (!id) {
      res.status(400)
      return
    }

    const { data } = await api.get<BookInfo>(`/${id}`)

    const book = parseBookInfo(data)

    res.setHeader('Content-Type', 'application/json')
    res.status(200)
    res.json(book)
  } catch (error) {
    res.status(500)
    res.json({ message: 'something went wrong' })
  }
}
