const BASE_PATH = '/neos/impersonate/'

export default class ApiService {
    constructor(_csrfToken) {
        this._csrfToken = _csrfToken
    }

    async callUserChange(identifier) {
        const data = {
            user: identifier,
            format: 'json',
        }
        const response = await fetch(BASE_PATH + 'user-change', {
            method: 'POST',
            credentials: 'include',
            headers: this._getHeader(),
            body: JSON.stringify(data),
        })

        return await response.json()
    }

    async callStatus() {
        const response = await fetch(BASE_PATH + 'status', {
            method: 'GET',
            credentials: 'include',
            headers: this._getHeader(),
        })

        return await response.json()
    }

    async callRestore() {
        const response = await fetch(BASE_PATH + 'restore', {
            method: 'POST',
            credentials: 'include',
            headers: this._getHeader(),
        })

        return await response.json()
    }

    _getHeader() {
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Flow-Csrftoken': this._csrfToken,
        }
    }
}
