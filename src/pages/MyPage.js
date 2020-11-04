import React, { Component } from 'react';
import { get } from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import {
    Chart,
    PieSeries,
    Title,
    Legend,
    BarSeries,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
import StatisticsSuccess from '../components/StatisticsSuccess';

class MyPage extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            exerciseList: []
        }
        this.calcCountPerExercise = this.calcCountPerExercise.bind(this);
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

    // calcCountPerExercise() {
    //     let data = this.state.exerciseList
    //     let countPerExercise = []
    //     // let exercise = {}
    //     let pushUpCount = 0;
    //     let squatCount = 0;
    //     data.forEach(element => {
    //         if(element.kind == 'Squat') {
    //            squatCount += element.count;
    //         } else if(element.kind == 'pushUp') {
    //            pushUpCount += element.count;
    //         }
    //     });
    //     countPerExercise.push({kind: 'Squat', count: squatCount})
    //     countPerExercise.push({kind: 'pushUp', count: pushUpCount})

    //     return countPerExercise;
    // }

    calcCountPerExercise() {
        let data = this.state.exerciseList;
        const countMap = new Map();
        let countPerExercise = [];
        data.forEach(element => {
            if(!countMap.has(element.kind)) {
                countMap.set(element.kind, element.count);
            } else {
                countMap.set(element.kind, countMap.get(element.kind) + element.count);
            }
        });
        console.log(countMap)
        countMap.forEach((value, key) => {
            countPerExercise.push({kind: key, count: value})
        });
        
        return countPerExercise;
    }

    componentDidMount() {
        this.currentUserInfo()
    }

    render() {
        return (
            <div>
                <h2>MyPage</h2>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={10}
                >
                    <Grid item xs={6}>
                        <Paper>
                            <Chart
                                data={this.calcCountPerExercise()}
                            >
                                <PieSeries
                                    valueField="count"
                                    argumentField="kind"
                                />
                                <Title
                                    text="Each Exercise Rate"
                                />
                                <Animation />
                                <Legend />
                            </Chart>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <Chart
                                data={this.calcCountPerExercise()}
                            >
                                <ArgumentAxis />
                                <ValueAxis />
                                <BarSeries
                                    valueField="count"
                                    argumentField="kind"
                                />
                                <Title text="Count of each exercise" />
                                <Animation />
                            </Chart>
                        </Paper>
                    </Grid>
                </Grid>
                <StatisticsSuccess exerciseList={this.state.exerciseList}/>
            </div >
        )
    }
}

export default MyPage;

// import * as React from 'react';
// import Paper from '@material-ui/core/Paper';
// import {
//   Chart,
//   PieSeries,
//   Title,
// } from '@devexpress/dx-react-chart-material-ui';

// import { Animation } from '@devexpress/dx-react-chart';

// const data = [
//   { country: 'Russia', area: 12 },
//   { country: 'Canada', area: 7 },
//   { country: 'USA', area: 7 },
//   { country: 'China', area: 7 },
//   { country: 'Brazil', area: 6 },
//   { country: 'Australia', area: 5 },
//   { country: 'India', area: 2 },
//   { country: 'Others', area: 55 },
// ];
// export default class MyPage extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data,
//     };
//   }

//   render() {
//     const { data: chartData } = this.state;

//     return (
//       <Paper>
//         <Chart
//           data={chartData}
//         >
//           <PieSeries
//             valueField="area"
//             argumentField="country"
//           />
//           <Title
//             text="Area of Countries"
//           />
//           <Animation />
//         </Chart>
//       </Paper>
//     );
//   }
// }