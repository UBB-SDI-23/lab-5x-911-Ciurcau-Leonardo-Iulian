import React, {Component} from "react";
import App from "../app";
import GuitarList from "./guitarList";
import {Button, Container, FormControl, Input, InputLabel} from "@mui/material";
import GuitarsNavBar from './guitarsNavBar';

class FilteredGuitarList extends Component {
    constructor(props) {
        super(props);
        this.state = {guitars: [], showPriceSVG: false, filteredGuitarsPrice: 0};
    }

    componentDidMount() {
        this.handleFilteredGuitarsChange = this.handleFilteredGuitarsChange.bind(this);
        this.handleFilteredGuitarsSubmit = this.handleFilteredGuitarsSubmit.bind(this);
        this.forceUpdate();
    }

    handleFilteredGuitarsChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({filteredGuitarsPrice: value});
    }

    handleFilteredGuitarsSubmit(event) {
        if (event)
            event.preventDefault();
        const filteredGuitarsPrice= this.state.filteredGuitarsPrice;
        fetch(`/api/guitars/priceGreaterThan/` + filteredGuitarsPrice)
            .then(response => response.json())
            .then((data) => this.setState({guitars: data, showPriceSVG: false}));
    }

    render() {
        const {filteredGuitarsPrice} = this.state;
        return (<Container maxWidth={false}>
                    <GuitarsNavBar></GuitarsNavBar>
                    <Container className="filteredGuitars tableContainer">
                        <FormControl className="formControlFilteredGuitars">
                            <InputLabel htmlFor="price">Show guitars with price greater than: </InputLabel>
                            <Input type="text" id="price" value={filteredGuitarsPrice}
                                   onChange={this.handleFilteredGuitarsChange}/>
                            <Button onClick={this.handleFilteredGuitarsSubmit} className="submitButton">Submit</Button>
                        </FormControl>
                            <GuitarList parent={this}></GuitarList>
                    </Container>
                </Container>
        );
    }
}

export default FilteredGuitarList;