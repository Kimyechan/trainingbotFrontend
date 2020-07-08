import React, { Component } from 'react';
import { Route, Switch, Link as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link'
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Home } from 'pages';
import Exercise from '../pages/Exercise';
import Community from '../pages/Community';
import MyPage from '../pages/MyPage';
import TrainingBot from '../pages/TrainingBot'
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';

import ExercisePurpose from '../components/ExercisePurpose';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogined: false,
            toggle: false
        }

        this.changeLoginState = this.changeLoginState.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    changeLoginState() {
        if (localStorage.getItem('accessToken')) {
            this.setState({
                isLogined: true
            })
        } else {
            this.setState({
                isLogined: false
            })
        }
    }

    handleLogout() {
        localStorage.removeItem('accessToken')
        this.setState({
            isLogined: false
        })
    }

    handleDrawerToggle = () => {
        this.setState(
            { toggle: !this.state.toggle }
        )
    }
    componentDidMount() {
        this.changeLoginState();
    }

    render() {
        const classes = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="sticky">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.handleDrawerToggle}>
                            <MenuIcon/>
                        </IconButton>
                        <IconButton color="inherit" component={RouterLink} to="/">TRAINING BOT</IconButton>
                        <div>
                        {this.state.isLogined ? (
                            <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                        ) : (
                                <div>
                                    <Button color="inherit" component={RouterLink} to="/signin" exact={true}>Login</Button>
                                    <Button color="inherit" component={RouterLink} to="/signup">Signup</Button>
                                </div>
                            )
                        }
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.toggle}>
                    <MenuItem onClick={this.handleDrawerToggle}><Button color="inherit" component={RouterLink} to="/">Home</Button></MenuItem>
                    <MenuItem onClick={this.handleDrawerToggle}><Button color="inherit" component={RouterLink} to="/exercise">Exercise</Button></MenuItem>
                    <MenuItem onClick={this.handleDrawerToggle}><Button color="inherit" component={RouterLink} to="/myPage">MyPage</Button></MenuItem>
                </Drawer>
                
                <Route exact path="/" component={Home} />
                <Switch>
                    <Route path="/exercise/:kind/:cycle/:countPerCycle" component={TrainingBot} />
                    <Route path="/exercise/:kind" component={TrainingBot} />
                    <Route path="/exercise" component={Exercise} />
                </Switch>
                <Route
                    path="/signin"
                    render={props => (
                        <Login isLogined={this.state.isLogined} {...props} changeLoginState={this.changeLoginState}>
                        </Login>
                    )}
                ></Route>
                <Route path="/exercisepurpose/:kind" component={ExercisePurpose} />
                <Route path="/signup" component={SignUp} />
                <Route path="/community" component={Community} />
                <Route path="/myPage" component={MyPage} />
            </div>
        );
    }
}

export default withStyles(styles)(App);