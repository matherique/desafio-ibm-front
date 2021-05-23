import BookList from 'components/book-list'
import * as React from 'react'
import { BookInfo } from '../types'

const PER_PAGE = 10
const DEFAULT_START_INDEX = 0

function Home(): JSX.Element {
  const [startIndex, setStartIndex] = React.useState(DEFAULT_START_INDEX)
  const [totalItemsFound, setTotalBooksFound] = React.useState(0)
  const [query, setQuery] = React.useState('')
  const [books, setBooks] = React.useState<BookInfo[]>([])
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const searchUrl = (term: string, index: number) =>
    `/api/search?q=${encodeURI(term)}&startIndex=${index}`

  React.useEffect(() => {
    if (!query.length) return
    setLoading(true)
    const timetoutId = setTimeout(() => {
      fetch(searchUrl(query, startIndex))
        .then(res => res.json())
        .then(res => {
          setTotalBooksFound(res.total)
          setBooks(res.books)
          setLoading(false)
        })
        .catch(() => {
          setTotalBooksFound(0)
          setBooks([])
          setError(true)
          setLoading(false)
        })
    }, 500)

    return () => clearTimeout(timetoutId)
  }, [query, startIndex])

  const handleNext = React.useCallback(
    () => setStartIndex(old => old + PER_PAGE),
    []
  )

  const handlePrev = React.useCallback(
    () => setStartIndex(old => old - PER_PAGE),
    []
  )

  return (
    <div>
      <input
        placeholder="buscar"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {error ? <p style={{ color: '#f00' }}>something went wrong</p> : null}
      {loading && !books.length ? <p>carregando...</p> : null}
      {books.length ? (
        <>
          <p>resultados para: {query}</p>
          <p>foi encontrado: {totalItemsFound} resultados</p>
          <button disabled={startIndex === 0} onClick={() => handlePrev()}>
            prev
          </button>
          <button
            disabled={startIndex + PER_PAGE > totalItemsFound}
            onClick={() => handleNext()}
          >
            next
          </button>
          {!loading ? <BookList books={books} /> : <p>carregando...</p>}
        </>
      ) : null}
    </div>
  )
}

export default Home
