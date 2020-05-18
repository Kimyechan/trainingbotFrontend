import React, { Component } from 'react';
import initSquat from '../lib/squatModel';
import initPushUp from '../lib/pushUpModel';
import initsideLateralRaise from '../lib/sideLateralRaise';
import countOutput from '../lib/sideLateralRaise';
import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';

// class TrainingBot extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             kind: this.props.match.params.kind,
//             count: 0
//         }
//         this.init.bind(this);
//     }

//     init = () => {
//         if (this.state.kind === 'squat') {
//             return initSquat();
//         } else if (this.state.kind === 'pushUp') {
//             return initPushUp();
//         } else if (this.state.kind === 'sideLateralRaise') {
//             return initsideLateralRaise();
//         }
//     }

//     finish = () => {
//         if (this.state.kind === 'squat') {
//             return initSquat();
//         } else if (this.state.kind === 'pushUp') {
//             return initPushUp();
//         }
//     }

//     componentDidMount() {

//     }

//     render() {

//         return (
//             <div>
//                 <button type="button" onClick={this.init}>Start</button>
//                 <div><canvas id="canvas"></canvas></div>
//                 <div id="label-container"></div>
//                 {this.state.kind}
//             </div>
//         )
//     }
// }

// export default TrainingBot;


class TrainingBot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            kind: this.props.match.params.kind,
            status: "up",
            count : 0
        }

        this.initSideLateralRaise.bind(this);
    }


    initSideLateralRaise = async () => {
        const URL = "/my_model/sideLateralRaise/";
        let model, webcam, ctx, labelContainer, maxPredictions;
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        window.$model = await tmPose.load(modelURL, metadataURL);
        window.$maxPredictions = window.$model.getTotalClasses();

        // Convenience function to setup a webcam
        const size = 600;
        const flip = true; // whether to flip the webcam
        window.$webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await window.$webcam.setup(); // request access to the webcam
        await window.$webcam.play();
        window.requestAnimationFrame(this.loop);

        // append/get elements to the DOM
        const canvas = document.getElementById("canvas");
        canvas.width = size; canvas.height = size;
        window.$ctx = canvas.getContext("2d");
        window.$labelContainer = document.getElementById("label-container");
        for (let i = 0; i < window.$maxPredictions; i++) { // and class labels
            window.$labelContainer.appendChild(document.createElement("div"));
        }
    }

    loop = async () => {
        window.$webcam.update(); // update the webcam frame
        await this.predict();
        window.requestAnimationFrame(this.loop);
    }

    predict = async () => {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await window.$model.estimatePose(window.$webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await window.$model.predict(posenetOutput);
        if (prediction[0].probability.toFixed(2) == 1.00) {
            if (this.state.status === "down") {
                this.setState({
                    count : this.state.count + 1,
                })
                var audio = new Audio("/voice/" + this.state.count % 10 + ".mp3");
                audio.play();
            }
            this.setState({
                status : 'up'
            })
        } else if (prediction[1].probability.toFixed(2) == 1.00) {
            this.setState({
                status : 'down'
            })
        } else if (prediction[2].probability.toFixed(2) > 0.90) {
            if (this.state.status === "up" || this.state.status === "down") {
                var audio = new Audio("/voice/wrong.mp3");
                audio.play();
            }
            this.setState({
                status : 'wrong'
            })
        }
        for (let i = 0; i < window.$maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            window.$labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        // finally draw the poses
        this.drawPose(pose);
    }

    drawPose(pose) {
        if (window.$webcam.canvas) {
            window.$ctx.drawImage(window.$webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, window.$ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, window.$ctx);
            }
        }
    }

    render() {

        return (
            <div>
                <button type="button" onClick={this.initSideLateralRaise}>Start</button>
                <div><canvas id="canvas"></canvas></div>
                <div id="label-container"></div>
                {this.state.kind}<br></br>
                {this.state.count}
            </div>
        )
    }
}

export default TrainingBot;
