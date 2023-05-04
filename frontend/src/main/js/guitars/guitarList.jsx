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

class GuitarList extends Component {
    constructor(props) {
        super(props);
        this.state = {guitars: [], showPriceSVG: false, operationItemId: -1, page: 0, lastPage: true, dialogOpen: false};
    }

    componentDidMount() {
        this.getGuitarsCall = this.props.parent ? this.props.parent.getGuitars : this.getGuitars.bind(this);
        this.sortGuitarsByPrice = this.sortGuitarsByPrice.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        if (!this.props.parent)
            this.getGuitarsCall();
        
        this.forceUpdate();
    }

    getGuitars(event) {
        const {page} = this.state;
        fetch(App.API_URL + '/api/guitars/page/' + page)
            .then(response => response.json())
            .then(data => this.setState({guitars: data.content, lastPage: data.last}));
    }

    sortGuitarsByPrice(event) {
        if (!this.props.parent) {
            let {guitars} = this.state;
            let sortedGuitars = [...guitars].sort((a, b) => a.price - b.price);
            this.setState({guitars: sortedGuitars});
            this.setState({showPriceSVG: true});
        }
        else {
            let {guitars} = this.props.parent.state;
            let sortedGuitars = [...guitars].sort((a, b) => a.price - b.price);
            this.props.parent.setState({guitars: sortedGuitars});
            this.props.parent.setState({showPriceSVG: true});
        }
    }

    handleDeleteItem(event) {
        const target = event.currentTarget;
        const value = target.getAttribute("currentid");
        this.setState({operationItemId: value, dialogOpen: true});
    }

    handlePageChange(event) {
        if (this.props.parent)
            this.props.parent.setState({page: this.state.page}, this.getGuitarsCall);
        else
            this.getGuitarsCall();
    }

    deleteItem(event) {
        fetch(App.API_URL + '/api/guitars/' + this.state.operationItemId, { method: 'DELETE' })
            .then(() => {
                this.getGuitarsCall();
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
        const {guitars, page, lastPage, showPriceSVG} =
            this.props.parent ? this.props.parent.state : this.state;
        let {dialogOpen, isLoading} = this.state;
        if (isLoading || !guitars) {
            return <p>Loading...</p>;
        }

        let currentUser = App.getCurrentUserStatic();

        const guitarList = guitars.map((guitar, index) => {
            return <TableRow key={guitar.id}>
                <TableCell>{page * 10 + index + 1}</TableCell>
                <TableCell>{guitar.price}</TableCell>
                <TableCell>{guitar.model}</TableCell>
                <TableCell>{guitar.type}</TableCell>
                <TableCell>{guitar.color}</TableCell>
                <TableCell>{guitar.creationYear}</TableCell>
                <TableCell>
                    <Button component={Link} to={"/seeProfile/"+guitar.user.username} sx={{textTransform: "none"}}>
                        {guitar.user.username}
                    </Button>
                </TableCell>
                <TableCell>
                    <Button component={Link} to={"/seeGuitar/"+guitar.id}>
                        <SvgIcon component={FindInPageIcon} sx={{ color: blue[500] }}></SvgIcon>
                    </Button>
                    {   currentUser.isAuthenticated() &&
                        <Button component={Link} to={"/updateGuitar/"+guitar.id}>
                        <SvgIcon component={EditIcon} sx={{ color: grey[500] }}></SvgIcon>
                    </Button>}
                    {   currentUser.isAuthenticated() &&
                        <Button currentid={guitar.id} onClick={this.handleDeleteItem}>
                        <SvgIcon component={DeleteForeverIcon} sx={{ color: red[500] }}></SvgIcon>
                    </Button>}
                </TableCell>
            </TableRow>
        });

        return (
            <Container className="guitars tableContainer">
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
                <Table id="guitarTable">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>
                                <Button onClick={this.sortGuitarsByPrice}>
                                    Price
                                    {showPriceSVG && <SvgIcon component={KeyboardArrowDownIcon}></SvgIcon>}
                                </Button>
                            </TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell>Creation year</TableCell>
                            <TableCell>Added by</TableCell>
                            <TableCell>Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {guitarList}
                    </TableBody>
                </Table>
                <Pagination parent={this}></Pagination>
            </Container>
        );
    }
}

export default GuitarList;