import React, { Component } from 'react';
import ClientsNavBar from './clientsNavBar';
import {Container} from "@mui/material";
import ClientList from './clientList';

class ClientsHome extends Component {
    render() {
        return (
            <Container maxWidth={false}>
                <ClientsNavBar></ClientsNavBar>
                <ClientList></ClientList>
            </Container>
        );
    }
}
export default ClientsHome;