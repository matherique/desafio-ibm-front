import * as React from 'react'

import { act, render, screen } from '@testing-library/react'
import { Book } from '../../pages/book/[id]'
import { BookInfo } from '../../types'
import { buildBook } from '../../test/generate'
import api from '../../services/api'

jest.mock('../../services/api')
const mockedAxios = api as jest.Mocked<typeof api>

describe('Book page', () => {
  let book: BookInfo

  beforeEach(() => {
    book = buildBook()
  })

  it('should render a book information', async () => {
    mockedAxios.get = jest.fn().mockReturnValueOnce({
      data: book
    })
    await act(async () => render(<Book id={'id_book'} />))

    expect(await screen.findByText(book.volumeInfo.title)).toBeInTheDocument()
  })

  it('should show an erro when api throw and error', async () => {
    mockedAxios.get = jest.fn().mockImplementation(() => {
      throw new Error('api erro')
    })
    await act(async () => render(<Book id={'id_book'} />))

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })
})
