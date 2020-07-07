import React, { Component } from 'react';
import { TableRow, TextField } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { post } from 'axios';

import "../css/login.css"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

            open: true,

            open: true,

            userId: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlegoBack = this.handlegoBack.bind(this)
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handlegoBack(e) {
        this.props.history.goBack();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleLogin()
            .then(
                (response) => {
                    localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
                    this.props.changeLoginState();
                },
                this.props.history.push('/')
            )
    }

    handleLogin() {
        const url = '/api/signin';
        const signinData = this.state;
        const config = {
            header: {
                'content-type': 'application/json'
            }
        }
        return post(url, signinData, config);
    }

    render() {
        return (
        <div>
            <div className="login">
                <p>TRAINING BOT</p>
                <div className="login_table">
                    <div>
                        <TableRow>
                            <TextField type="text" label="ID" name="userId" value={this.state.userId} onChange={this.handleChange}></TextField>
                        </TableRow>
                        <TableRow>
                            <TextField type="text" label="Password" name="password" value={this.state.password} onChange={this.handleChange}></TextField>
                        </TableRow>
                    </div>
                        <button onClick={this.handleSubmit}>Login</button>
                        <button onClick={this.handlegoBack}>Close</button>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(Login);