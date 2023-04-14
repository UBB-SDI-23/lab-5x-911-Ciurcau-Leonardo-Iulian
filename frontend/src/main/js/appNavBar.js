import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Container, Toolbar} from "@mui/material";

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Box>
        <AppBar position="sticky">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/guitars">Guitars</Button>
                <Button color="inherit" component={Link} to="/clients">Clients</Button>
                <Button color="inherit" component={Link} to="/couriers">Couriers</Button>
                <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
            </Toolbar>
        </AppBar>
        </Box>;
    }
}

export default AppNavbar;