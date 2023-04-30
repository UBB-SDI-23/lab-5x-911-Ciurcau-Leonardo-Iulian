import React, { Component } from 'react';
import { Container } from '@mui/material';
import TransactionsNavBar from './transactionsNavBar';
import TransactionsList from './transactionsList';

class TransactionsHome extends Component {
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
            <TransactionsNavBar parent={this}></TransactionsNavBar>
            <TransactionsList></TransactionsList>
        </Container>
        );
    }
}

export default TransactionsHome;