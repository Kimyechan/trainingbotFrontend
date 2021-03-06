import React, { Component } from 'react';
import initSquat from '../lib/squatModel';
import initPushUp from '../lib/pushUpModel';
import initsideLateralRaise from '../lib/sideLateralRaise';
import countOutput from '../lib/sideLateralRaise';
import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';
import { post } from 'axios';
import { Button, Paper, Grid, TableRow, TextField, Typography } from '@material-ui/core';

import Exercise from './Exercise';

// import "../css/exercise.css";

class TrainingBot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            kind: this.props.match.params.kind,
            status: "up",
            sec: 30,
            countCycle: 0, //cycle 횟수 세기
            count: 0, //count 세기
            cycle: this.props.match.params.cycle, //목표 설정한 cycle 횟수
            countPerCycle: this.props.match.params.countPerCycle, // 목표 설정한 count 횟수
            completed: 0, //rest sec를 나타내기 위한 운동 완료 횟수
            oldDate: 0,
            nowDate: 0
        }


        this.initExercise.bind(this);
    }

    init = () => {
        var refreshIntervalId = setTimeout(
            () => {
                clearInterval(refreshIntervalId)
                this.initExercise()
            }, 10000);
    }

    initExercise = async () => {
        // const URL = "/my_model/sideLateralRaise/";
        const URL = "/my_model/" + this.state.kind + "/";
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

        if (prediction[0].probability.toFixed(2) == 1.00) { //down
            if (this.state.status == 'up') {
                var time = new Date().getTime();
                this.setState({
                    nowDate: time
                })
                var gap = (this.state.nowDate - this.state.oldDate) / 1000;
                console.log(this.state.gap)
                //up 에서 down으로 동작 변화시간이 1초 이내일 경우 천천히 동작하기를 알림
                if (gap < 1) {
                    this.setState({
                        count: this.state.count - 1,
                        completed: this.state.completed - 1
                    })
                    var audio = new Audio("/voice/timeGap.mp3");
                    audio.play();
                    window.$webcam.pause();
                    setTimeout(() => {
                        window.$webcam.play()
                    }, 3000)
                }
            }

            this.setState({
                status: 'down'
            })

        } else if (prediction[1].probability.toFixed(2) == 1.00) { //up
            if (this.state.status === "down") {
                var time = new Date().getTime();
                this.setState({
                    count: this.state.count + 1,
                    completed: this.state.completed + 1,
                    oldDate: time
                })

                var audio = new Audio("/voice/" + this.state.count % 10 + ".mp3");
                audio.play();

            }

            //cycle 당 count 목표 달성시 30초 휴식
            if (this.state.count == this.state.countPerCycle) {
                window.$webcam.pause();
                this.setState({
                    count: 0,
                    countCycle: this.state.countCycle + 1
                })

                if (this.state.cycle == this.state.countCycle) {
                    setTimeout(() => {
                        var audio = new Audio("/voice/finish.mp3");
                        audio.play();
                        window.$webcam.pause();
                    }, 2000);
                } else {

                    var refreshVar = setInterval(() => {
                        if (this.state.sec == 0) {
                            clearInterval(refreshVar)
                            this.setState({
                                sec: 30
                            })
                        } else {
                            this.setState({
                                sec: this.state.sec - 1
                            })
                        }
                    }, 1000)

                    setTimeout(() => {
                        var audio = new Audio("/voice/rest.mp3");
                        audio.play();
                    }, 1000);

                    var refreshIntervalId = setTimeout(() => {
                        window.$webcam.play()
                        this.setState({
                            completed: 0
                        })
                        clearTimeout(refreshIntervalId);
                    }, 30000);
                }
            }

            this.setState({
                status: 'up'
            })

        } else if (prediction[2].probability.toFixed(2) > 0.90) {
            if (this.state.status === "up" || this.state.status === "down") {
                var audio = new Audio("/voice/wrong.mp3");
                audio.play();
                window.$webcam.pause();
                setTimeout(() => {
                    window.$webcam.play()
                }, 3000)
            }
            this.setState({
                status: 'wrong'
            })
        }
        // else if(prediction[3].probability.toFixed(2) > 0.90){
        //     this.setState({
        //         status: 'nothing'
        //     })
        // }

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

    finish = () => {
        console.log(window.$webcam)
        const url = "/api/saveExercise"
        const data = {
            kind: this.state.kind,
            count: this.state.countCycle * this.state.countPerCycle + this.state.count,
            purposeCount: this.state.cycle * this.state.countPerCycle
        }

        const config = {
            headers: {
                "Accept": "application/json",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken'))
            }
        };
        if (window.$webcam != undefined) {
            if (!localStorage.getItem('accessToken')) {
                window.$webcam.stop();
                this.props.history.push('/')
                window.location.reload();
            } else {
                window.$webcam.stop();
                post(url, data, config)
                window.location.reload()
                this.props.history.push('/')
            }
        } else {
            this.props.history.push('/')
            window.location.reload();
        }
    }

    render() {

        return (
            // <div style={{ width: '1000px', height: '800px', margin: 'auto auto' }}>
            <div>
                <div className="exercise_head">
                    {/* <img style={{ width: '150px', height: '100px' }} src={"/image/" + this.state.kind + ".png"X}></img> */}
                    <Typography variant='h2' color="primary">
                        {this.state.kind}
                    </Typography>
                </div>
                {/* <div className="doexercise_view"> */}

                {/* <h2>Start 버튼을 누른뒤 10초 뒤에 시작합니다.</h2>
                        {this.state.completed == this.state.countPerCycle && this.state.cycle != this.state.countCycle ?
                            <h2>{this.state.sec}초 휴식!!</h2> : ""
                        }
                        <div><canvas id="canvas"></canvas></div>
                        <div id="label-container"></div>
                        <h2>CountCycle : {this.state.countCycle} / {this.props.match.params.cycle}</h2>
                        <h2>Count : {this.state.count} / {this.props.match.params.countPerCycle}</h2>
                        <h2>TotalCount : {this.state.countCycle * this.state.countPerCycle + this.state.count}</h2>
                        <button type="button" onClick={this.init}>Start</button>
                        <button type="button" onClick={this.finish}>Finish</button> */}
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={5}
                >
                    <Grid item xs={6}>
                        <Paper>
                            <Typography variant='h4' color="primary" align="center">
                                Right Post
                            </Typography>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={5}>
                                <Grid container item justify="center" alignItems="center" xs={4}>
                                    <Typography variant='h5' color="primary" align="center">UP Post</Typography>
                                    <img src={"/image/" + this.state.kind + "/Up.png"} alt="up"></img>
                                </Grid>
                                <Grid container justify="center" alignItems="center" item xs={4}>
                                    <Typography variant='h5' color="primary" align="center">DOWN Post</Typography>
                                    <img src={"/image/" + this.state.kind + "/Down.png"} alt="down"></img>
                                </Grid>
                            </Grid>
                            <Typography variant="h5" color="textPrimary" align="center">
                                If You exercise similar to pose image, you success exercising <br />
                                If not, AI never count your exercise
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <div><canvas id="canvas"></canvas></div>
                            <div id="label-container"></div>
                        </Paper>
                        <Paper>
                            <h2>CountCycle : {this.state.countCycle} / {this.props.match.params.cycle}</h2>
                            <h2>Count : {this.state.count} / {this.props.match.params.countPerCycle}</h2>
                            <h2>TotalCount : {this.state.countCycle * this.state.countPerCycle + this.state.count}</h2>
                            <h2>Start 버튼을 누른뒤 10초 뒤에 시작합니다.</h2>
                            {this.state.completed == this.state.countPerCycle && this.state.cycle != this.state.countCycle ?
                                <h2>{this.state.sec}초 휴식!!</h2> : ""
                            }
                            <Button size="large" variant="outlined" color="primary" onClick={this.init}>Start</Button>
                            <Button size="large" variant="outlined" color="primary" onClick={this.finish}>Finish</Button>
                        </Paper>
                    </Grid>
                </Grid>
                {/* </div> */}

            </div >
        )
    }
}

export default TrainingBot;
