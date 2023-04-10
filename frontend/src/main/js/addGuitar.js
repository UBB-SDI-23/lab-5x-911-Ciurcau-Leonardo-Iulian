import React, { Component } from 'react';
import AppNavbar from './appNavBar';
import {Button, Container, TextField} from "@mui/material";
import GuitarList from "./guitarList";

class AddGuitar extends Component {

    constructor(props) {
        super(props);
        this.state = {creationYear: null, model: "", type: "", color: "", price: null};
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
            .then(data => console.log(data));
    }

    render() {
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
                <Button onClick={this.handleGuitarAdd} className="submitButton">Add Guitar</Button>
                </Container>
            </Container>
        );
    }
}
export default AddGuitar;