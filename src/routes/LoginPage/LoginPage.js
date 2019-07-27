import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    handleLoginSuccess = () => {
        this.props.history.push('/my-cocktails')
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