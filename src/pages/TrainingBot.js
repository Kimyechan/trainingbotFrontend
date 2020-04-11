import React, { Component } from 'react';
import initSquat from '../lib/squatModel';
import initPushUp from '../lib/pushUpModel';

class TrainingBot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            kind: this.props.match.params.kind
        }
        this.init.bind(this);
    }
    init = () => {
        if(this.state.kind === 'squat'){
            return initSquat();
        } else if(this.state.kind === 'pushUp'){
            return initPushUp();
        }
    }
    render() {
        
        return (
            <div>
                <button type="button" onClick={this.init}>Start</button>
                <div><canvas id="canvas"></canvas></div>
                <div id="label-container"></div>
                {this.state.kind}
            </div>
        )
    }
}

export default TrainingBot;