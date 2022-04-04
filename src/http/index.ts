import axios, { AxiosInstance } from 'axios'

const clienteHttp: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001/',
})

export default clienteHttp;