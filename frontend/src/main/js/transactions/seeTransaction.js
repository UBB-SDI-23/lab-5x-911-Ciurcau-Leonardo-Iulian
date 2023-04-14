import React, { Component } from "react";

import {useParams} from "react-router-dom";
import {Container, TextField} from "@mui/material";
import TransactionsNavBar from "./transactionsNavBar";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class SeeTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {product: "", client: "", date: "", isCashPayment: "", isLoading: true};
        this.id = this.props.params.id;
        this.fillTextFields();
    }

    componentDidMount() {
        this.forceUpdate();
    }

    fillTextFields() {
        fetch('/api/transactions/dto/' + this.id)
            .then(response => response.json())
            .then(transaction =>
                this.setState({product: transaction.product, client: transaction.client, 
                    date: transaction.date, isCashPayment: transaction.isCashPayment})
            )
            .then(() => this.setState({isLoading: false}));
    }

    render() {
        const {product, client, date, isCashPayment, isLoading} = this.state
        if (isLoading)
            return <p>Loading...</p>;
        return (
            <Container maxWidth={false}>
                <TransactionsNavBar></TransactionsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-basic" label="Product" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={product.model}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Client" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={client.name}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Date" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={date}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Cash payment" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={isCashPayment}/>
                </Container>
            </Container>
        );
    }
}

export default withParams(SeeTransaction);