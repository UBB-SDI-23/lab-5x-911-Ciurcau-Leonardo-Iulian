import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./home";
import FilteredGuitarList from "./guitars/filteredGuitarList";
import AddGuitar from "./guitars/addGuitar";
import UpdateGuitar from "./guitars/updateGuitar";
import SeeGuitar from "./guitars/seeGuitar";
import GuitarsHome from './guitars/guitarsHome';
import ClientsHome from './clients/clientsHome';
import SeeClient from './clients/seeClient';
import UpdateClient from './clients/updateClient';
import AddClient from './clients/addClient';
import CourierHome from './couriers/couriersHome';
import AddCourier from './couriers/addCourier';
import SeeCourier from './couriers/seeCourier';
import UpdateCourier from './couriers/updateCourier';
import TransactionsHome from './transactions/transactionsHome';
import SeeTransaction from './transactions/seeTransaction';
import AddTransaction from './transactions/addTransaction';
import UpdateTransaction from './transactions/updateTransaction';
import ShopsHome from './shops/shopsHome';
import SeeShop from './shops/seeShop';
import AddShop from './shops/addShop';
import UpdateShop from './shops/updateShop';
import AvgPriceShopList from './shops/avgPriceShopList';
import UserLogin from './user/userLogin';
import CurrentUser from './user/currentUser';
import UserRegister from './user/userRegister';
import UpdateUserProfile from './user/updateUserProfile';
import SeeUserProfile from './user/seeUserProfile';
import OwnClients from './clients/ownClients';
import OwnCouriers from './couriers/ownCouriers';
import OwnGuitars from './guitars/ownGuitars';
import OwnTransactions from './transactions/ownTransactions';
import OwnShops from './shops/ownShops';
import UserRolesList from './user/userRolesList';
import AdminHome from './admin/adminHome';

import { Grid,useMediaQuery, Container  } from '@mui/material';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    static API_URL = 'https://labsdi-shop.mooo.com';
    constructor(props) {
        super(props);
        this.state = {columnWidth: this.calculateColumnWidth(),rowHeight: this.calculateRowHeight()};
    }

     componentDidMount() {
        this.calculateColumnWidth = this.calculateColumnWidth.bind(this);
        this.calculateRowHeight = this.calculateRowHeight.bind(this);
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);
        this.forceUpdate();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
      }

      handleResize = () => {
        this.setState({
            columnWidth: this.calculateColumnWidth(),
            rowHeight: this.calculateRowHeight()
        });
      };

      calculateColumnWidth() {
        const screenWidth = window.innerWidth;
        let columnWidth;

        if (screenWidth < 600) {

        columnWidth = screenWidth * 0.9;
        } else {
        columnWidth = screenWidth / 2;
        }

        return columnWidth;
      }

      calculateRowHeight() {
        const screenHeight = window.innerHeight;
        return screenHeight;
      }

    static getCurrentUserStatic() {
        let userStorage = JSON.parse(localStorage.getItem('currentUser'));
        let currentUser = CurrentUser.getInstance();
        if (userStorage) {
            currentUser.setUsername(userStorage.username);
            currentUser.setAccessToken(userStorage.accessToken);
            currentUser.setRoles(userStorage.roles);
        }
        else {
            currentUser.setUsername(null);
            currentUser.setAccessToken(null);
            currentUser.setRoles([]);
        }
        
        return currentUser;
    }

    render() {
        const { columnWidth, rowHeight } = this.state;
        return (
            <Grid container spacing={2}>
            <Grid item xs={12} sm={columnWidth} md={columnWidth} style={{ height: rowHeight }}>
            <Container style={{ width: '100%', height: '100%' }}>
              {
            
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact={true} element={<Home parent={this}/>}/>
                    <Route path='/guitars' element={<GuitarsHome parent={this}/>}/>
                    <Route path='/filteredGuitars' element={<FilteredGuitarList parent={this}/>}/>
                    <Route path='/addGuitar' element={<AddGuitar parent={this}/>}/>
                    <Route path='/updateGuitar/:id' element={<UpdateGuitar parent={this}/>}/>
                    <Route path='/seeGuitar/:id' element={<SeeGuitar parent={this}/>}/>
                    <Route path='/clients' element={<ClientsHome parent={this}/>}/>
                    <Route path='/seeClient/:id' element={<SeeClient parent={this}/>} />
                    <Route path='/updateClient/:id' element={<UpdateClient parent={this}/>}/>
                    <Route path='/addClient' element={<AddClient parent={this}/>}/>
                    <Route path='/couriers' element={<CourierHome parent={this}/>}/>
                    <Route path='/addCourier' element={<AddCourier parent={this}/>}/>
                    <Route path='/seeCourier/:id' element={<SeeCourier parent={this}/>}/>
                    <Route path='/updateCourier/:id' element={<UpdateCourier parent={this}/>}/>
                    <Route path='/transactions' element={<TransactionsHome parent={this}/>}/>
                    <Route path='/seeTransaction/:id' element={<SeeTransaction parent={this}/>}/>
                    <Route path='/addTransaction' element={<AddTransaction parent={this}/>}/>
                    <Route path='/updateTransaction/:id' element={<UpdateTransaction parent={this}/>}/>
                    <Route path='/shops' element={<ShopsHome parent={this}/>}/>
                    <Route path='seeShop/:id' element={<SeeShop parent={this}/>}/>
                    <Route path='/addShop' element={<AddShop parent={this}/>}/>
                    <Route path='/updateShop/:id' element={<UpdateShop parent={this}/>}/>
                    <Route path='/averagePriceShops' element={<AvgPriceShopList parent={this}/>}/>
                    <Route path='/login' element={<UserLogin parent={this}/>}/>
                    <Route path='/register' element={<UserRegister parent={this}/>}/>
                    <Route path='/updateProfile/:username' element={<UpdateUserProfile parent={this}/>}/>
                    <Route path='/seeProfile/:username' element={<SeeUserProfile parent={this}/>}/>
                    <Route path='/ownClients' element={<OwnClients parent={this}/>}/>
                    <Route path='/ownCouriers' element={<OwnCouriers parent={this}/>}/>
                    <Route path='/ownGuitars' element={<OwnGuitars parent={this}/>}/>
                    <Route path='/ownTransactions' element={<OwnTransactions parent={this}/>}/>
                    <Route path='/ownShops' element={<OwnShops parent={this}/>}/>
                    <Route path='/usersRoles' element={<UserRolesList parent={this}/>}/>
                    <Route path='/admin' element={<AdminHome parent={this}/>}/>
                </Routes>
            </BrowserRouter>}
            </Container>
            </Grid>
            </Grid>
        );
    }
}


const root = createRoot(document.getElementById('react'));
root.render(<App />);

export default App;