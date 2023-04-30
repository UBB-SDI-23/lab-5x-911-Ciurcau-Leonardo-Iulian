import React, {Component} from "react";
import App from "../app";
import GuitarList from "./guitarList";
import {Button, Container, FormControl, Input, InputLabel} from "@mui/material";
import GuitarsNavBar from './guitarsNavBar';

class FilteredGuitarList extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, 
            guitars: [], showPriceSVG: false, page: 0, lastPage: true, filteredGuitarsPrice: 0};
    }

    componentDidMount() {
        this.handleFilteredGuitarsChange = this.handleFilteredGuitarsChange.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getGuitars = this.getGuitars.bind(this);
        this.forceUpdate();
    }

    handleFilteredGuitarsChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({filteredGuitarsPrice: value});
    }

    getCurrentUser() {
        return this.state.parent.getCurrentUser();
    }

    getGuitars(event) {
        if (event)
            event.preventDefault();
        const {filteredGuitarsPrice, page} = this.state;
        fetch(App.API_URL + `/api/guitars/priceGreaterThan/` + filteredGuitarsPrice + '/page/' + page)
            .then(response => response.json())
            .then((data) => this.setState({guitars: data.content, lastPage: data.last, showPriceSVG: false}));
    }

    getPage() {
        return this.state.page;
    }

    setPage(page, callback) {
        this.setState({page: page}, callback);
    }

    getLastPage() {
        return this.state.lastPage;
    }

    render() {
        const {filteredGuitarsPrice} = this.state;
        return (<Container maxWidth={false}>
                    <GuitarsNavBar parent={this}></GuitarsNavBar>
                    <Container className="filteredGuitars tableContainer">
                        <FormControl className="formControlFilteredGuitars">
                            <InputLabel htmlFor="price">Show guitars with price greater than: </InputLabel>
                            <Input type="text" id="price" value={filteredGuitarsPrice}
                                   onChange={this.handleFilteredGuitarsChange}/>
                            <Button onClick={this.getGuitars} className="submitButton">Submit</Button>
                        </FormControl>
                            <GuitarList parent={this}></GuitarList>
                    </Container>
                </Container>
        );
    }
}

export default FilteredGuitarList;