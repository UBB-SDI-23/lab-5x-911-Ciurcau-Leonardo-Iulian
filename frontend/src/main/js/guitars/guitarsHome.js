import React, { Component } from 'react';
import GuitarsNavBar from './guitarsNavBar';
import {Container} from "@mui/material";
import GuitarList from "./guitarList";

class GuitarsHome extends Component {
    render() {
        return (
            <Container maxWidth={false}>
                <GuitarsNavBar></GuitarsNavBar>
                <GuitarList></GuitarList>
            </Container>
        );
    }
}
export default GuitarsHome;