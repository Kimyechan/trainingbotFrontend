import React, { Component } from 'react';
import ExerciseForm from '../components/ExerciseForm'

import Button from '@material-ui/core/Button';

import "../css/exercise.css";

class Exercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseName : 'Squat',
            exerciseContent : "to position yourself close to the ground balancing on the front part of your feet with your legs bent under your body"
        }
    }

    handleExercise = (e) => {
        const squat = "to position yourself close to the ground balancing on the front part of your feet with your legs bent under your body";
        const lunge = "an exercise in which a person in a standing position steps forward into a position in which the front knee is deeply bent while keeping the torso erect and then returns back to the starting position"
        const pushUp = "an exercise in which a person, keeping a prone position with the hands palms down under the shoulders, the balls of the feet on the ground, and the back straight, pushes the body up and lets it down by an alternate straightening and bending of the arms."
        const sideLateralRaise = "A shoulder exercise in which the arm is raised and lowered against resistance – such as through use of a dumbbell, cable, or resistance band –, isolating the deltoids."
        
        let content = "";
        if(e.currentTarget.value == "Squat") {
            content = squat;
        } else if(e.currentTarget.value == "PushUp") {
            content = pushUp;
        } else if(e.currentTarget.value == "sideLateralRaise"){
            content = sideLateralRaise;
        } else if(e.currentTarget.value == "lunge"){
            content = lunge;
        }

        this.setState({
            exerciseContent : content,
            exerciseName: e.currentTarget.value // e.target -> e.currentTarget button value를 가지고 오지 않는 문제 해결
        })

    }

    render() {
        return (
            <div>
                <div className="exercise_nav">
                    <div className="exercise_innerNav">
                        {/* <button className="exercise_innerbutton" value="Squat" onClick={this.handleExerciseName}>Squat</button>
                        <button className="exercise_innerbutton" value="PushUp" onClick={this.handleExerciseName}>PushUp</button>
                        <button className="exercise_innerbutton" value="sideLateralRaise" onClick={this.handleExerciseName}>SideLateral</button>
                        <button className="exercise_innerbutton" value="lunge" onClick={this.handleExerciseName}>Lunge</button> */}
                        <Button size="large" variant="outlined" color="primary" className="exercise_innerbutton" value="Squat" onClick={this.handleExercise}>Squat</Button>
                        <Button size="large" variant="outlined" color="primary" className="exercise_innerbutton" value="PushUp" onClick={this.handleExercise}>PushUp</Button>
                        <Button size="large" variant="outlined" color="primary" className="exercise_innerbutton" value="sideLateralRaise" onClick={this.handleExercise}>SideLateral</Button>
                        <Button size="large" variant="outlined" color="primary" className="exercise_innerbutton" value="lunge" onClick={this.handleExercise}>Lunge</Button>
                    </div>
                </div>

                <div className="exercise_view">
                    <ExerciseForm name={this.state.exerciseName} content={this.state.exerciseContent}></ExerciseForm>
                </div>
            </div>
        );
    }
}

export default Exercise;