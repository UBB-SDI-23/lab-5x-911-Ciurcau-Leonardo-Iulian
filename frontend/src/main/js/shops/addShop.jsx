import React, { Component } from "react";
import {Button, Container, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, TextField, FormControlLabel, Checkbox} from "@mui/material";
import ShopsNavBar from "./shopsNavBar";
import App from "../app";

class AddShop extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, name: "", email: "", telephoneNumber: "", 
        address: "", shippingAvailable: true, dialogOpen: false, isLoading: true};
    }

    componentDidMount() {
        this.handleShopAdd = this.handleShopAdd.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.setState({isLoading: false});
        this.forceUpdate();
    }

    getCurrentUser() {
        return this.state.parent.getCurrentUser();
    }

    handleShopAdd(event) {
        const {name, email, telephoneNumber, address, shippingAvailable} = this.state
        new Promise((resolve, reject) => resolve(this.getCurrentUser().getId()))
            .then(id => {return { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name, email: email, telephoneNumber: telephoneNumber,
                    address: address, shippingAvailable: shippingAvailable,
                    user: {id: id, isEnabled: true}
            })
            };})
            .then(requestOptions =>
                fetch(App.API_URL + '/api/shops', requestOptions)
                .then(response => response.json())
                .then(() => this.setState({dialogOpen: true}))
            );
    }

    render() {
        const {shippingAvailable, email, dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <Container maxWidth={false}>
                <ShopsNavBar parent={this}></ShopsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-number" label="Name" variant="outlined"
                               onChange={(event)=>this.setState({name: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-number" label="Email" variant="outlined"
                                error={email === ''} helperText={email === '' ? "Email is mandatory" : ''}
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
                    <Button disabled={email === ''} onClick={this.handleShopAdd}>Add shop</Button>
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