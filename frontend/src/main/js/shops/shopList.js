import React, {Component} from "react";
import App from "../app";
import {
    Button,
    Container, Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import EditIcon from '@mui/icons-material/Edit';
import {blue, red, grey} from "@mui/material/colors";
import {Link} from "react-router-dom";
import Pagination from "../pagination";

class ShopList extends Component {
    constructor(props) {
        super(props);
        this.state = {shops: [], showPriceSVShop: false, operationItemId: -1, page: 0, lastPage: true, dialogOpen: false};
    }

    componentDidMount() {
        this.getShopsCall = this.props.parent ? this.props.parent.getShops : this.getShops.bind(this);
        this.sortShopsByPrice = this.sortShopsByPrice.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        if (!this.props.parent)
            this.getShopsCall();
        
        this.forceUpdate();
    }

    getShops(event) {
        const {page} = this.state;
        fetch('/api/shops/page/' + page)
            .then(response => response.json())
            .then(data => this.setState({shops: data.content, lastPage: data.last}));
    }

    sortShopsByPrice(event) {
        if (!this.props.parent) {
            let {shops} = this.state;
            let sortedShops = [...shops].sort((a, b) => a.price - b.price);
            this.setState({shops: sortedShops});
            this.setState({showPriceSVShop: true});
        }
        else {
            let {shops} = this.props.parent.state;
            let sortedShops = [...shops].sort((a, b) => a.price - b.price);
            this.props.parent.setState({shops: sortedShops});
            this.props.parent.setState({showPriceSVShop: true});
        }
    }

    handleDeleteItem(event) {
        const target = event.currentTarget;
        const value = target.getAttribute("currentid");
        this.setState({operationItemId: value, dialogOpen: true});
    }

    handlePageChange(event) {
        if (this.props.parent)
            this.props.parent.setState({page: this.state.page}, this.getShopsCall);
        else
            this.getShopsCall();
    }

    deleteItem(event) {
        fetch(`/api/shops/` + this.state.operationItemId, { method: 'DELETE' })
            .then(() => {
                this.getShopsCall();
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
        const {shops, page, lastPage, showPriceSVShop} =
            this.props.parent ? this.props.parent.state : this.state;
        let {dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }

        const shopList = shops.map((shop, index) => {
            return <TableRow key={shop.id}>
                <TableCell>{page * 10 + index + 1}</TableCell>
                <TableCell>{shop.name}</TableCell>
                <TableCell>{shop.email}</TableCell>
                <TableCell>{shop.telephoneNumber}</TableCell>
                <TableCell>{shop.products.length}</TableCell>
                <TableCell>{shop.couriers.length}</TableCell>
                <TableCell>
                    <Button component={Link} to={"/seeShop/"+shop.id}>
                        <SvgIcon component={FindInPageIcon} sx={{ color: blue[500] }}></SvgIcon>
                    </Button>
                    <Button component={Link} to={"/updateShop/"+shop.id}>
                        <SvgIcon component={EditIcon} sx={{ color: grey[500] }}></SvgIcon>
                    </Button>
                    <Button currentid={shop.id} onClick={this.handleDeleteItem}>
                        <SvgIcon component={DeleteForeverIcon} sx={{ color: red[500] }}></SvgIcon>
                    </Button>
                </TableCell>
            </TableRow>
        });

        return (
            <Container className="shops tableContainer">
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
                <Table id="shopTable">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Products</TableCell>
                            <TableCell>Couriers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shopList}
                    </TableBody>
                </Table>
                <Pagination parent={this}></Pagination>
            </Container>
        );
    }
}

export default ShopList;