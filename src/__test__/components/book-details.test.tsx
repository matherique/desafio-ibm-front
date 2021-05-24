import * as React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import BookDetails from '../../components/book-details'
import { BookInfo } from '../../types'
import { buildBook } from '../../test/generate'
import { FAVORITES } from '../../constants'

describe('Book details', () => {
  let book: BookInfo

  beforeEach(() => {
    book = buildBook()
    localStorage.clear()
  })

  it('should render', async () => {
    render(<BookDetails info={book} />)
    const inpt = await screen.findByText(book.volumeInfo.title)
    expect(inpt).toBeInTheDocument()
  })

  it('should add to favorite', async () => {
    render(<BookDetails info={book} />)
    fireEvent.click(await screen.findByText(/favoritar/i))

    expect(localStorage.getItem(FAVORITES)).toBe(JSON.stringify([book]))
  })

  it('should remove favorite', async () => {
    localStorage.setItem(FAVORITES, JSON.stringify([book]))
    render(<BookDetails info={book} />)
    fireEvent.click(await screen.findByText(/remover favorito/i))

    expect(localStorage.getItem(FAVORITES)).toBe(JSON.stringify([]))
  })
})
