import * as React from 'react'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Home from '../../pages'
import { withAppConext } from '../../test/utils'
import { BookInfo } from '../../types'
import { buildBook } from '../../test/generate'
import api from '../../services/api'

jest.mock('../../services/api')
const mockedAxios = api as jest.Mocked<typeof api>

describe('Home', () => {
  let books: BookInfo[]

  beforeEach(() => {
    books = [buildBook()]
  })

  it('should render', async () => {
    render(withAppConext(<Home />))
    const inpt = await screen.findByPlaceholderText(/buscar/i)
    expect(inpt).toBeInTheDocument()
  })

  it('should call api when search a book', async () => {
    mockedAxios.get = jest.fn().mockReturnValueOnce({
      data: {
        total: 1,
        books: [buildBook()]
      }
    })
    render(withAppConext(<Home />))
    const input = screen.getByPlaceholderText(/buscar/i)
    fireEvent.change(input, { target: { value: 'harry' } })
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1))
    expect(
      await screen.findByText(books[0].volumeInfo.title)
    ).toBeInTheDocument()
  })

  it('should show error message when api throw an error', async () => {
    mockedAxios.get = jest.fn().mockImplementation(() => {
      throw new Error('api error')
    })
    render(withAppConext(<Home />))
    const input = screen.getByPlaceholderText(/buscar/i)
    fireEvent.change(input, { target: { value: 'harry' } })
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1))
    expect(await screen.findByTestId('error')).toBeInTheDocument()
  })
})
