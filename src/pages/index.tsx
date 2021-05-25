import * as React from 'react'
import styled from 'styled-components'
import BookList from '../components/book-list'
import { useApp } from '../context/app-context'
import Button from '../components/button'
import api from '../services/api'
import Link from 'next/link'

const PER_PAGE = 10

const Container = styled.div`
  padding: 10px;
`

const Search = styled.input`
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 2rem;
`

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
`

const ResultInfo = styled.p`
  padding: 5px;
`

const FavoriteLink = styled.p`
  padding: 5px;
  text-align: right;
`
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
    <Container>
      <FavoriteLink>
        <Link href="/favorites">
          <a>ver favoritos</a>
        </Link>
      </FavoriteLink>
      <Search
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
          <ResultInfo>resultados para: {query}</ResultInfo>
          {!loading ? <BookList books={books} /> : <p>carregando...</p>}
          <Pagination>
            <Button disabled={index === 0} onClick={() => handlePrev()}>
              {'<<'}
            </Button>
            <Button
              disabled={index + PER_PAGE > total}
              onClick={() => handleNext()}
            >
              {'>>'}
            </Button>
          </Pagination>
        </>
      ) : null}
    </Container>
  )
}

export default Home
