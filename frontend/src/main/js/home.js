import React, { Component } from 'react';
import AppNavbar from './appNavBar';
import {Container} from "@mui/material";
import GuitarList from "./guitarList";

class Home extends Component {
    render() {
        return (
            <Container maxWidth={false}>
                <AppNavbar></AppNavbar>
                <GuitarList></GuitarList>
            </Container>
        );
    }
}
export default Home;