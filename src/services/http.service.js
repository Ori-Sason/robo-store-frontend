import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'api/'
    : '//localhost:3030/api/'

let axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint, data, isFullUrl) {
        return ajax(endpoint, 'GET', data, isFullUrl)
    },
    post(endpoint, data, isFullUrl) {
        return ajax(endpoint, 'POST', data, isFullUrl)
    },
    put(endpoint, data, isFullUrl) {
        return ajax(endpoint, 'PUT', data, isFullUrl)
    },
    delete(endpoint, data, isFullUrl) {
        return ajax(endpoint, 'DELETE', data, isFullUrl)
    },
}

async function ajax(endpoint, method = 'GET', data = null, isFullUrl = false) {
    try {
        const res = await axios({
            url: isFullUrl ? endpoint : `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            // sessionStorage.clear()
        }
        throw err
    }
}