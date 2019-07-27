import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
//import SpiritedApiService from '../../services/spirited-api-service'

export default class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => {}
    }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        const { username, password } = ev.target
        
        AuthApiService.postLogin({
            username: username.value,
            password: password.value,
        })
            .then(res => {
                username.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
            })
            .catch(error => {
                console.error({ error })
            })
      }

    render() {
        return (
            <form className='login-form' onSubmit={this.handleSubmitJwtAuth} >
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input type='username' name='username' id='username' />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' />
                </div>
                <button type='submit'>Login</button>
            </form>
        )
    }
}