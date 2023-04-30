import { AppBar , Button, Box, Toolbar} from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class TransactionsNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    getCurrentUser() {
        return this.state.parent.getCurrentUser();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        return <Box>
            <AppBar position="sticky">
                <Toolbar>
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/">Home</Button>
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/transactions">Transactions</Button>
                    { this.getCurrentUser().isAuthenticated() &&
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/addTransaction">Add transaction</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    }
}

export default TransactionsNavBar;