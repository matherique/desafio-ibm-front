import * as React from 'react'
import BookList from '../components/book-list'
import { useApp } from '../context/app-context'
import api from '../services/api'

const PER_PAGE = 10

function Home(): JSX.Element {
  const { state, dispatch } = useApp()
  const { books, query, index, error, total, loading } = state

  const searchUrl = (term: string, index: number) =>
    `/api/search?q=${encodeURI(term)}&startIndex=${index}`

  async function search() {
    dispatch({ type: 'SEARCHING' })

    try {
      const res = await api.get(searchUrl(query, index))
      const { books, total } = res.data

      dispatch({ type: 'SUCCESS', payload: { query, books, total } })
    } catch (erro) {
      dispatch({ type: 'FAIL' })
    }
  }

  React.useEffect(() => {
    if (!query.length) return

    const timetoutId = setTimeout(search, 500)

    return () => clearTimeout(timetoutId)
  }, [query, index])

  const handleNext = React.useCallback(
    () =>
      dispatch({
        type: 'PAGE',
        payload: {
          index: index + PER_PAGE
        }
      }),
    [index, dispatch]
  )

  const handlePrev = React.useCallback(
    () =>
      dispatch({
        type: 'PAGE',
        payload: {
          index: index - PER_PAGE
        }
      }),
    [index, dispatch]
  )

  return (
    <div>
      <input
        placeholder="buscar"
        name="search"
        value={query}
        onChange={e =>
          dispatch({ type: 'TYPING', payload: { query: e.target.value } })
        }
      />
      {error ? <p data-testid="error">{error}</p> : null}
      {books.length ? (
        <>
          <p>resultados para: {query}</p>
          <button disabled={index === 0} onClick={() => handlePrev()}>
            prev
          </button>
          <button
            disabled={index + PER_PAGE > total}
            onClick={() => handleNext()}
          >
            next
          </button>
          {!loading ? <BookList books={books} /> : <p>carregando...</p>}
        </>
      ) : null}
    </div>
  )
}

export default Home
