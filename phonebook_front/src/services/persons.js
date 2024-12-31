import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const create = person => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

export default {
    getAll,
    create
}