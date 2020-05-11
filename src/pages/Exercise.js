import React,{Component} from 'react';
import ExerciseForm from '../components/ExerciseForm';

class Exercise extends Component {
    constructor(props){
        super(props);

        this.state = {
            exerciseName : ['squat', 'pushUp', 'sideLateralRaise']
        }
    }
    render() {
        const exerciseForm = (name) => {
            return name.map((c) => {
                return <ExerciseForm name={c}/>
            })
        }

        return(
            <div>
                <h2>Kind Of Exercise</h2>
                {exerciseForm(this.state.exerciseName)}
            </div>
        );
    }
}

export default Exercise;