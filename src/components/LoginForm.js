import React, { Component } from 'react';
import { post } from 'axios';
import TextField from '@material-ui/core/TextField';

class LoginForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            id: '',
            pw: ''
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.login = this.login.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);

    }

    handleFormSubmit(e) {
        e.preventDefault() //이벤트 전파 취소를 통한 페이지 새로고침을 막음
        this.login()
    }

    login() {
        const url = '/api/login';
        const loginData = this.state
        const config = {
            header: {
                'content-type': 'application/json'
            }
        }
        return post(url, loginData, config);
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <TextField label="ID" type="text" name='id' value={this.state.id} onChange={this.handleValueChange}></TextField><br />
                    <TextField label="PW" type="text" name='pw' value={this.state.pw} onChange={this.handleValueChange}></TextField><br />
                    <input type="submit" value="로그인"></input>
                </form>
            </div>
        )
    }
}

export default LoginForm;