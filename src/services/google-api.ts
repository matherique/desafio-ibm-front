import axios from 'axios'

const API_KEY = process.env.API_KEY

let params: any

if (API_KEY) {
  params = { key: API_KEY }
}

export default axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes',
  params
})
