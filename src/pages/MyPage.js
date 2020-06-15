import React, { Component } from 'react';
import { get } from 'axios';

class MyPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exerciseList: []
        }
    }

    currentUserInfo() {
        let url = '/api/searchExerciseData';

        let options = {
            headers: {
                "Accept": "application/json",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken'))
            }
        };

        get(url, options).then(
            response => {
                this.setState({
                    exerciseList: response.data.list 
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
                {this.state.exerciseList.map((exercise) => 
                    <div>
                        <h3>
                            Date : {exercise.date}
                        </h3>
                        <h3>
                            Kind : {exercise.kind}
                        </h3>
                        <h3>
                            PurposeCount : {exercise.purposeCount}
                        </h3>
                        <h3>
                            Count : {exercise.count}
                        </h3>
                        <br></br>
                    </div>
                )}
            </div>
        )
    }
}

export default MyPage;