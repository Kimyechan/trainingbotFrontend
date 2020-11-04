import React, { Component } from 'react';
import { get, post } from 'axios';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
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

import "../css/myPage.css";

class MyPage extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            year: "2020",
            month: "10",
            exerciseList: []
        }
        this.calcCountPerExercise = this.calcCountPerExercise.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    calcCountPerExercise() {
        let data = this.state.exerciseList;
        const countMap = new Map();
        let countPerExercise = [];
        data.forEach(element => {
            if (!countMap.has(element.kind)) {
                countMap.set(element.kind, element.count);
            } else {
                countMap.set(element.kind, countMap.get(element.kind) + element.count);
            }
        });
        countMap.forEach((value, key) => {
            countPerExercise.push({ kind: key, count: value })
        });

        return countPerExercise;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        e.preventDefault();
    }

    
    handleSubmit(e) {
        let url = '/api/searchExerciseData';
        // const data = {year: this.state.year, month: this.state.month}
        let options = {
            headers: {
                "Accept": "application/json",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken'))
            },
            params: {
                year: this.state.year, 
                month: this.state.month
            }
        };

        get(url, options).then(
            response => {
                this.setState({
                    exerciseList: response.data.list
                })
            }
        )
        e.preventDefault(); // submit 이후 refresh와 repeat reload 방지
    }

    render() {
        return (
            <div>
                <h1 className="page-name">Welcome To MyPage </h1>
                <h2 className="page-explain">Check Your Exercise Data</h2>
                <h2 className="choose-date">Select Date</h2>
                <div>
                    <FormControl>
                        <InputLabel>Year</InputLabel>
                        <Select defaultValue="" name="year" onChange={this.handleChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={2019}>2019</MenuItem>
                            <MenuItem value={2020}>2020</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Month</InputLabel>
                        <Select defaultValue="" name="month" onChange={this.handleChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={11}>11</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                        </Select>
                    </FormControl>
                    <Button className="date-button" type="submit" onClick={this.handleSubmit}>
                        Search
                    </Button>
                </div>
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
                <Grid>
                    <StatisticsSuccess exerciseList={this.state.exerciseList} />
                </Grid>
            </div >
        )
    }
}

export default MyPage;