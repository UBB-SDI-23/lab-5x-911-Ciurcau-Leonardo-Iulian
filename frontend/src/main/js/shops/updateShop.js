import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField, Button } from "@mui/material";
import ShopsNavBar from "./shopsNavBar";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControlLabel, Checkbox} from "@mui/material";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UpdateShop extends Component {
    constructor(props) {
        super(props);
        this.state = {name: "", email: "", telephoneNumber: "", 
        address: "", shippingAvailable: false, dialogOpen: false, isLoading: true};
        this.id = this.props.params.id;
    }

    componentDidMount() {
        this.handleShopUpdate = this.handleShopUpdate.bind(this);
        this.fillTextFields = this.fillTextFields.bind(this);
        this.fillTextFields();
        this.forceUpdate();
    }

    
    fillTextFields() {
        fetch('/api/shops/' + this.id)
            .then(response => response.json())
            .then(shop =>
                this.setState({name: shop.name, email: shop.email, 
                    telephoneNumber: shop.telephoneNumber, address: shop.address,
                     shippingAvailable: shop.shippingAvailable})
            )
            .then(() => this.setState({isLoading: false}));
    }

    handleShopUpdate() {
        const {name, email, telephoneNumber, address, shippingAvailable} = this.state;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name, email: email,
                telephoneNumber: telephoneNumber,
                address: address, shippingAvailable: shippingAvailable
            })
        };
        fetch('/api/shops/' + this.id, requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}));
    }

    render() {
        const {name, email, telephoneNumber, address, shippingAvailable, dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        } 

        return (
            <Container>
                <ShopsNavBar></ShopsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-basic" label="Name" variant="outlined"
                                defaultValue={name}
                                onChange={e => this.setState({name: e.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Email" variant="outlined"
                                defaultValue={email}
                                onChange={e => this.setState({email: e.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Phone" variant="outlined"
                                defaultValue={telephoneNumber}
                                onChange={e => this.setState({telephoneNumber: e.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="outlined"
                                defaultValue={address}
                                onChange={e => this.setState({address: e.target.value})}/>
                    <br/><br/>
                    <FormControlLabel control={<Checkbox checked={shippingAvailable} />} label="Shipping available"
                                onChange={(event)=>this.setState({shippingAvailable: event.target.checked})} />
                    <br/><br/>
                    <Button onClick={this.handleShopUpdate}>Update shop</Button>
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

export default withParams(UpdateShop);