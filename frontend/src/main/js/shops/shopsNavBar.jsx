import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Container, Toolbar} from "@mui/material";

class ShopsNavBar extends Component {
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
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/shops">Shops</Button>
                {this.getCurrentUser().isAuthenticated() &&
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/addShop">Add shop</Button>
                }
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/averagePriceShops">Shops sorted by average price</Button>
            </Toolbar>
        </AppBar>
        </Box>;
    }
}

export default ShopsNavBar;