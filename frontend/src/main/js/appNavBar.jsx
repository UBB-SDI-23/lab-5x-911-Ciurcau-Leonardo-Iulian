import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Container, Toolbar} from "@mui/material";
import { useParams } from 'react-router-dom';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, isOpen: false, isLoading: true};
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.forceUpdate();
        this.setState({isLoading: false});
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    getCurrentUser() {
        return this.state.parent.getCurrentUser();
    }

    handleLogout() {
        localStorage.removeItem('currentUser');
        document.location.href = "/";
    }

    render() {
        const {isLoading} = this.state;
        if (isLoading)
            return <p>Loading...</p>;

        const currentUser = this.getCurrentUser();

        return <Box>
        <AppBar position="sticky">
            <Toolbar>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/">Home</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/guitars">Guitars</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/clients">Clients</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/couriers">Couriers</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/transactions">Transactions</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/shops">Shops</Button>
                {   !currentUser.isAuthenticated() ?
                    <Button color="inherit" component={Link} to="/login">Login</Button> : 
                    <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                }
            </Toolbar>
        </AppBar>
        </Box>;
    }
}

export default withParams(AppNavbar);