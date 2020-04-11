import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import SignUp from './SignUp';

class SignUpForm extends Component {
    render() {
        return (
            <div>
                <Link to="/signUp">signUP</Link>
                <Switch>
                    <Route path="/signUp" component={SignUp} />
                </Switch>

            </div>
        )
    }
}
export default SignUpForm;