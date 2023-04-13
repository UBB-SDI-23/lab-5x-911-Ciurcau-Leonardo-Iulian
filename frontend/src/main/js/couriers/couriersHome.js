import React, { Component } from 'react';
import CouriersNavBar from './couriersNavBar';
import {Container} from "@mui/material";
import CourierList from "./courierList";

class CourierHome extends Component {
    render() {
        return (
            <Container maxWidth={false}>
                <CouriersNavBar></CouriersNavBar>
                <CourierList></CourierList>
            </Container>
        );
    }
}

export default CourierHome;