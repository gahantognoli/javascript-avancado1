export class HttpService {

    _handleErros(res) {
        if (!res.ok) throw new Error(res.statusText)
        return res;
    }

    get(url) {
        return fetch(url)
            .then(response => this._handleErros(response))
            .then(response => response.json());
    }

    post(url, dado) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(dado)
        })
        .then(response => this._handleErros(response))
        .then(response => response.json());
    }

}