import * as React from 'react'
import { NextRouter, withRouter } from 'next/router'

import BookDetails from 'components/book-details'
import { useFetch } from 'utils/useFetch'
import { BookInfo } from 'types'

type BookProps = {
  router: NextRouter
}

function Book({ router }: BookProps): JSX.Element {
  const id = router.query.id as string

  const bookUrl = (id: string) => `/api/book?id=${id}`

  if (!id) return <p>carregando...</p>

  const { data } = useFetch<BookInfo>(bookUrl(id))

  if (!router.isReady || !data) return <p>carregando...</p>

  return (
    <>
      <BookDetails info={data} />
      <button onClick={() => router.back()}>voltar</button>
    </>
  )
}

export default withRouter(Book)
