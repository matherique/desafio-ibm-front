import axios from 'axios'

const PORT = process.env.PORT || 3000

export default axios.create({
  baseURL: `http://localhost:${PORT}`
})
