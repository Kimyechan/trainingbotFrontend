import React, { Component } from "react";
import {Link} from 'react-router-dom';

import "../css/exercise.css";

class ExerciseForm extends Component {
    
    render() {
        return (
            <div>
                <img className="img_view" src={"image/" + this.props.name + ".png"}></img>
                <Link to={"/exercisepurpose/"+this.props.name}>
                    <button type="button">Ready</button>
                </Link>
            </div>
        )
    }
}

export default ExerciseForm;