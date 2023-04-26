import React, { Component } from 'react';
import { Container } from '@mui/material';
import TransactionsNavBar from './transactionsNavBar';
import TransactionsList from './transactionsList';

class TransactionsHome extends Component {
    render() {
        return (
            <Container maxWidth={false}>
            <TransactionsNavBar></TransactionsNavBar>
            <TransactionsList></TransactionsList>
        </Container>
        );
    }
}

export default TransactionsHome;