import config from '../config'

const SpiritedApiService = {
    getCocktails(searchKey, searchTerm) {
        return fetch(`${config.API_ENDPOINT}/cocktails?${searchKey}=${searchTerm}`, {
            method: 'GET',
            headers: {
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getCocktail(cocktailId) {
        return fetch(`${config.API_ENDPOINT}/cocktails/${cocktailId}`, {
            method: 'GET',
            headers: {
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getIndredientsForCocktail(cocktailId) {
        return fetch(`${config.API_ENDPOINT}/cocktails/${cocktailId}/ingredients`, {
            method: 'GET',
            headers: {
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getUnits() {
        return fetch(`${config.API_ENDPOINT}/units`, {
            method: 'GET',
            headers: {
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getIngredients() {
        return fetch(`${config.API_ENDPOINT}/ingredients`, {
            method: 'GET',
            headers: {
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postIngredient(ingredient) {
        return fetch(`${config.API_ENDPOINT}/ingredients`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                name: ingredient
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
}

export default SpiritedApiService;