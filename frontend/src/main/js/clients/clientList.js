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

class ClientList extends Component {
    constructor(props) {
        super(props);
        this.state = {clients: [], operationItemId: -1, page: 0, lastPage: true, dialogOpen: false};
    }

    componentDidMount() {
        this.getClientsCall = this.props.parent ? this.props.parent.getClients : this.getClients.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        if (!this.props.parent)
            this.getClientsCall();
        
        this.forceUpdate();
    }

    getClients(event) {
        const {page} = this.state;
        fetch('/api/clients/page/' + page)
            .then(response => response.json())
            .then(data => this.setState({clients: data.content, lastPage: data.last}));
    }

    handleDeleteItem(event) {
        const target = event.currentTarget;
        const value = target.getAttribute("currentid");
        this.setState({operationItemId: value, dialogOpen: true});
    }

    handlePageChange(event) {
        if (this.props.parent)
            this.props.parent.setState({page: this.state.page}, this.getClientsCall);
        else
            this.getClientsCall();
    }

    deleteItem(event) {
        fetch(`/api/clients/` + this.state.operationItemId, { method: 'DELETE' })
            .then(() => {
                this.getClientsCall();
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
        const {clients, page, lastPage} =
            this.props.parent ? this.props.parent.state : this.state;
        let {dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }

        const clientList = clients.map((client, index) => {
            return <TableRow key={client.id}>
                <TableCell>{page * 10 + index + 1}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.telephoneNumber}</TableCell>
                <TableCell>{client.birthDate}</TableCell>
                <TableCell>
                    <Button component={Link} to={"/seeClient/"+client.id}>
                        <SvgIcon component={FindInPageIcon} sx={{ color: blue[500] }}></SvgIcon>
                    </Button>
                    <Button component={Link} to={"/updateClient/"+client.id}>
                        <SvgIcon component={EditIcon} sx={{ color: grey[500] }}></SvgIcon>
                    </Button>
                    <Button currentid={client.id} onClick={this.handleDeleteItem}>
                        <SvgIcon component={DeleteForeverIcon} sx={{ color: red[500] }}></SvgIcon>
                    </Button>
                </TableCell>
            </TableRow>
        });

        return (
            <Container className="clients tableContainer">
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
                <Table id="clientTable">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Birth Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientList}
                    </TableBody>
                </Table>
                <Pagination parent={this}></Pagination>
            </Container>
        );
    }
}

export default ClientList;