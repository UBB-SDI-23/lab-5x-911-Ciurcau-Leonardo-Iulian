import React, {Component} from "react";
import App from "../app";
import ShopList from "./shopList";
import {Button, Container, FormControl, Input, InputLabel} from "@mui/material";
import ShopsNavBar from './shopsNavBar';

class AvgPriceShopList extends Component {
    constructor(props) {
        super(props);
        this.state = {shops: [], page: 0, lastPage: true};
    }

    componentDidMount() {
        this.getShops = this.getShops.bind(this);
        this.getShops();
        this.forceUpdate();
    }

    getShops(event) {
        if (event)
            event.preventDefault();
        const {page} = this.state;
        fetch('/api/shops/orderByAveragePrice/page/' + page)
            .then(response => response.json())
            .then((data) => this.setState({shops: data.content, lastPage: data.last}));
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
        return (<Container maxWidth={false}>
                    <ShopsNavBar></ShopsNavBar>
                    <Container className="avgPriceShops tableContainer">
                        <ShopList parent={this}></ShopList>
                    </Container>
                </Container>
        );
    }
}

export default AvgPriceShopList;