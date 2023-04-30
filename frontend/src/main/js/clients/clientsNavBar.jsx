import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Toolbar} from "@mui/material";

class ClientsNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false, parent: this.props.parent};
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    getCurrentUser() {
        return this.state.parent.getCurrentUser();
    }

    render() {
        return <Box>
        <AppBar position="sticky">
            <Toolbar>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/">Home</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/clients">Clients</Button>
                {   this.getCurrentUser().isAuthenticated() &&
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/addClient">Add client</Button>
                }
            </Toolbar>
        </AppBar>
        </Box>;
    }
}

export default ClientsNavBar;