import React, { Component } from 'react';
import { get } from 'axios';

class MyPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            name: ''
        }
    }

    currentUserInfo() {
        let url = '/api/user';

        let options = {
            headers: {
                "Accept": "application/json",
                'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('accessToken'))
            }
        };

        get(url, options).then(
            response => {
                this.setState({
                    userId: response.data.data.userId,
                    name: response.data.data.name
                })
            }
        )
    }

    componentDidMount() {
        this.currentUserInfo()
    }
    render() {
        return (
            <div>
                <h2>MyPage</h2>
                <h2>
                    {this.state.userId}
                </h2>
                <h2>
                    {this.state.name}
                </h2>
            </div>
        )
    }
}

export default MyPage;