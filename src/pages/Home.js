import React, { Component } from 'react';

import "../css/home.css";
class Home extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to Training AI</h1>
                <section className="slogan">
                    <img src="image/icon.png" alt="icon"></img>
                    <h2>
                        Experience AI Training For Improving Your Health <br/>
                        Using AI Training Bot Everywhere including Your Home
                    </h2>
                </section>
            </div>
        )
    }
}
export default Home;