import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
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
    
    loadCurrentUser(){
        fetch("/api/currentUser", {
            headers:{
                'content-type' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('acessToken')
            },
            method: "GET"
        }).then(
            this.changeLoginState(),
            console.log(this.state.isLogined, localStorage.getItem('accessToken'))
        )
    }

    componentDidMount(){
        this.loadCurrentUser();
        // this.changeLoginState();
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
                <Link to="/">TRAINING BOT</Link><br></br>
                {accountBar}
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
                <Route path="/signin" component={Login}></Route>
                <Route path="/signup" component={SignUp} />
                <Route path="/community" component={Community} />
                <Route path="/myPage" component={MyPage} />
            </div>
        );
    }
}

export default App;