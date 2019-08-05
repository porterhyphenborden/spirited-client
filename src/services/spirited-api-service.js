import TokenService from '../services/token-service'
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
                'authorization': `bearer ${TokenService.getAuthToken()}`,
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
    postcocktail(cocktail) {
        return fetch(`${config.API_ENDPOINT}/cocktails`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(cocktail),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postCocktailIngredient(ingredient) {
        return fetch(`${config.API_ENDPOINT}/cocktail-ingredients`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(ingredient),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getUserCocktails() {
        return fetch(`${config.API_ENDPOINT}/my-cocktails`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    patchCocktail(cocktail, id) {
        return fetch(`${config.API_ENDPOINT}/cocktails/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(cocktail),
        })
            .then(res =>
                (!res.ok)
                    ? res.text().then(e => Promise.reject(e))
                    : res.text()
            )
    },
    patchCocktailIngredient(ingredient, ciID) {
        const newIngredient = {
            ingredient_id: ingredient.id,
            unit: ingredient.unit,
            quantity: ingredient.quantity,
        }
        return fetch(`${config.API_ENDPOINT}/cocktail-ingredients/${ciID}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newIngredient),
        })
            .then(res =>
                (!res.ok)
                    ? res.text().then(e => Promise.reject(e))
                    : res.text()
            )
    },
    deleteCocktailIngredient(id) {
        return fetch(`${config.API_ENDPOINT}/cocktail-ingredients/${id}`, {
            method: 'DELETE',
            headers: {
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.text().then(e => Promise.reject(e))
                    : res.text()
            )
    },
    deleteCocktail(id) {
        return fetch(`${config.API_ENDPOINT}/cocktails/${id}`, {
            method: 'DELETE',
            headers: {
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.text().then(e => Promise.reject(e))
                    : res.text()
            )
    },
    getCocktailCollections() {
        return fetch(`${config.API_ENDPOINT}/collections`, {
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
    getCocktailsForCollection(id) {
        return fetch(`${config.API_ENDPOINT}/collections/${id}/cocktails`, {
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
    getCollectionById(id) {
        return fetch(`${config.API_ENDPOINT}/collections/${id}`, {
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
}

export default SpiritedApiService