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

class SeeGuitar extends Component {

    constructor(props) {
        super(props);
        this.state = {creationYear: null, model: "", type: "", color: "",
            price: null, dialogOpen: false, isLoading: true};
        this.id = this.props.params.id
        this.fillTextFields()
    }

    componentDidMount() {
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

    render() {
        const {creationYear, price, model, type, color, isLoading} = this.state
        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <Container maxWidth={false}>
                <AppNavbar></AppNavbar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-number" label="Creation year" variant="outlined"
                               InputProps={{readOnly: true,}} defaultValue={creationYear}/>
                    <br/><br/>
                    <TextField id="outlined-number" label="Price" variant="outlined"
                               InputProps={{readOnly: true,}} defaultValue={price}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Model" variant="outlined"
                               InputProps={{readOnly: true,}} defaultValue={model}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Type" variant="outlined"
                               InputProps={{readOnly: true,}} defaultValue={type}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Color" variant="outlined"
                               InputProps={{readOnly: true,}} defaultValue={color}/>
                </Container>
            </Container>
        );
    }
}
export default withParams(SeeGuitar);