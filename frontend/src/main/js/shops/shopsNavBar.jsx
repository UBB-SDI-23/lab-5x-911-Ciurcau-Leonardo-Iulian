import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Container, Toolbar} from "@mui/material";
import App from '../app';

class ShopsNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {parent: this.props.parent};
    }

    render() {
        let currentUser = App.getCurrentUserStatic();

        return <Box>
        <AppBar position="sticky">
            <Toolbar>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/">Home</Button>
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/shops">Shops</Button>
                {currentUser.hasAddAuthorization() &&
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/addShop">Add shop</Button>
                }
                <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/averagePriceShops">Shops sorted by average price</Button>
                {
                    currentUser.isAuthenticated() &&
                    <Button color="inherit" sx={{flexGrow: 1}} component={Link} to="/ownShops">Own shops</Button>
                }
            </Toolbar>
        </AppBar>
        </Box>;
    }
}

export default ShopsNavBar;