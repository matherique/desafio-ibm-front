import * as React from 'react'
import { useRouter, withRouter } from 'next/router'
import styled from 'styled-components'

import BookDetails from '../../components/book-details'
import Button from '../../components/button'
import { BookInfo } from '../../types'
import api from '../../services/api'

type BookProps = {
  id: string
}

const Container = styled.div`
  width: 80vw;
  padding: 10px;

  @media (max-width: 800px) {
    width: 100vw;
  }
`

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
    <Container>
      <div style={{ marginBottom: '5px' }}>
        <Button onClick={() => router.back()}>voltar</Button>
      </div>
      {error ? <p>{error}</p> : null}
      {book ? <BookDetails info={book} /> : <p>carregando...</p>}
    </Container>
  )
}

export default withRouter(function ({ router }) {
  const id = router.query.id as string

  if (!router.isReady || !id) return <p>carregando...</p>

  return <Book id={id} />
})
