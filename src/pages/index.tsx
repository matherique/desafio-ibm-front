import React from 'react'
import Link from 'next/link'
import api from 'services/api'

type BookInfo = {
  id: string
  link: string
  title: string
  subtitle: string
  authors: string[]
  description: string
  smallThumbnail: string
  thumbnail: string
}

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
  const [query, setQuery] = React.useState<string>('')
  const [bookList, setBookList] = React.useState<BookInfo[]>([])

  async function getBookData() {
    try {
      if (!query || query.length <= 4) return

      const { data } = await api.get(`?q=${encodeURIComponent(query)}`)
      const bookData = data.items.map(book => {
        const { id, volumeInfo } = book
        return {
          id: Number(id),
          link: volumeInfo.selfLink,
          title: volumeInfo.title,
          subtitle: volumeInfo.subtitle,
          authors: volumeInfo.authors,
          description: volumeInfo.description,
          smallThumbnail: volumeInfo?.imageLinks?.smallThumbnail,
          thumbnail: volumeInfo?.imageLinks?.thumbnail
        }
      })

      setBookList(bookData)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getBookData()
  }, [query])

  return (
    <div>
      <input
        placeholder="buscar"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {query ? <p>resultados para: {query}</p> : null}
      {bookList.map(book => (
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
