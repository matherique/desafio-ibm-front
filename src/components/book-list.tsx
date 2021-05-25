import * as React from 'react'
import Link from 'next/link'
import type { BookInfo } from 'types'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const BookItem = styled.div`
  display: flex;
`

const BookImage = styled.div`
  height: 180px;
  & > img {
    width: 100px;
    margin: 0 10px;
  }
`

type BookListProps = {
  books: BookInfo[]
}

function BookList({ books }: BookListProps): JSX.Element {
  return (
    <Container>
      {books.length ? (
        books.map(book => (
          <BookItem key={book.id}>
            <BookImage>
              <img
                src={
                  book.volumeInfo.imageLinks.smallThumbnail || '/no-image.jpg'
                }
              />
            </BookImage>
            <div>
              <header>
                <h3>
                  <Link href={`/book/${book.id}`}>
                    <a>{book.volumeInfo.title}</a>
                  </Link>
                </h3>
                <h4>{book.volumeInfo.subtitle}</h4>
              </header>
              <p>{book.volumeInfo?.description?.substr(0, 100)}...</p>
            </div>
          </BookItem>
        ))
      ) : (
        <p>no book found</p>
      )}
    </Container>
  )
}

export default BookList
