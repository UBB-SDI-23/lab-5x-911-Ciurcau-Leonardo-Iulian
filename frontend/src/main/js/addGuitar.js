import React, { Component } from 'react';
import AppNavbar from './appNavBar';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import GuitarList from "./guitarList";

class AddGuitar extends Component {

    constructor(props) {
        super(props);
        this.state = {creationYear: null, model: "", type: "", color: "", price: null, dialogOpen: false};
    }

    componentDidMount() {
        this.handleGuitarAdd = this.handleGuitarAdd.bind(this);
        this.forceUpdate();
    }

    handleGuitarAdd(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productType:"guitar",
                shop:{"id":1},
                price: this.state.price,
                creationYear: this.state.creationYear,
                model: this.state.model,
                type: this.state.type,
                color: this.state.color
            })
        };
        fetch('api/guitars', requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}));
    }

    render() {
        const {dialogOpen} = this.state;
        return (
            <Container maxWidth={false}>
                <AppNavbar></AppNavbar>
                <br/><br/>
                <Container>
                <TextField id="outlined-number" label="Creation year" variant="outlined" type="number"
                           onChange={(event)=>this.setState({creationYear: event.target.value})}/>
                <br/><br/>
                    <TextField id="outlined-number" label="Price" variant="outlined" type="number"
                               onChange={(event)=>this.setState({price: event.target.value})}/>
                    <br/><br/>
                <TextField id="outlined-basic" label="Model" variant="outlined"
                           onChange={(event)=>this.setState({model: event.target.value})}/>
                <br/><br/>
                <TextField id="outlined-basic" label="Type" variant="outlined"
                           onChange={(event)=>this.setState({type: event.target.value})}/>
                <br/><br/>
                <TextField id="outlined-basic" label="Color" variant="outlined"
                           onChange={(event)=>this.setState({color: event.target.value})}/>
                    <Button onClick={this.handleGuitarAdd} className="addGuitarButton">Add Guitar</Button>
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
export default AddGuitar;