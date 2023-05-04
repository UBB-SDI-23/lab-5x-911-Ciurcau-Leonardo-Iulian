import React, {Component} from "react";
import App from "../app";
import ClientList from "./clientList";
import {Button, Container, FormControl, Input, InputLabel} from "@mui/material";
import ClientNavBar from './clientsNavBar';

class OwnClients extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, 
            clients: [], page: 0, lastPage: true, isLoading: true};
    }

    componentDidMount() {
        this.getClients = this.getClients.bind(this);
        this.getPage = this.getPage.bind(this);
        this.setPage = this.setPage.bind(this);
        this.getLastPage = this.getLastPage.bind(this);
        this.getCount = this.getCount.bind(this);
        this.getClients = this.getClients.bind(this);
        this.forceUpdate();
    }

    getPage() {
        return this.state.page;
    }

    setPage(page, callback) {
        this.setState({page: page}, callback);
    }

    getLastPage() {
        return this.state.lastPage;
    }

    getCount() {
        fetch(App.API_URL + '/api/clients/count/' + App.getCurrentUserStatic().getUsername())
            .then(response => response.json())
            .then(data => this.setState({totalCount: data.count}));
    }

    getClients(event) {
        const {page} = this.state;
        fetch(App.API_URL + '/api/clients/page/' + page + '/' + App.getCurrentUserStatic().getUsername())
            .then(response => response.json())
            .then(data => this.setState({clients: data.content, lastPage: data.last}, this.setState({isLoading: false})));
    }

    render() {
        return (<Container maxWidth={false}>
                    <ClientNavBar parent={this}></ClientNavBar>
                    <Container className="clients tableContainer">
                            <ClientList parent={this}></ClientList>
                    </Container>
                </Container>
        );
    }
}

export default OwnClients;