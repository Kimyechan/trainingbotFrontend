import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { TableRow, TextField } from '@material-ui/core';

class ExercisePurpose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cycle : "",
            countPerCycle : "",
            name : this.props.match.params.kind
        }
    }

    handleChange = (e) => {
        let nextState = {}
        nextState[e.target.name] = e.target.value
        this.setState(nextState)
        console.log(this.state)
    }

    render() {
        return (
            <div>
                {this.props.match.params.kind}
                <TableRow>
                    <TextField type="text" label="cycle" name="cycle" value={this.state.cycle} onChange={this.handleChange}></TextField>
                </TableRow>
                <TableRow>
                    <TextField type="text" label="countPerCycle" name="countPerCycle" value={this.state.countPerCycle} onChange={this.handleChange}></TextField>
                </TableRow>
                <Link to={"/exercise/"+this.props.match.params.kind}>
                    <button type="button">purposeSet</button>
                </Link>
            </div>
        )
    }
}

export default ExercisePurpose;