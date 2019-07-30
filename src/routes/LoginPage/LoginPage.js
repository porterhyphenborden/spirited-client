import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import SpiritedContext from '../../SpiritedContext'

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    static contextType = SpiritedContext;

    handleLoginSuccess = () => {
        this.props.history.push('/my-cocktails')
        this.context.setIsLoggedIn()
    }

    render() {
        return (
            <section>
                <h2>Login</h2>
                <LoginForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
            </section>
        )
    }
}