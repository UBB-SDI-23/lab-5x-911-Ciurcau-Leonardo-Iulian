import React, { Component } from "react";
import {Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import CouriersNavBar from "./couriersNavBar";

class AddCourier extends Component {
    constructor(props) {
        super(props);
        this.state = {name: "", email: "", telephoneNumber: "", 
        deliveryPrice: null, address: "", description: "", dialogOpen: false, isLoading: true};
    }

    componentDidMount() {
        this.handleCourierAdd = this.handleCourierAdd.bind(this);
        this.setState({isLoading: false});
        this.forceUpdate();
    }

    handleCourierAdd(event) {
        const {name, email, telephoneNumber, deliveryPrice, address, description} = this.state;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name, email: email, telephoneNumber: telephoneNumber,
                deliveryPrice: deliveryPrice, address: address, description: description
            })
        };
        fetch('/api/couriers', requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}));
    }

    render() {
        const {dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <Container maxWidth={false}>
                <CouriersNavBar></CouriersNavBar>
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
                    <TextField id="outlined-basic" label="Delivery price" variant="outlined" type="number"
                               onChange={(event)=>this.setState({deliveryPrice: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Address" variant="outlined"
                               onChange={(event)=>this.setState({address: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Description" variant="outlined"
                               onChange={(event)=>this.setState({description: event.target.value})}/>
                    <br/><br/>
                    <Button onClick={this.handleCourierAdd}>Add courier</Button>
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

export default AddCourier;