import * as React from 'react'
import { BookInfo } from 'types'

type BookDetailsProps = {
  info: BookInfo
}

function BookDetails({ info }: BookDetailsProps): JSX.Element {
  const [isFavorite, setIsFavorite] = React.useState(false)

  React.useEffect(() => {
    const favorites =
      (JSON.parse(localStorage.getItem('favorites_books')) as BookInfo[]) || []

    setIsFavorite(favorites.some(book => book.id === info.id))
  }, [])

  function handleAddFavorite() {
    const favorites =
      (JSON.parse(localStorage.getItem('favorites_books')) as BookInfo[]) || []
    const newfavorites = [...favorites, info]
    localStorage.setItem('favorites_books', JSON.stringify(newfavorites))
    setIsFavorite(true)
  }

  function handleRemoveFavorite() {
    const favorites =
      (JSON.parse(localStorage.getItem('favorites_books')) as BookInfo[]) || []
    const newfavorites = favorites.filter(book => book.id !== info.id)
    localStorage.setItem('favorites_books', JSON.stringify(newfavorites))
    setIsFavorite(false)
  }

  return (
    <>
      <h1>{info.volumeInfo.title}</h1>
      {info.volumeInfo.subtitle ? <h3>{info.volumeInfo.subtitle}</h3> : null}
      <h4>description</h4>
      <p>{info.volumeInfo.description}</p>
      {!isFavorite ? (
        <button onClick={() => handleAddFavorite()}>favoritar</button>
      ) : (
        <button onClick={() => handleRemoveFavorite()}>remover favorito</button>
      )}
    </>
  )
}

export default BookDetails
