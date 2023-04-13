import React, { Component } from 'react';
import GuitarsNavBar from './guitarsNavBar';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";
import {useParams} from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UpdateGuitar extends Component {

    constructor(props) {
        super(props);
        this.state = {creationYear: null, model: "", type: "", color: "",
            price: null, allShops: [], currentShopId: -1, shop: null, dialogOpen: false, isLoading: true};
        this.id = this.props.params.id;
        this.fillTextFields();
    }

    componentDidMount() {
        this.handleGuitarUpdate = this.handleGuitarUpdate.bind(this);
        this.forceUpdate();
    }

    fillTextFields() {
        fetch('/api/guitars/' + this.id)
            .then(response => response.json())
            .then(guitar =>
                this.setState({price: guitar.price,
                    creationYear: guitar.creationYear, model: guitar.model, 
                    type: guitar.type, color: guitar.color, currentShopId: guitar.shop.id})
            )
            .then(fetch(`/api/shops`)
                .then(response => response.json())
                .then(data => this.setState({allShops: data}))
                .then(() => this.setState({isLoading: false}))
            );
    }

    handleGuitarUpdate(event) {
        const {price, creationYear, model, type, color, currentShopId} = this.state;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productType:"guitar",
                shop:{"id": currentShopId},
                price: price,
                creationYear: creationYear,
                model: model,
                type: type,
                color: color
            })
        };
        fetch('/api/guitars/' + this.id, requestOptions)
            .then(response => response.json())
            .then(() => this.setState({dialogOpen: true}));
    }

    render() {
        const {creationYear, price, model, type, color, allShops, dialogOpen, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }
        let {currentShopId, shop} = this.state;
        const shopList = allShops.map((currentShop) => {
            if (currentShopId == currentShop.id)
                shop = currentShop;
            return <MenuItem key={currentShop.id} value={currentShop}>{currentShop.name}</MenuItem>
        });
        return (
            <Container maxWidth={false}>
                <GuitarsNavBar></GuitarsNavBar>
                <br/><br/>
                <Container>
                    <TextField id="outlined-number" label="Creation year" variant="outlined" type="number"
                                defaultValue={creationYear}
                               onChange={(event)=>this.setState({creationYear: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-number" label="Price" variant="outlined" type="number"
                               defaultValue={price}
                               onChange={(event)=>this.setState({price: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Model" variant="outlined"
                               defaultValue={model}
                               onChange={(event)=>this.setState({model: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Type" variant="outlined"
                               defaultValue={type}
                               onChange={(event)=>this.setState({type: event.target.value})}/>
                    <br/><br/>
                    <TextField id="outlined-basic" label="Color" variant="outlined"
                               defaultValue={color}
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
                    <Button onClick={this.handleGuitarUpdate}>Update Guitar</Button>
                </Container>
                <Dialog
                    open={dialogOpen}
                    onClose={() => {this.setState({dialogOpen: false});}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Item updated"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Item was updated successfully!
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
export default withParams(UpdateGuitar);