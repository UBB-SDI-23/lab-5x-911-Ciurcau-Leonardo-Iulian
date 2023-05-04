import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField} from "@mui/material";
import {SvgIcon} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import EditIcon from '@mui/icons-material/Edit';
import {blue, red, grey} from "@mui/material/colors";
import Pagination from "../pagination";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import App from "../app";


class CourierList extends Component {
    constructor(props) {
        super(props);
        this.state = {couriers: [], operationItemId: -1, page: 0, lastPage: true, dialogOpen: false};
    }

    componentDidMount() {
        this.getCouriersCall = this.props.parent ? this.props.parent.getCouriers : this.getCouriers.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        if (!this.props.parent)
            this.getCouriersCall();
        this.forceUpdate();
    }

    getCouriers() {
        const {page} = this.state;
        fetch(App.API_URL + '/api/couriers/page/' + page)
            .then(response => response.json())
            .then(data => this.setState({couriers: data.content, lastPage: data.last}));
    }

    handleDeleteItem(event) {
        const target = event.currentTarget;
        const value = target.getAttribute("currentid");
        this.setState({operationItemId: value, dialogOpen: true});
    }

    handlePageChange(event) {
        if (this.props.parent)
            this.props.parent.setState({page: this.state.page}, this.getCouriersCall);
        else
            this.getCouriersCall();
    }

    deleteItem(event) {
        fetch(App.API_URL + `/api/couriers/` + this.state.operationItemId, { method: 'DELETE' })
            .then(() => {
                this.getCouriersCall();
                this.setState({operationItemId: -1});
            });
    }

    getPage() {
        if (this.props.parent)
            return this.props.parent.getPage();
        return this.state.page;
    }

    setPage(page, callback) {
        this.setState({page: page}, callback);
    }

    getLastPage() {
        if (this.props.parent)
            return this.props.parent.getLastPage();
        return this.state.lastPage;
    }

    render() {
        const {couriers, page} = this.props.parent ? this.props.parent.state : this.state;
        let {dialogOpen, isLoading} = this.state;
        if (isLoading)
            return <p>Loading...</p>;
        
        let currentUser = App.getCurrentUserStatic();

        const courierList = couriers.map((courier, index) => {
            return <TableRow key={courier.id}>
                <TableCell>{page * 10 + index + 1}</TableCell>
                <TableCell>{courier.name}</TableCell>
                <TableCell>{courier.email}</TableCell>
                <TableCell>{courier.telephoneNumber}</TableCell>
                <TableCell>{courier.deliveryPrice}</TableCell>
                <TableCell>
                    <Button component={Link} to={"/seeProfile/"+courier.user.username} sx={{textTransform: "none"}}>
                        {courier.user.username}
                    </Button>
                </TableCell>
                <TableCell>
                    <Button component={Link} to={"/seeCourier/"+courier.id}>
                        <SvgIcon component={FindInPageIcon} sx={{ color: blue[500] }}></SvgIcon>
                    </Button>
                    { currentUser.isAuthenticated() &&
                    <Button component={Link} to={"/updateCourier/"+courier.id}>
                        <SvgIcon component={EditIcon} sx={{ color: grey[500] }}></SvgIcon>
                    </Button>
                    }
                    {currentUser.isAuthenticated() &&
                    <Button currentid={courier.id} onClick={this.handleDeleteItem}>
                        <SvgIcon component={DeleteForeverIcon} sx={{ color: red[500] }}></SvgIcon>
                    </Button>}
                </TableCell>
            </TableRow>
        });

        return (
            <Container className="couriers tableContainer">
                <Dialog
                    open={dialogOpen}
                    onClose={() => {this.setState({dialogOpen: false});}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete item"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete the item?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.setState({dialogOpen: false});}}>Cancel</Button>
                        <Button onClick={() => {this.deleteItem(); this.setState({dialogOpen: false});}} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Table id="courierTable">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Delivery price</TableCell>
                            <TableCell>Added by</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courierList}
                    </TableBody>
                </Table>
                <Pagination parent={this}></Pagination>
            </Container>
        );
    }
}

export default CourierList;