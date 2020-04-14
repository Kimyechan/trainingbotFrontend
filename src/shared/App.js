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
    render() {
        return (
            <div>
                <Link to="/">TRAINING BOT</Link><br></br>
                <Top></Top>
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