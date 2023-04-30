import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Container, Toolbar} from "@mui/material";

class GuitarsNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent, isOpen: false};
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
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/guitars">Guitars</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/filteredGuitars">Search by price</Button>
                { this.getCurrentUser().isAuthenticated() &&
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/addGuitar">Add guitar</Button>
                }
            </Toolbar>
        </AppBar>
        </Box>;
    }
}

export default GuitarsNavBar;