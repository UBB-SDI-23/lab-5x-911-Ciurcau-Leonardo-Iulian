import { Container, Button, TextField } from "@mui/material";
import React, {Component} from "react";
import AppNavbar from "../appNavBar";
import App from "../app";
import { Link, useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UserLogin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, username: "", password: "", invalidCredentials: false, isLoading: true};
    }

    componentDidMount() {      
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.handleUserLogin = this.handleUserLogin.bind(this);
        this.forceUpdate();
        this.setState({isLoading: false});
    }

    getCurrentUser() {
        return this.state.parent.getCurrentUser();
    }

    handleUserLogin() {
        const {username, password} = this.state;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
        fetch(App.API_URL + '/api/auth/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.username && data.accessToken) {
                    const d = new Date();
                    d.setTime(d.getTime() + (1*24*60*60*1000));
                    let expires = "expires="+ d.toUTCString();
                    document.cookie = "currentUser=" + JSON.stringify(data) + ";" + expires + ";path=/";
                    this.setState({invalidCredentials: false});
                    document.location.href = '/';
                }
                else {
                    this.setState({invalidCredentials: true});
                }
            });
    }

    render() {
        const {username, password, invalidCredentials, isLoading} = this.state;
        if (isLoading)
            return <p>Loading...</p>;

        return (
            <Container maxWidth={false}>
                <AppNavbar parent={this}/>
                <br/><br/>
                <Container maxWidth={false} className="userLogin" sx={{width: 300}}>
                    {invalidCredentials ? <p style={{color: 'red'}}>Invalid credentials</p> : <Container><br/><br/></Container>}
                    <TextField id="outlined-basic" label="Username" variant="outlined"
                    defaultValue={username}
                    onChange={(event)=>this.setState({invalidCredentials: false, username: event.target.value})} />
                    <br/><br/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" type="password"
                    defaultValue={password}
                    onChange={(event)=>this.setState({invalidCredentials: false, password: event.target.value})} />
                    <br/><br/>
                    <Button disabled={username === '' || password === ''} onClick={this.handleUserLogin}>Login</Button>
                    <br/><br/>
                    <p>Don't have an account?</p>
                    <Button component={Link} to='/register'>Register</Button>
                </Container>
            </Container>
        );
    }
}

export default withParams(UserLogin);