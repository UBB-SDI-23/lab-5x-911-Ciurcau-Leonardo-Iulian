import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import App from '../app';

class ClientsNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false, parent: this.props.parent};
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        const currentUser = App.getCurrentUserStatic();

        return <Box>
        <AppBar position="sticky">
            <Toolbar>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/">Home</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/clients">Clients</Button>
                {   currentUser.isAuthenticated() && currentUser.hasRole("REGULAR") &&
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/addClient">Add client</Button>
                }
                {
                    currentUser.isAuthenticated() && currentUser.hasRole("REGULAR") &&
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/ownClients">Own clients</Button>
                }
            </Toolbar>
        </AppBar>
        </Box>;
    }
}

export default ClientsNavBar;