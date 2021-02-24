const BASE_PATH = '/neos/impersonate/';

export default class ApiService {
    constructor(_csrfToken) {
        this._csrfToken = _csrfToken;
    }

    async callUserChange(accountIdentifier) {
        const account = {
            account:  accountIdentifier
        };
        const response = await fetch(BASE_PATH + 'user-change', {
            method: 'POST',
            credentials: 'include',
            headers: this._getHeader(),
            body: JSON.stringify(account)
        });
        return response;
    }

     async callStatus() {
        const response = await fetch(BASE_PATH + 'status', {
            method: 'GET',
            credentials: 'include',
            headers: this._getHeader()
        });
        return response;
    }

    _getHeader() {
        return {
            'Content-Type': 'application/json',
            'X-Flow-Csrftoken': this._csrfToken,
        };
    }
}
