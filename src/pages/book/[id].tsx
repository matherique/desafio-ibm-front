import * as React from 'react'
import { useRouter, withRouter } from 'next/router'

import BookDetails from '../../components/book-details'
import { BookInfo } from '../../types'
import api from '../../services/api'

type BookProps = {
  id: string
}

export function Book({ id }: BookProps): JSX.Element {
  const router = useRouter()
  const [book, setBook] = React.useState<BookInfo | undefined>()
  const [error, setError] = React.useState('')
  const bookUrl = (id: string) => `/api/book?id=${id}`

  async function getData(idBook: string) {
    try {
      const { data } = await api.get(bookUrl(idBook))
      setBook(data)
    } catch (error) {
      setError('something went wrong')
    }
  }

  React.useEffect(() => {
    getData(id)
  }, [id])

  return (
    <>
      {error ? <p>{error}</p> : null}
      {book ? <BookDetails info={book} /> : <p>carregando...</p>}
      <button onClick={() => router.back()}>voltar</button>
    </>
  )
}

export default withRouter(function ({ router }) {
  const id = router.query.id as string

  if (!router.isReady || !id) return <p>carregando...</p>

  return <Book id={id} />
})
