import { buildBook } from '../../test/generate'
import searchHandler, { Response } from '../../pages/api/search'
import googleAPI from '../../services/google-api'

jest.mock('../../services/api')
const mockedAxios = googleAPI as jest.Mocked<typeof googleAPI>

describe('API - /api/search', () => {
  let res: Response

  beforeEach(() => {
    res = {
      json: jest.fn(),
      setHeader: jest.fn(),
      status: jest.fn()
    }
  })

  it('should return status 200 and a list of books', async () => {
    const q = 'harry potter'
    const startIndex = 0
    const req = {
      query: { q, startIndex }
    }
    mockedAxios.get = jest.fn().mockReturnValueOnce({
      data: {
        totalItems: 1,
        items: [buildBook()]
      }
    })

    await searchHandler(req, res)

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `?q=${encodeURI(q)}&orderBy=newest&startIndex=${startIndex}`
    )
    expect(res.json).toHaveBeenCalledWith({ total: 1, books: [buildBook()] })
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('should return status 400 when not passing ?q= param', async () => {
    const startIndex = 0
    const req = {
      query: { startIndex }
    }

    await searchHandler(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
  })

  it('should return status 500 when api call throw an error', async () => {
    const q = 'harry potter'
    const startIndex = 0

    const req = {
      query: { q, startIndex }
    }

    mockedAxios.get = jest.fn().mockImplementation(() => {
      throw new Error('api error')
    })

    await searchHandler(req, res)

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `?q=${encodeURI(q)}&orderBy=newest&startIndex=${startIndex}`
    )
    expect(res.json).toHaveBeenCalledWith({ message: 'something went wrong' })
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
