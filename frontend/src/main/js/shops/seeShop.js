import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Container, Checkbox, FormControlLabel, TextField } from "@mui/material";
import ShopsNavBar from "./shopsNavBar";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class SeeShop extends Component {
    constructor(props) {
        super(props);
        this.state = {name: "", email: "", telephoneNumber: "", address: "", shippingAvailable: false, isLoading: true};
        this.id = this.props.params.id;
        this.fillTextFields();
    }

    componentDidMount() {
        this.forceUpdate();
    }

    fillTextFields() {
        fetch('/api/shops/' + this.id)
            .then(response => response.json())
            .then(shop =>
                this.setState({name: shop.name, email: shop.email, 
                    telephoneNumber: shop.telephoneNumber,
                    address: shop.address, shippingAvailable: shop.shippingAvailable})
            )
            .then(() => this.setState({isLoading: false}));
    }

    render() {
        const {name, email, telephoneNumber, address, shippingAvailable, isLoading} = this.state
        if (isLoading)
            return <p>Loading...</p>;
        return (
            <Container maxWidth={false}>
                <ShopsNavBar></ShopsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-basic" label="Name" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={name}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Email" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={email}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Phone" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={telephoneNumber}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={address}/>
                    <br/><br/>
                    <FormControlLabel control={<Checkbox checked={shippingAvailable} />} label="Shipping available" />
                </Container>
            </Container>
        );
    }
}

export default withParams(SeeShop);