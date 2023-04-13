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
import {useParams} from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UpdateClient extends Component {

    constructor(props) {
        super(props);
        this.state = {name: "", email: "", phone: "", birthDate: "", address: "", dialogOpen: false, isLoading: true};
        this.id = this.props.params.id;
    }

    componentDidMount() {
        this.handleClientUpdate = this.handleClientUpdate.bind(this);
        this.fillTextFields = this.fillTextFields.bind(this);
        this.fillTextFields();
        this.forceUpdate();
    }

    fillTextFields() {
        fetch('/api/clients/' + this.id)
            .then(response => response.json())
            .then(client =>
                this.setState({name: client.name, email: client.email, 
                    phone: client.telephoneNumber, birthDate: client.birthDate, address: client.address})
            )
            .then(() => this.setState({isLoading: false}));
    }

    handleClientUpdate(event) {
        const {name, email, phone, birthDate, address} = this.state
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name, email: email, 
                telephoneNumber: phone, birthDate: birthDate, address: address
            })
        };
        fetch('/api/clients/' + this.id, requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}));
    }

    render() {
        const {name, email, phone, birthDate, address, dialogOpen, isLoading} = this.state
        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <Container maxWidth={false}>
                <ClientsNavBar></ClientsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-number" label="Name" variant="outlined"
                                defaultValue={name}
                               onChange={(event)=>this.setState({name: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-number" label="Email" variant="outlined"
                               defaultValue={email}
                               onChange={(event)=>this.setState({email: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Phone" variant="outlined"
                               defaultValue={phone}
                               onChange={(event)=>this.setState({phone: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Birth Date" variant="outlined"
                               defaultValue={birthDate}
                               onChange={(event)=>this.setState({birthDate: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="outlined"
                               defaultValue={address}
                               onChange={(event)=>this.setState({address: event.target.value})}/>
                    <br/><br/>
                    <Button onClick={this.handleClientUpdate}>Update client</Button>
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
export default withParams(UpdateClient);