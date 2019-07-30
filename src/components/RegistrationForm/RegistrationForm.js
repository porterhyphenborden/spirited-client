import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import './RegistrationForm.css'

export default class RegistrationForm extends Component {
    state = { error: null }

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
        const { fullname, username, password } = ev.target

        this.setState({ error: null })
        AuthApiService.postUser({
            username: username.value,
            password: password.value,
            full_name: fullname.value,
          })
            .then(user => {
                fullname.value = ''
                username.value = ''
                password.value = ''
                this.props.onRegistrationSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form className='registration-form' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='full-name'>Full Name</label>
                    <input type='full-name' name='full-name' id='fullname' onChange={e => this.updateFullName(e.target.value)} />
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
                <div role='alert'>
                    {error && <div className='error'>{error}</div>}
                </div>
            </form>
        )
    }
}