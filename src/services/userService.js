import httpService from './httpService'

const apiEndPoint = 'https://reqres.in/api'

export function getUsers() {
    return httpService.get(apiEndPoint + '/users')
}

export function getUser(id) {
    return httpService.get(apiEndPoint + `/users/${id}`)
}

export function saveUser(user) {
    if (user.id) {
        const body ={...user}
        delete body.id
        return httpService.put(apiEndPoint + `/users/${user.id}`, body)
    }
    return httpService.post(apiEndPoint + '/users', user)
}

export function deleteUser(id) {
    return httpService.delete(apiEndPoint + `/users${id}`)
}