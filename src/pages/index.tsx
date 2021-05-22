import BookList from 'components/book-list'
import * as React from 'react'
import { BookInfo } from '../types'

function Home(): JSX.Element {
  const [query, setQuery] = React.useState('')
  const [books, setBooks] = React.useState<BookInfo[]>([])
  const [error, setError] = React.useState(false)

  const searchUrl = (term: string) => `/api/search?q=${encodeURI(term)}`

  React.useEffect(() => {
    if (!query.length) return
    const timetoutId = setTimeout(() => {
      fetch(searchUrl(query))
        .then(res => res.json())
        .then(res => setBooks(res.books))
        .catch(() => {
          setBooks([])
          setError(true)
        })
    }, 500)

    return () => clearTimeout(timetoutId)
  }, [query])

  return (
    <div>
      <input
        placeholder="buscar"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {query ? <p>resultados para: {query}</p> : null}
      {error ? <p style={{ color: '#f00' }}>something went wrong</p> : null}

      <BookList books={books} />
    </div>
  )
}

export default Home
