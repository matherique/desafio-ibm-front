import Link from 'next/link'
import * as React from 'react'
import type { BookInfo } from 'types'

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

type BookListProps = {
  books: BookInfo[]
}

function BookList({ books }: BookListProps): JSX.Element {
  return (
    <div>
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

export default BookList
