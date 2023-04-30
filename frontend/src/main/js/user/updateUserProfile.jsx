import React, {Component} from 'react';
import { useParams } from 'react-router-dom';
import AppNavBar from '../appNavBar';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import App from "../app";

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

class UpdateUserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, username: this.props.params.username, 
            firstName: null,
            lastName: null,
            address: null,
            telephoneNumber: null,
            birthDate: null,
            dialogOpen: false,
            isLoading: true};
    }

    componentDidMount() {
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.fillTextFields = this.fillTextFields.bind(this);
        this.handleUserProfileUpdate = this.handleUserProfileUpdate.bind(this);
        this.fillTextFields();
        this.forceUpdate();
    }

    fillTextFields() {
        fetch(App.API_URL + '/api/user/profile/' + this.state.username)
            .then(response => response.json())
            .then(profile =>{
                this.setState({ firstName: profile.firstName,
                    lastName: profile.lastName,
                    address: profile.address,
                    telephoneNumber: profile.telephoneNumber,
                    birthDate: profile.birthDate
                }, this.setState({isLoading: false}));});
    }

    handleUserProfileUpdate() {
        const {username, firstName, lastName, address, telephoneNumber, birthDate} = this.state;
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName: firstName, lastName: lastName, address: address, telephoneNumber: telephoneNumber, 
                birthDate: birthDate
            })
        };

        fetch(App.API_URL + '/api/user/profile/' + username, requestOptions)
            .then(response => response.json())
            .then(this.setState({dialogOpen: true}));
    }

    getCurrentUser() {
        return this.state.parent.getCurrentUser();
    }

    render() {
        const {username, firstName, lastName, address, telephoneNumber, birthDate, dialogOpen, isLoading} = this.state;

        if (isLoading) 
            return <p>Loading...</p>;

        return (
            <Container maxWidth={false}>
                <AppNavBar parent={this}/>
                <br/><br/><br/><br/>
                <Container>
                    <TextField id="outlined-basic" label="Username" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={username}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="First name" variant="outlined" defaultValue={firstName}
                               onChange={(event)=>this.setState({firstName: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Last name" variant="outlined" defaultValue={lastName}
                               onChange={(event)=>this.setState({lastName: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="outlined" defaultValue={address}
                               onChange={(event)=>this.setState({address: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Phone" variant="outlined" defaultValue={telephoneNumber}
                               onChange={(event)=>this.setState({telephoneNumber: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Birth Date" variant="outlined" defaultValue={birthDate}
                               onChange={(event)=>this.setState({birthDate: event.target.value})}/>
                    <br/><br/>
                    <Button disabled={!firstName || !lastName} 
                        onClick={this.handleUserProfileUpdate}>Update profile</Button>
                </Container>
                <Dialog
                    open={dialogOpen}
                    onClose={() => {this.setState({dialogOpen: false});}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Item updated"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Item was updated successfully!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.setState({dialogOpen: false});}}>OK</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
    }
}

export default withParams(UpdateUserProfile);