import React, { Component } from 'react';
import SpiritedApiService from '../../services/spirited-api-service';
import CocktailList from '../../components/CocktailList/CocktailList'
import './CollectionPage.css'

export default class UserLandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            collection: {},
            cocktails: [],
        }
    }

    static defaultProps = {
        match: { params: {} },
    }

    componentDidMount() {
        const { collectionId } = this.props.match.params;
        SpiritedApiService.getCollectionById(collectionId)
            .then((collection) => {
                this.setState({collection})
            })
            .catch(error => {
                console.error({ error })
            })
        SpiritedApiService.getCocktailsForCollection(collectionId)
            .then((cocktails) => {
                this.setState({cocktails})
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const collection = this.state.collection
        const cocktails = this.state.cocktails
        const error = this.state.error
        return (
            <div className='collection-cocktails'>
                <div role='alert'>
                    {error && <div className='error'>{error}</div>}
                </div>
                <div className='collection-header'>
                    <img src={collection.image_src} className='collection-icon' alt={collection.name}/>
                    <h2>{collection.name}</h2>
                </div>
                <p>{collection.description}</p>
                <CocktailList 
                    cocktails={cocktails}
                />
            </div>
            
        )
    }
}