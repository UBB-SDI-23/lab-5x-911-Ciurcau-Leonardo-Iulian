import React, { Component } from 'react';
import ShopsNavBar from './shopsNavBar';
import {Container} from "@mui/material";
import ShopList from "./shopList";

class ShopsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent};
    }

    componentDidMount() {
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.forceUpdate();
    }

    getCurrentUser() {
        return this.state.parent.getCurrentUser();
    }
    
    render() {
        return (
            <Container maxWidth={false}>
                <ShopsNavBar parent={this}></ShopsNavBar>
                <ShopList></ShopList>
            </Container>
        );
    }
}
export default ShopsHome;