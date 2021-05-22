import * as React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { NextRouter, withRouter } from 'next/router'

import BookDetails from 'components/book-details'
import { useFetch } from 'utils/useFetch'
import { BookInfo } from 'types'
import { parseBookInfo } from 'utils/parser'

type BookProps = {
  router: NextRouter
}

/*
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<HomeProps> = async context => {
  const id = context.params.id as string

  return {
    props: {
      id
    }
  }
}
  */

function Book({ router }: BookProps): JSX.Element {
  const id = router.query.id as string

  const bookUrl = (id: string) =>
    `https://www.googleapis.com/books/v1/volumes/${id}`

  const { data } = useFetch<BookInfo>(bookUrl(id))

  if (!data) return <p>carregando...</p>

  return (
    <>
      <h1>Book #{id}</h1>
      <BookDetails info={data} />
      <button onClick={() => router.push('/')}>voltar</button>
    </>
  )
}

export default withRouter(Book)
