import React, { Component } from 'react';
import GuitarsNavBar from './guitarsNavBar';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";

class AddGuitar extends Component {

    constructor(props) {
        super(props);
        this.state = {creationYear: null, model: "", type: "", color: "", price: null,
            allShops: [], shop: '', dialogOpen: false, isLoading: true};
    }

    componentDidMount() {
        this.handleGuitarAdd = this.handleGuitarAdd.bind(this);
        this.getAllShops();
        this.forceUpdate();
    }

    getAllShops() {
        fetch(`/api/shops`)
            .then(response => response.json())
            .then(data => this.setState({allShops: data}))
            .then(() => this.setState({isLoading: false}));
    }

    handleGuitarAdd(event) {
        const {shop, price, creationYear, model, type, color} = this.state;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productType:"guitar",
                shop:{"id": shop.id},
                price: price,
                creationYear: creationYear,
                model: model,
                type: type,
                color: color
            })
        };
        fetch('api/guitars', requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}));
    }

    render() {
        const {shop, allShops, dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }

        const shopList = allShops.map((currentShop) => {
            return <MenuItem key={currentShop.id} value={currentShop}>{currentShop.name}</MenuItem>
        });
        return (
            <Container maxWidth={false}>
                <GuitarsNavBar></GuitarsNavBar>
                <br/><br/>
                <Container>
                <TextField id="outlined-number" label="Creation year" variant="outlined" type="number"
                           onChange={(event)=>this.setState({creationYear: event.target.value})}/>
                <br/><br/>
                    <TextField id="outlined-number" label="Price" variant="outlined" type="number"
                               onChange={(event)=>this.setState({price: event.target.value})}/>
                    <br/><br/>
                <TextField id="outlined-basic" label="Model" variant="outlined"
                           onChange={(event)=>this.setState({model: event.target.value})}/>
                <br/><br/>
                <TextField id="outlined-basic" label="Type" variant="outlined"
                           onChange={(event)=>this.setState({type: event.target.value})}/>
                <br/><br/>
                <TextField id="outlined-basic" label="Color" variant="outlined"
                           onChange={(event)=>this.setState({color: event.target.value})}/>
                <br/><br/>
                <InputLabel id="demo-simple-select-label">Shop</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={shop}
                    label="Shop"
                    onChange={(event) => this.setState({shop: event.target.value})}
                >
                {shopList}
                </Select>
                <br/><br/>
                <Button onClick={this.handleGuitarAdd}>Add Guitar</Button>
            </Container>
                <Dialog
                    open={dialogOpen}
                    onClose={() => {this.setState({dialogOpen: false});}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Item added"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Item was added successfully!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.setState({dialogOpen: false});}}>OK</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
    }
}
export default AddGuitar;