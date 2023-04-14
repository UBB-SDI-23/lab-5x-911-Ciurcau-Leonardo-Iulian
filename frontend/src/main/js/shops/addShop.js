import React, { Component } from "react";
import {Button, Container, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, TextField, FormControlLabel, Checkbox} from "@mui/material";
import ShopsNavBar from "./shopsNavBar";

class AddShop extends Component {
    constructor(props) {
        super(props);
        this.state = {name: "", email: "", telephoneNumber: "", 
        address: "", shippingAvailable: true, dialogOpen: false, isLoading: true};
    }

    componentDidMount() {
        this.handleShopAdd = this.handleShopAdd.bind(this);
        this.setState({isLoading: false});
        this.forceUpdate();
    }

    handleShopAdd(event) {
        const {name, email, telephoneNumber, address, shippingAvailable} = this.state
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name, email: email, telephoneNumber: telephoneNumber,
                address: address, shippingAvailable: shippingAvailable
            })
        };
        fetch('/api/shops', requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}));
    }

    render() {
        const {shippingAvailable, dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <Container maxWidth={false}>
                <ShopsNavBar></ShopsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-number" label="Name" variant="outlined"
                               onChange={(event)=>this.setState({name: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-number" label="Email" variant="outlined"
                               onChange={(event)=>this.setState({email: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Phone" variant="outlined"
                               onChange={(event)=>this.setState({telephoneNumber: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="outlined"
                               onChange={(event)=>this.setState({address: event.target.value})}/>
                    <br/><br/>
                    <FormControlLabel control={<Checkbox checked={shippingAvailable}
                            onChange={(event)=>this.setState({shippingAvailable: event.target.checked})} />} 
                            label="Shipping available" />
                    <br/><br/>
                    <Button onClick={this.handleShopAdd}>Add shop</Button>
                </Container>
                <Dialog
                    open={dialogOpen}
                    onClose={() => {this.setState({dialogOpen: false});}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Item added"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Item was added successfully!
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

export default AddShop;