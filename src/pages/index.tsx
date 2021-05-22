import * as React from 'react'
import Link from 'next/link'
import { BookInfo } from '../types'

type BookItemProps = {
  id: string
  title: string
  subtitle: string
  smallThumbnail: string
}

function BookItem({
  id,
  title,
  subtitle,
  smallThumbnail
}: BookItemProps): JSX.Element {
  return (
    <article>
      <img src={smallThumbnail} />
      <h3>
        <Link href={`/book/${id}`}>
          <a>{title}</a>
        </Link>
      </h3>
      <h4>{subtitle}</h4>
    </article>
  )
}

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
        .then(res => setBooks(res))
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
      {books.map(book => (
        <BookItem
          key={book.id}
          id={book.id}
          smallThumbnail={book.smallThumbnail}
          title={book.title}
          subtitle={book.subtitle}
        />
      ))}
    </div>
  )
}

export default Home
