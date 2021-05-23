import * as React from 'react'
import BookList from 'components/book-list'
import { BookInfo } from 'types'

function Favorites(): JSX.Element {
  const [books, setBooks] = React.useState<BookInfo[]>([])

  React.useEffect(() => {
    const favorites =
      (JSON.parse(localStorage.getItem('favorites_books')) as BookInfo[]) || []
    setBooks(favorites)
  }, [])

  return (
    <>
      <h2>Favoritos</h2>
      {books.length ? <BookList books={books} /> : <p>carregando...</p>}
    </>
  )
}

export default Favorites
