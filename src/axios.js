import axios from 'axios'

const demo = axios.create({
  baseURL: 'http://localhost:5000',
})

export default demo
