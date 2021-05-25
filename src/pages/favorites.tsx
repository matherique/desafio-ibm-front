import * as React from 'react'
import BookList from '../components/book-list'
import { BookInfo } from '../types'
import { FAVORITES } from '../constants'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Button from '../components/button'

const Info = styled.div`
  margin: 10px 0px;
`

const Container = styled.div`
  padding: 10px;
`

function Favorites(): JSX.Element {
  const router = useRouter()
  const [books, setBooks] = React.useState<BookInfo[]>([])

  React.useEffect(() => {
    const favorites =
      (JSON.parse(localStorage.getItem(FAVORITES)) as BookInfo[]) || []
    setBooks(favorites)
  }, [])

  return (
    <Container>
      <Button onClick={() => router.back()}>voltar</Button>
      <Info>
        <h1>Favoritos</h1>
        <p>lista de livros favoritados</p>
      </Info>
      <BookList books={books} />
    </Container>
  )
}

export default Favorites
