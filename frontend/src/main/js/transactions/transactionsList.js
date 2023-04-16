import React, { Component } from "react";
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    SvgIcon,
    Table, TableBody,
    TableCell, TableHead, TableRow
} from "@mui/material";
import {blue, grey, red} from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import {Link} from "react-router-dom";
import Pagination from "../pagination";
import App from "../app";

class TransactionsList extends Component {
    constructor(props) {
        super(props);
        this.state = { transactions: [], operationItemId: -1, page: 0, lastPage: true, dialogOpen: false };
    }

    componentDidMount() {
        this.getTransactionsCall = this.props.parent ? this.props.parent.getTransactions : this.getTransactions.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        if (!this.props.parent)
            this.getTransactionsCall();
        this.forceUpdate();
    }

    getTransactions() {
        const { page } = this.state;
        fetch(App.API_URL + 'api/transactions/page/' + page)
            .then(response => response.json())
            .then(data => this.setState({ transactions: data.content, lastPage: data.last }));
    }

    handleDeleteItem(event) {
        const target = event.currentTarget;
        const value = target.getAttribute("currentid");
        this.setState({ operationItemId: value, dialogOpen: true });
    }

    handlePageChange(event) {
        if (this.props.parent)
            this.props.parent.setState({ page: this.state.page }, this.getTransactionsCall);
        else
            this.getTransactionsCall();
    }

    deleteItem(event) {
        fetch(App.API_URL + `/api/transactions/` + this.state.operationItemId, { method: 'DELETE' })
            .then(() => {
                this.getTransactionsCall();
                this.setState({ operationItemId: -1 });
            });
    }

    getPage() {
        if (this.props.parent)
            return this.props.parent.getPage();
        return this.state.page;
    }

    setPage(page, callback) {
        this.setState({ page: page }, callback);
    }

    getLastPage() {
        if (this.props.parent)
            return this.props.parent.getLastPage();
        return this.state.lastPage;
    }

    render() {
        const {transactions, page} = this.props.parent ? this.props.parent.state : this.state;
        let {dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }

        const transactionList = transactions.map((transaction, index) => {
            return <TableRow key={transaction.id}>
            <TableCell>{page * 10 + index + 1}</TableCell>
            <TableCell>{transaction.product.model}</TableCell>
            <TableCell>{transaction.client.name}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>
                <Button component={Link} to={"/seeTransaction/"+transaction.id}>
                    <SvgIcon component={FindInPageIcon} sx={{ color: blue[500] }}></SvgIcon>
                </Button>
                <Button component={Link} to={"/updateTransaction/"+transaction.id}>
                    <SvgIcon component={EditIcon} sx={{ color: grey[500] }}></SvgIcon>
                </Button>
                <Button currentid={transaction.id} onClick={this.handleDeleteItem}>
                    <SvgIcon component={DeleteForeverIcon} sx={{ color: red[500] }}></SvgIcon>
                </Button>
            </TableCell>
        </TableRow>
        });

        return (
            <Container className="transactions tableContainer">
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
            <Table id="transactionTable">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionList}
                </TableBody>
            </Table>
            <Pagination parent={this}></Pagination>
        </Container>
        );
    }
}

export default TransactionsList;