import React, { Component } from 'react';
import ClientsNavBar from './clientsNavBar';
import {Container} from "@mui/material";
import ClientList from './clientList';

class ClientsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent};
    }

    componentDidMount() {
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.forceUpdate();
    }

    getCurrentUser() {
        return this.state.parent.getCurrentUser();
    }

    render() {
        return (
            <Container maxWidth={false}>
                <ClientsNavBar parent={this}></ClientsNavBar>
                <ClientList></ClientList>
            </Container>
        );
    }
}
export default ClientsHome;