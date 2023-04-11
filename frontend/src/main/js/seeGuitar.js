import React, { Component } from 'react';
import AppNavbar from './appNavBar';
import {
    Container,
    TextField
} from "@mui/material";
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
                    creationYear: guitar.creationYear, model: guitar.model, type: guitar.type,
                    color: guitar.color,
                    shop: guitar.shop})
            )
            .then(() => this.setState({isLoading: false}))
    }

    render() {
        const {creationYear, price, model, type, color, shop, isLoading} = this.state
        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <Container maxWidth={false}>
                <AppNavbar></AppNavbar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-number" label="Creation year" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={creationYear}/>
                    <br/><br/>
                    <TextField id="outlined-number" label="Price" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={price}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Model" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={model}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Type" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={type}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Color" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={color}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Shop" variant="filled"
                               InputProps={{readOnly: true,}} defaultValue={shop.name}/>
                </Container>
            </Container>
        );
    }
}
export default withParams(SeeGuitar);