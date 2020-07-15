import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import TableRow from '@material-ui/core/TableRow';

class ExercisePurpose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: 'true',
            cycle: "",
            countPerCycle: "",
            name: this.props.match.params.kind,
            checked : 'false'
        }
    }

    handleChange = (e) => {
        let nextState = {}
        nextState[e.target.name] = e.target.value
        this.setState(nextState)
        console.log(this.state)
    }

    handlegoBack = (e) => {
        this.props.history.goBack();
    }

    onChange = (e) => {
        const check = /[0-9]/;
        console.log(check.test(this.state.cycle));
        console.log(this.state.cycle);
        
        if ((this.state.cycle !== '' && check.test(this.state.cycle)) && (this.state.countPerCycle !== '' && check.test(this.state.countPerCycle))) {
            this.state.checked = true;
        }
        else{
            alert('숫자를 입력해주세요');
            // this.setState({
            //     cycle: "",
            //     countPerCycle: ""
            // })
            // this.props.history.push("/exercisepurpose/"+this.state.name)
            return this.props.history.go(-1);
        }
    }

    handlegoBack = (e) => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>{this.props.match.params.kind}</DialogTitle>
                    <DialogContent>
                        <TableRow>
                            <TextField type="text" label="Cycle" name="cycle" value={this.state.cycle} onChange={this.handleChange}></TextField>
                        </TableRow>
                        <TableRow>
                            <TextField type="text" label="CountPerCycle" name="countPerCycle" value={this.state.countPerCycle} onChange={this.handleChange}></TextField>
                        </TableRow>
                        <DialogActions>
                            <Link to={"/exercise/" + this.props.match.params.kind + "/" + this.state.cycle + "/" + this.state.countPerCycle}>
                                <button type="button" onClick={this.onChange}>PurposeSet</button>
                            </Link>
                            <button type="button" onClick={this.handlegoBack}>Close</button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default ExercisePurpose;