import React, {Component} from 'react';
import {Container, InputLabel, MenuItem, Select} from '@mui/material';
import Pagination from '../pagination';
import SimpleShop from './simpleShop';

class ShopsSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {shop: null, allShops: [], page: 0, lastPage: true, isLoading: true};
    }

    componentDidMount() {
        this.onShopChangeCall = this.props.parent ? this.props.parent.onShopChange : null;
        this.getAllShops = this.getAllShops.bind(this);
        this.getAllShops();
        this.forceUpdate();
    }

    onShopChange(event) {
        this.setState({shop: event.target.value});
    }

    getAllShops() {
        const {page} = this.state;
        fetch('/api/shops/page/' + page)
            .then(response => response.json())
            .then(data => this.setState({
                allShops: data.content, lastPage: data.last},
                 this.setState({isLoading: false})
                )
            );
    }

    handlePageChange() {
        this.getAllShops();
    }

    render() {
        const {allShops, isLoading} = this.state;
        let {shop} = this.state;
        if (isLoading) 
            return <p>Loading...</p>;

        if (this.props.defaultShop)
            shop = this.props.defaultShop;
        let found = false;
        let shopList = allShops.map((currentShop) => {
            let newShop = new SimpleShop(currentShop.id, currentShop.name);
            if (!shop) {
                shop = newShop;
                found = true;
            }
            else if (shop.id == newShop.id) {
                shop = newShop;
                found = true;
            }
            return <MenuItem key={newShop.id} value={newShop}>{newShop.name}</MenuItem>
        });

        if (!found) {
            let shopItem = <MenuItem key={shop.id} value={shop}>{shop.name}</MenuItem>;
            shopList.push(shopItem);
        }

        return <Container>
            <InputLabel id="demo-simple-select-label">Shop</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={shop}
                label="Shop"
                onChange={(event) => {this.onShopChange(event); if (this.onShopChangeCall) this.onShopChangeCall(event);}}
            >
            {shopList}
            <Pagination parent={this}></Pagination>
            </Select>
        </Container>
    }
}

export default ShopsSelect;