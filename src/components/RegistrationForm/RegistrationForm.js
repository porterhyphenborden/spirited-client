import React, { Component } from 'react'
import SpiritedApiService from '../../services/spirited-api-service'
import AuthApiService from '../../services/auth-api-service'

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            full_name: '',
            username: '',
            password: '',
        }
    }

    static defaultProps = {
      onRegistrationSuccess: () => {}
    }

    updateFullName(full_name) {
        this.setState({full_name})
    }

    updateUsername(username) {
        this.setState({username})
    }

    updatePassword(password) {
        this.setState({password})
    }

    handleSubmit = ev => {
        ev.preventDefault()
        const user = { 
            full_name: this.state.full_name, 
            username: this.state.username, 
            password: this.state.password 
        }
    
        AuthApiService.postUser(user)
            .then(user => {
                this.props.onRegistrationSuccess()
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {

        return (
            <form className='registration-form' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='full-name'>Full Name</label>
                    <input type='full-name' name='full-name' id='full-name' onChange={e => this.updateFullName(e.target.value)} />

                </div>
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input type='username' name='username' id='username' onChange={e => this.updateUsername(e.target.value)}  />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' onChange={e => this.updatePassword(e.target.value)}  />
                </div>
                <button type='submit'>Register</button>
            </form>
        )
    }
}