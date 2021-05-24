import * as React from 'react'

import { render, screen } from '@testing-library/react'
import BookList from '../../components/book-list'
import { BookInfo } from '../../types'
import { buildBook } from '../../test/generate'

describe('Book List', () => {
  let books: BookInfo[]

  beforeEach(() => {
    books = [buildBook()]
  })

  it('should render', async () => {
    render(<BookList books={books} />)
    const title = await screen.findByText(books[0].volumeInfo.title)
    expect(title).toBeInTheDocument()
  })

  it('should show message when no book was found', async () => {
    render(<BookList books={[]} />)
    const msg = await screen.findByText(/no book found/i)
    expect(msg).toBeInTheDocument()
  })
})
