import * as React from 'react'
import Link from 'next/link'
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
    <div>
      <div>
        <img src={smallThumbnail} />
      </div>
      <div>
        <header>
          <h3>
            <Link href={`/book/${id}`}>
              <a>{title}</a>
            </Link>
          </h3>
          <h4>{subtitle}</h4>
        </header>
        <p>description</p>
      </div>
    </div>
  )
}

type BookListProps = {
  books: BookInfo[]
}

function BookList({ books }: BookListProps): JSX.Element {
  return (
    <div>
      {books.length ? (
        books.map(book => (
          <BookItem
            key={book.id}
            id={book.id}
            smallThumbnail={book.volumeInfo.imageLinks.smallThumbnail}
            title={book.volumeInfo.title}
            subtitle={book.volumeInfo.subtitle}
          />
        ))
      ) : (
        <p>no book found</p>
      )}
    </div>
  )
}

export default BookList
