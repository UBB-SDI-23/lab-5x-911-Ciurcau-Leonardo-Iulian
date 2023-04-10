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
import {useParams} from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UpdateGuitar extends Component {

    constructor(props) {
        super(props);
        this.state = {creationYear: null, model: "", type: "", color: "",
            price: null, dialogOpen: false, isLoading: true};
        this.id = this.props.params.id
        this.fillTextFields()
    }

    componentDidMount() {
        this.handleGuitarUpdate = this.handleGuitarUpdate.bind(this);
        this.forceUpdate();
    }

    fillTextFields() {
        fetch('/api/guitars/' + this.id)
            .then(response => response.json())
            .then(guitar =>
                this.setState({price: guitar.price,
                    creationYear: guitar.creationYear, model: guitar.model, type: guitar.type, color: guitar.color})
            )
            .then(() => this.setState({isLoading: false}))
    }

    handleGuitarUpdate(event) {
        const requestOptions = {
            method: 'PUT',
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
        fetch('/api/guitars/' + this.id, requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}));
    }

    render() {
        const {creationYear, price, model, type, color, dialogOpen, isLoading} = this.state
        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <Container maxWidth={false}>
                <AppNavbar></AppNavbar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-number" label="Creation year" variant="outlined" type="number"
                                defaultValue={creationYear}
                               onChange={(event)=>this.setState({creationYear: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-number" label="Price" variant="outlined" type="number"
                               defaultValue={price}
                               onChange={(event)=>this.setState({price: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Model" variant="outlined"
                               defaultValue={model}
                               onChange={(event)=>this.setState({model: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Type" variant="outlined"
                               defaultValue={type}
                               onChange={(event)=>this.setState({type: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Color" variant="outlined"
                               defaultValue={color}
                               onChange={(event)=>this.setState({color: event.target.value})}/>
                    <Button onClick={this.handleGuitarUpdate} className="addGuitarButton">Update Guitar</Button>
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
export default withParams(UpdateGuitar);