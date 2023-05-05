import React, {Component} from "react";
import App from "../app";
import {Container} from "@mui/material";
import CouriersNavBar from './couriersNavBar';
import CourierList from "./courierList";

class OwnCouriers extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, 
            couriers: [], page: 0, lastPage: true, isLoading: true};
    }

    componentDidMount() {
        this.getCouriers = this.getCouriers.bind(this);
        this.getPage = this.getPage.bind(this);
        this.setPage = this.setPage.bind(this);
        this.getLastPage = this.getLastPage.bind(this);
        this.getCount = this.getCount.bind(this);
        this.forceUpdate();
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

    getCount() {
        fetch(App.API_URL + '/api/couriers/count/' + App.getCurrentUserStatic().getUsername())
            .then(response => response.json())
            .then(data => this.setState({totalCount: data.count}));
    }

    getCouriers(event) {
        const {page} = this.state;
        fetch(App.API_URL + '/api/couriers/page/' + page + '/' + App.getCurrentUserStatic().getUsername())
            .then(response => response.json())
            .then(data => this.setState({couriers: data.content, lastPage: data.last}, this.setState({isLoading: false})));
    }

    render() {
        return (<Container maxWidth={false}>
                    <CouriersNavBar parent={this}></CouriersNavBar>
                    <Container className="couriers tableContainer">
                            <CourierList parent={this}></CourierList>
                    </Container>
                </Container>
        );
    }
}

export default OwnCouriers;