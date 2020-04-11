import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from '@material-ui/core';
import { post } from 'axios';
import { withRouter } from "react-router-dom";

class SignUp extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            userId : '',
            password : '',
            name : '',
            phoneNumber : ''
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleFormSubmit(e){
        e.preventDefault();
        this.addAccount().then(
            this.props.history.push("/")
        );
    }
    addAccount(){
        const url = '/api/signup';
        const signUpData = this.state;
        const config = {
            header : {
                'content-type' : 'application/json'
            }
        }
        return post(url, signUpData, config);
    }

    handleValueChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleFormSubmit}>
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
                <TableRow>
                    <input type="submit" value="등록"/>
                </TableRow> 
            </form>
            </div>
        )
    }
}

export default withRouter(SignUp);