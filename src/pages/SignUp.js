import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from '@material-ui/core';
import { post } from 'axios';
import { withRouter } from "react-router-dom";

import Button from '@material-ui/core/Button';

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: true,
            userId: '',
            password: '',
            name: '',
            phoneNumber: ''
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.addAccount().then(
            this.props.history.push("/")
        );
    }

    addAccount() {
        const url = '/api/signup';
        const signUpData = this.state;
        const config = {
            header: {
                'content-type': 'application/json'
            }
        }
        return post(url, signUpData, config);
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClose(e) {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div>

                <TableRow>
                    <TextField type="text" label="ID" name="userId" value={this.state.userId} onChange={this.handleValueChange}></TextField>
                </TableRow>
                <TableRow>
                    <TextField type="text" label="PassWord" name="password" value={this.state.password} onChange={this.handleValueChange}></TextField>
                </TableRow>
                <TableRow>
                    <TextField type="text" label="Name" name="name" value={this.state.name} onChange={this.handleValueChange}></TextField>
                </TableRow>
                <TableRow>
                    <TextField type="text" label="PhoneNumber" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleValueChange}></TextField>
                </TableRow>
                <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>Sign Up</Button>
                <Button variant="outlined" color="primary" onClick={this.handleClose}>Close</Button>

            </div>
        )
    }
}

export default withRouter(SignUp);