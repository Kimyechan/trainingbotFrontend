import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Top extends Component {
    render() {
        return (
            <div>
                <Link to="/signin">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        );
    }
}

export default Top;