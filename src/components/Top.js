import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogined: false
        }

        this.changeLoginState = this.changeLoginState.bind(this);
    }

    changeLoginState() {
        if (localStorage.getItem('access-token')) {
            this.setState({
                isLogined: true
            })
        } else {
            this.setState({
                isLogined: false
            })
        }
    }
    
    loadCurrentUser(){
        fetch("/api/currentUser", {
            headers:{
                'content-type' : 'application/json'
            },
            method: "GET"
        }).then(
            this.changeLoginState(),
            console.log(this.state.isLogined)
        )
    }

    componentDidMount(){
        this.loadCurrentUser();
    }
    render() {
        let accountBar;

        if (this.state.isLogined) {
            accountBar = <button>Logout</button>
        } else {
            accountBar =
                <div>
                    <Link to="/signin">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
        }
        return (
            <div>
               {accountBar}
            </div>
        );
    }
}

export default Top;