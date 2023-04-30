import React, { Component } from 'react';
import GuitarsNavBar from './guitarsNavBar';
import {Container} from "@mui/material";
import GuitarList from "./guitarList";

class GuitarsHome extends Component {
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
                <GuitarsNavBar parent={this}></GuitarsNavBar>
                <GuitarList></GuitarList>
            </Container>
        );
    }
}
export default GuitarsHome;