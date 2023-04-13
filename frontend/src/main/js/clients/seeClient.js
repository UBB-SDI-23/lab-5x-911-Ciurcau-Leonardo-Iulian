import React, { Component } from 'react';
import ClientsNavBar from './clientsNavBar';
import {
    Container,
    TextField
} from "@mui/material";
import {useParams} from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class SeeClient extends Component {

    constructor(props) {
        super(props);
        this.state = {name: "", email: "", phone: "", birthDate: "", address: "", isLoading: true};
        this.id = this.props.params.id
        this.fillTextFields();
    }

    componentDidMount() {
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

    render() {
        const {name, email, phone, birthDate, address, isLoading} = this.state
        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <Container maxWidth={false}>
                <ClientsNavBar></ClientsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-basic" label="Name" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={name}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Email" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={email}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Phone" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={phone}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Birth Date" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={birthDate}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={address}/>
                </Container>
            </Container>
        );
    }
}
export default withParams(SeeClient);