import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SpiritedApiService from '../../services/spirited-api-service'
import './CocktailCollections.css'

export default class CocktailCollections extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            collections: [],
        }
    }

    componentDidMount() {
        SpiritedApiService.getCocktailCollections()
            .then((collections) => {
                this.setState({collections})
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const collections = this.state.collections
        const error = this.state.error
        return (
            <div className='collections'>
                <h2>Peruse Spirited's Cocktail Collections</h2>
                <div role='alert'>
                    {error && <div className='error'>{error}</div>}
                </div>
                <ul className='collections'>
                    {collections.map(collection =>
                        <li className='collection' key={collection.id}>
                            <img src={collection.image_src} className='collection-icon' alt={collection.name}/>
                            <div className='collection-text'>
                                <h3>
                                    <Link to={`/collections/${collection.id}`}>
                                        {collection.name}
                                    </Link>
                                </h3>
                                <p className='collection-desc'>{collection.description}</p>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}