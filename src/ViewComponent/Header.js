import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import SignUp from '../pages/SignUp';
import Login from '../pages/Login';

import '../css/Header.css';


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogined: false,
            open: true
        }

        this.changeLoginState = this.changeLoginState.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    changeLoginState() {
        if (localStorage.getItem('accessToken')) {
            this.setState({
                isLogined: true
            })
        } else {
            this.setState({
                isLogined: false
            })
        }
    }

    handleLogout() {
        localStorage.removeItem('accessToken')
        this.setState({
            isLogined: false
        })
    }

    componentDidMount() {
        this.changeLoginState();
    }

    render() {

        const styles_pknu = {
            color: 'black',
            fontSize: '50px',
            textAlign: 'center',
            float: 'left',
            width: '500px',
            height: '100px',
            textDecoration: 'none'
          }

        return (
            <div>
                <div className="header">
                    <img alt="not_photo" width='150px' height='100px' align='left' />
                    <a style={styles_pknu} href="/">TrainingBot</a>

                    <div>
                    
                {/* {accountBar} */}
                {this.state.isLogined ? (
                    <button onClick={this.handleLogout}>Logout</button>
                ) : (
                        <div>
                            <Link to="/signin">Login</Link><br></br>
                            <Link to="/signup">SignUp</Link>
                        </div>
                    )}
                
                {/* <Route path="/signin" component={Login}></Route> */}
                <Route
                    path="/signin"
                    render={props => (
                        <Login isLogined={this.state.isLogined} {...props} changeLoginState={this.changeLoginState}>
                        </Login>
                    )}
                ></Route>
                
                <Route path="/signup" component={SignUp} />
                
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;