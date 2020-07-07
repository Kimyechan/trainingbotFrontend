import React from 'react';

import { Route, Switch, Link } from 'react-router-dom';

import { Home } from 'pages';
import Exercise from '../pages/Exercise';
import Community from '../pages/Community';
import MyPage from '../pages/MyPage';
import TrainingBot from '../pages/TrainingBot'
import ExercisePurpose from '../components/ExercisePurpose';

import '../css/Content.css';

class Body extends React.Component{
    render(){
        return(
            <div id="content" className="clearfix">
                <ul>
                    <li><Link to="/exercise">exercise</Link></li>
                    <li><Link to="/community">community</Link></li>
                    <li><Link to="/myPage">myPage</Link></li>
                </ul>
                <Route exact path="/" component={Home} />
                <Switch>
                    <Route path="/exercise/:kind/:cycle/:countPerCycle" component={TrainingBot} />
                    <Route path="/exercise/:kind" component={TrainingBot} />
                    <Route path="/exercise" component={Exercise} />
                </Switch>
                <Route path="/exercisepurpose/:kind" component={ExercisePurpose} />
                <Route path="/community" component={Community} />
                <Route path="/myPage" component={MyPage} />
            </div>
        );
    }
}

export default Body;