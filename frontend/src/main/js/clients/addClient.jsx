import React, { Component } from 'react';
import ClientsNavBar from './clientsNavBar';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import App from "../app";

class AddClient extends Component {

    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, 
            name: "", email: "", phone: "", birthDate: "", address: "", dialogOpen: false, isLoading: true};
    }

    componentDidMount() {
        this.handleClientAdd = this.handleClientAdd.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.setState({isLoading: false});
        this.forceUpdate();
    }

    handleClientAdd(event) {
        const {name, email, phone, birthDate, address} = this.state;
        new Promise((resolve, reject) => resolve(this.getCurrentUser().getId()))
            .then(id => { return {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name, email: email, 
                    telephoneNumber: phone, birthDate: birthDate, address: address,
                    user: {id: id, isEnabled: true}
                })
            }})
            .then(
                requestOptions => 
                fetch(App.API_URL + '/api/clients', requestOptions)
                    .then(response => response.json())
                    .then(() => this.setState({dialogOpen: true}))
            );
    }

    getCurrentUser() {
        return this.state.parent.getCurrentUser();
    }

    render() {
        const {dialogOpen, email, isLoading} = this.state
        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <Container maxWidth={false}>
                <ClientsNavBar parent={this}></ClientsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-number" label="Name" variant="outlined"
                               onChange={(event)=>this.setState({name: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-number" label="Email" variant="outlined" 
                                error={email === ''} helperText={email === '' ? "Email is mandatory" : ''}
                                onChange={(event)=>this.setState({email: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Phone" variant="outlined"
                               onChange={(event)=>this.setState({phone: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Birth Date" variant="outlined"
                               onChange={(event)=>this.setState({birthDate: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="outlined"
                               onChange={(event)=>this.setState({address: event.target.value})}/>
                    <br/><br/>
                    <Button disabled={email === ''} onClick={this.handleClientAdd}>Add client</Button>
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
                            Item was added successfully!
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
export default AddClient;