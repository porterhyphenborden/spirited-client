import React, { Component } from 'react'
import SpiritedContext from '../../SpiritedContext'
import SpiritedApiService from '../../services/spirited-api-service'
import ValidationError from '../ValidationError'
import './CocktailSearchForm.css'

export default class CocktailSearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchKey: '',
            searchTerm: '',
            searchKeyValid: false,
            searchTermValid: false,
            formValid: false,
            validationMessages: {
                searchKey: '',
                searchTerm: ''
            },
            error: null,
        }
    }

    static contextType = SpiritedContext

    componentDidMount() {
        this.setState({ error: null })
    }

    updateSearchKey(searchKey) {
        this.setState({searchKey}, () => {this.validateKey(searchKey)})
    }

    updateSearchTerm(searchTerm) {
        this.setState({searchTerm}, () => {this.validateTerm(searchTerm)})
    }

    validateKey(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false

        fieldValue = fieldValue.trim()
        if (fieldValue.length === 0) {
            fieldErrors.key = 'Search by name or ingredient is required.'
            hasError = true
        }
        else {
            fieldErrors.key = ''
            hasError = false
        }

        this.setState({
            validationMessages: fieldErrors,
            searchKeyValid: !hasError
        }, this.formValid )
    }

    validateTerm(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false

        fieldValue = fieldValue.trim()
        if (fieldValue.length === 0) {
            fieldErrors.key = 'Search term is required.'
            hasError = true
        }
        else {
            fieldErrors.key = ''
            hasError = false
        }

        this.setState({
            validationMessages: fieldErrors,
            searchTermValid: !hasError
        }, this.formValid )
    }

    formValid() {
        this.setState({
            formValid: this.state.searchKeyValid && this.state.searchTermValid
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ error: null })
        const searchKey = this.state.searchKey
        const searchTerm = this.state.searchTerm
        SpiritedApiService.getCocktails(searchKey, searchTerm)
            .then((cocktails) => {
                if (cocktails.length === 0) {
                    this.setState({ error: 'Your search returned no results.' })
                }
                this.context.setCocktailList(cocktails)
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form className='cocktail-search' onSubmit={e => this.handleSubmit(e)}>
                <h2>Or search for cocktails</h2>
                <div className='form-group'>
                    <label htmlFor='search-by'>Search by:</label>
                    <select id='search-by' name='search-by' onChange={e => this.updateSearchKey(e.target.value)}>
                        <option value={null}>...</option>
                        <option value='name'>Name</option>
                        <option value='ingredient'>Ingredient</option>
                    </select>
                    <ValidationError hasError={!this.state.searchKeyValid} message={this.state.validationMessages.searchKey}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='search-term'>Search for:</label>
                    <input type='text' name='search-term' id='search-term' onChange={e => this.updateSearchTerm(e.target.value)}/>
                    <ValidationError hasError={!this.state.searchTermValid} message={this.state.validationMessages.searchTerm}/>
                </div>
                <button className='cocktail-search' type='submit' disabled={!this.state.formValid}>Search</button>
                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
                </div>
            </form>
        )
    }
}