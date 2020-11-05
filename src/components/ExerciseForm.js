import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Block } from "@material-ui/icons";

// import "../css/exercise.css";

const styles = {
    root: {
        maxWidth: 500,
    },
    media: {
        height: 300,
        width: 500,
    },
    content: {
        width: 450
    }
};

class ExerciseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseContent : ""
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={7}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={"image/" + this.props.name + ".png"}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {this.props.name}
                                        </Typography>
                                        <Typography className={classes.content}variant="body2" color="textSecondary" component="p" align="left">
                                            {this.props.content}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions style={{justifyContent: 'center'}}>
                                    <Link to={"/exercisepurpose/" + this.props.name}>
                                        <Button size="medium" variant="outlined" color="primary">Ready</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(ExerciseForm);