import React, { Component } from 'react';
import ExerciseForm from '../components/ExerciseForm'

import "../css/exercise.css";

class Exercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseName : 'Squat'
        }
    }

    handleExerciseName = (e) => {
        console.log(e.target.value)
        this.setState({
            exerciseName:e.target.value
        })
    }


    render() {

        return (
            <div>
                <div className="exercise_nav">
                    <div className="exercise_innerNav">
                        <button className="exercise_innerbutton" value="Squat" onClick={this.handleExerciseName}>Squat</button>
                        <button className="exercise_innerbutton" value="PushUp" onClick={this.handleExerciseName}>PushUp</button>
                        <button className="exercise_innerbutton" value="sideLateralRaise" onClick={this.handleExerciseName}>SideLateral</button>
                        <button className="exercise_innerbutton" value="A" onClick={this.handleExerciseName}>A</button>
                        <button className="exercise_innerbutton" value="B" onClick={this.handleExerciseName}>B</button>
                    </div>
                </div>

                <div className="exercise_view">
                    <p>{this.state.exerciseName}</p>
                    <ExerciseForm name={this.state.exerciseName}></ExerciseForm>
                </div>
            </div>
        );
    }
}

export default Exercise;