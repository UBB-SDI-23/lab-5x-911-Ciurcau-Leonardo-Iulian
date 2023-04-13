import React, { Component } from 'react';
import AppNavbar from './appNavBar';
import {Container} from "@mui/material";

class Home extends Component {
    render() {
        return (
            <Container maxWidth={false}>
                <AppNavbar></AppNavbar>
            </Container>
        );
    }
}
export default Home;