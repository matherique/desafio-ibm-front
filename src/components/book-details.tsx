import * as React from 'react'
import styled from 'styled-components'
import { FAVORITES } from '../constants'
import { BookInfo } from '../types'

type BookDetailsProps = {
  info: BookInfo
}

const Container = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`
const BookImage = styled.div`
  & > img {
    max-width: 300px;
  }
`

const BookTitle = styled.div`
  margin-bottom: 20px;
`

const BookButtom = styled.div`
  margin: 20px 0;
`

type FavButtonProps = {
  isFavorite?: boolean
}
const FavButton = styled.a<FavButtonProps>`
  font-size: 1rem;
  width: 200px;
  cursor: pointer;
  padding: 2px 5px;
  background-color: ${pros => (pros.isFavorite ? '#fef171' : '#f36766')};
`

function BookDetails({ info }: BookDetailsProps): JSX.Element {
  const [isFavorite, setIsFavorite] = React.useState(false)

  React.useEffect(() => {
    const favorites =
      (JSON.parse(localStorage.getItem(FAVORITES)) as BookInfo[]) || []

    setIsFavorite(favorites.some(book => book.id === info.id))
  }, [])

  function handleAddFavorite() {
    const favorites =
      (JSON.parse(localStorage.getItem(FAVORITES)) as BookInfo[]) || []
    const newfavorites = [...favorites, info]
    localStorage.setItem(FAVORITES, JSON.stringify(newfavorites))
    setIsFavorite(true)
  }

  function handleRemoveFavorite() {
    const favorites =
      (JSON.parse(localStorage.getItem(FAVORITES)) as BookInfo[]) || []
    const newfavorites = favorites.filter(book => book.id !== info.id)
    localStorage.setItem(FAVORITES, JSON.stringify(newfavorites))
    setIsFavorite(false)
  }

  return (
    <Container>
      <BookImage>
        <img src={info.volumeInfo.imageLinks.thumbnail || '/no-image.jpg'} />
      </BookImage>
      <div>
        <BookTitle>
          <h1>{info.volumeInfo.title}</h1>
          {info.volumeInfo.subtitle ? (
            <h3>{info.volumeInfo.subtitle}</h3>
          ) : null}
          <p>{info.volumeInfo.authors?.join(', ')}</p>
        </BookTitle>
        <h4>Description:</h4>
        <div
          dangerouslySetInnerHTML={{ __html: info.volumeInfo.description }}
        />
        <BookButtom>
          {!isFavorite ? (
            <FavButton isFavorite onClick={() => handleAddFavorite()}>
              ⭐ favoritar
            </FavButton>
          ) : (
            <FavButton onClick={() => handleRemoveFavorite()}>
              ❌ remover favorito
            </FavButton>
          )}
        </BookButtom>
      </div>
    </Container>
  )
}

export default BookDetails
