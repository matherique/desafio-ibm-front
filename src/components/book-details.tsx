import * as React from 'react'
import { BookInfo } from 'types'

type BookDetailsProps = {
  info: BookInfo
}

function BookDetails({ info }: BookDetailsProps): JSX.Element {
  return (
    <>
      <h1>{info.volumeInfo.title}</h1>
      {info.volumeInfo.subtitle ? <h3>{info.volumeInfo.subtitle}</h3> : null}
      <h4>description</h4>
      <p>{info.volumeInfo.description}</p>
    </>
  )
}

export default BookDetails
