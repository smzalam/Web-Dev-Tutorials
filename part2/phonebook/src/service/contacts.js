import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then( response => {
        return response.data
    })
}

const addContact = (newContact) => {
    const request = axios.post(baseUrl, newContact)

    return request.then(response => {
        return response.data
    })
}

const updateNumber = (id, updatedContact) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedContact)

    return request.then(response => {
        return response.data
    })
}

const deleteContact = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, addContact, updateNumber, deleteContact }