import React, { Component } from 'react';
import ShopsNavBar from './shopsNavBar';
import {Container} from "@mui/material";
import ShopList from "./shopList";

class ShopsHome extends Component {
    render() {
        return (
            <Container maxWidth={false}>
                <ShopsNavBar></ShopsNavBar>
                <ShopList></ShopList>
            </Container>
        );
    }
}
export default ShopsHome;