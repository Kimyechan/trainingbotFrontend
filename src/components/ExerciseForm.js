import React, { Component } from "react";
import {Link} from 'react-router-dom';

class ExerciseForm extends Component {
    
    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <img src={"image/" + this.props.name + ".png"} alt={this.props.name} style={{ width: 256, height: 256 }}></img>
                <Link to={"/exercisepurpose/"+this.props.name}>
                    <button type="button">ready</button>
                </Link>

            </div>
        )
    }
}

export default ExerciseForm;