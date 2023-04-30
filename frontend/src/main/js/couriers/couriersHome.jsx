import React, { Component } from 'react';
import CouriersNavBar from './couriersNavBar';
import {Container} from "@mui/material";
import CourierList from "./courierList";

class CourierHome extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent};
    }

    componentDidMount() {
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    getCurrentUser() {
        return this.state.parent.getCurrentUser();
    }

    render() {
        return (
            <Container maxWidth={false}>
                <CouriersNavBar parent={this}></CouriersNavBar>
                <CourierList></CourierList>
            </Container>
        );
    }
}

export default CourierHome;