import { buildBook } from '../../test/generate'
import bookHandler, { Response } from '../../pages/api/book'
import api from '../../services/google-api'

jest.mock('../../services/google-api')
const mockedAxios = api as jest.Mocked<typeof api>

describe('API - /api/book', () => {
  let res: Response

  beforeEach(() => {
    res = {
      json: jest.fn(),
      setHeader: jest.fn(),
      status: jest.fn()
    }
  })

  it('should return status 200 and all book information', async () => {
    const id = 'id_book'
    const req = {
      query: { id }
    }
    const bookData = buildBook()

    mockedAxios.get = jest.fn().mockReturnValueOnce({
      data: bookData
    })

    await bookHandler(req, res)

    expect(mockedAxios.get).toHaveBeenCalledWith(`/${id}`)
    expect(res.json).toHaveBeenCalledWith(bookData)
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return status 400 when missing book id in call', async () => {
    const req = {
      query: {}
    }

    await bookHandler(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
  })

  it('should return status 500 when api call throw an error', async () => {
    const id = 'id_book'

    const req = {
      query: { id }
    }

    mockedAxios.get = jest.fn().mockImplementation(() => {
      throw new Error('api error')
    })

    await bookHandler(req, res)

    expect(mockedAxios.get).toHaveBeenCalledWith(`/${id}`)
    expect(res.json).toHaveBeenCalledWith({ message: 'something went wrong' })
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
