import * as React from 'react'

import Favorite from '../../pages/favorites'
import { act, render, screen } from '@testing-library/react'
import { BookInfo } from '../../types'
import { buildBook } from '../../test/generate'
import { FAVORITES } from '../../constants'

describe('Favorite Books Page', () => {
  let books: BookInfo[]

  beforeEach(() => {
    books = [buildBook()]
  })

  it('should render', async () => {
    localStorage.setItem(FAVORITES, JSON.stringify(books))
    await act(async () => render(<Favorite />))
    const title = await screen.findByText(books[0].volumeInfo.title)
    expect(title).toBeInTheDocument()
  })
})
