import * as React from 'react'
import BookList from 'components/book-list'
import { useApp } from 'context/app-context'

const PER_PAGE = 10

function Home(): JSX.Element {
  const { state, dispatch } = useApp()
  const { books, query, index, error, total, loading } = state

  const searchUrl = (term: string, index: number) =>
    `/api/search?q=${encodeURI(term)}&startIndex=${index}`

  React.useEffect(() => {
    if (!query.length) return

    const timetoutId = setTimeout(() => {
      dispatch({ type: 'SEARCHING' })

      fetch(searchUrl(query, index))
        .then(res => res.json())
        .then(res => {
          const { books, total } = res
          dispatch({ type: 'SUCCESS', payload: { query, books, total } })
        })
        .catch(() => {
          dispatch({ type: 'FAIL' })
        })
    }, 500)

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
        value={query}
        onChange={e =>
          dispatch({ type: 'TYPING', payload: { query: e.target.value } })
        }
      />
      {error ? <p style={{ color: '#f00' }}>{error}</p> : null}
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
