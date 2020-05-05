import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home } from 'pages';
import Exercise from '../pages/Exercise';
import Community from '../pages/Community';
import MyPage from '../pages/MyPage';
import TrainingBot from '../pages/TrainingBot'
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Top from '../components/Top';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogined: false
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
        return (
            <div>
                <Link to="/">TRAINING BOT</Link><br></br>
                {/* {accountBar} */}
                {this.state.isLogined ? (
                    <button onClick={this.handleLogout}>Logout</button>
                ) : (
                        <div>
                            <Link to="/signin">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                <ol>
                    <li><Link to="/exercise">exercise</Link></li>
                    <li><Link to="/community">community</Link></li>
                    <li><Link to="/myPage">myPage</Link></li>
                </ol>
                <Route exact path="/" component={Home} />
                <Switch>
                    <Route path="/exercise/:kind" component={TrainingBot} />
                    <Route path="/exercise" component={Exercise} />
                </Switch>
                {/* <Route path="/signin" component={Login}></Route> */}
                <Route
                    path="/signin"
                    render={props => (
                        <Login isLogined={this.state.isLogined} {...props} changeLoginState={this.changeLoginState}>
                        </Login>
                    )}
                ></Route>
                <Route path="/signup" component={SignUp} />
                <Route path="/community" component={Community} />
                <Route path="/myPage" component={MyPage} />
            </div>
        );
    }
}

export default App;